import {
  AboutUsForm,
  AboutUsHeader,
  AboutUsPreview,
  AboutUsSidebar,
  OurStorySection,
  type AboutUsFormData,
  type OurStoryFormData,
} from '@/components/AboutUs';

import {
  useCreateAboutUsMutation,
  useCreateOurStoryMutation,
  useGetAboutUsContentQuery,
  useGetOurStoryQuery,
  useUpdateAboutUsMutation,
  useUpdateOurStoryMutation,
} from '@/redux/features/contentmanagement/contentmanagement';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const AboutUs: React.FC = () => {
  const navigate = useNavigate();
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [selectedSite, setSelectedSite] = useState<'FLORIDA' | 'JUPITER'>(
    'FLORIDA',
  );

  const { data: aboutUsData, isLoading } =
    useGetAboutUsContentQuery(selectedSite);
  const { data: ourStoryData, isLoading: isOurStoryLoading } =
    useGetOurStoryQuery(selectedSite);

  const [createAboutUs] = useCreateAboutUsMutation();
  const [updateAboutUs] = useUpdateAboutUsMutation();

  const [createOurStory, { isLoading: isCreatingOurStory }] =
    useCreateOurStoryMutation();
  const [updateOurStory, { isLoading: isUpdatingOurStory }] =
    useUpdateOurStoryMutation();

  const [formData, setFormData] = useState<AboutUsFormData>({
    aboutTitle: '',
    aboutDescription: '',
    mission: '',
    vision: '',
    site: 'FLORIDA',
  });

  const [ourStoryFormData, setOurStoryFormData] = useState<OurStoryFormData>({
    title: '',
    description: '',
    image1: null,
    image2: null,
    image3: null,
    image4: null,
    image5: null,
    existingImage1: '',
    existingImage2: '',
    existingImage3: '',
    existingImage4: '',
    existingImage5: '',
  });

  // Load About Us data
  useEffect(() => {
    if (aboutUsData) {
      setFormData({
        aboutTitle: aboutUsData.aboutTitle || '',
        aboutDescription: aboutUsData.aboutDescription || '',
        mission: aboutUsData.mission || '',
        vision: aboutUsData.vision || '',
        site: selectedSite,
      });
    } else {
      setFormData({
        aboutTitle: '',
        aboutDescription: '',
        mission: '',
        vision: '',
        site: selectedSite,
      });
    }
  }, [aboutUsData, selectedSite]);

  // Load Our Story data
  useEffect(() => {
    if (ourStoryData) {
      setOurStoryFormData({
        title: ourStoryData.title || '',
        description: ourStoryData.description || '',
        image1: null,
        image2: null,
        image3: null,
        image4: null,
        image5: null,
        existingImage1: ourStoryData.image1?.url || '',
        existingImage2: ourStoryData.image2?.url || '',
        existingImage3: ourStoryData.image3?.url || '',
        existingImage4: ourStoryData.image4?.url || '',
        existingImage5: ourStoryData.image5?.url || '',
      });
    } else {
      setOurStoryFormData({
        title: '',
        description: '',
        image1: null,
        image2: null,
        image3: null,
        image4: null,
        image5: null,
        existingImage1: '',
        existingImage2: '',
        existingImage3: '',
        existingImage4: '',
        existingImage5: '',
      });
    }
  }, [ourStoryData, selectedSite]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOurStoryInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setOurStoryFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOurStoryImageChange = (imageKey: string, file: File | null) => {
    const existingKey = `existing${imageKey.charAt(0).toUpperCase() + imageKey.slice(1)}`;
    setOurStoryFormData((prev) => ({
      ...prev,
      [imageKey]: file,
      // Clear existing image URL when removing
      ...(file === null && { [existingKey]: '' }),
    }));
  };

  const handleSiteChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSite(e.target.value as 'FLORIDA' | 'JUPITER');
  };

  const handleDescriptionChange = (value: string) => {
    setFormData((prev) => ({ ...prev, aboutDescription: value }));
  };

  const handleSave = async () => {
    // Validate required fields
    if (
      !formData.aboutTitle.trim() ||
      !formData.aboutDescription.trim() ||
      !formData.mission.trim() ||
      !formData.vision.trim()
    ) {
      Swal.fire({
        icon: 'warning',
        title: 'Missing Fields',
        text: 'Please fill in all required About Us fields',
      });
      return;
    }

    try {
      // Save About Us data only
      const aboutUsContent = {
        aboutTitle: formData.aboutTitle,
        aboutDescription: formData.aboutDescription,
        mission: formData.mission,
        vision: formData.vision,
      };

      if (aboutUsData?.id) {
        await updateAboutUs({
          site: selectedSite,
          aboutUsContent,
        }).unwrap();
      } else {
        await createAboutUs({
          site: selectedSite,
          aboutUsContent,
        }).unwrap();
      }

      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'About Us section has been saved successfully!',
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Operation Failed',
        text:
          (error as { data?: { message?: string } })?.data?.message ||
          'Failed to save About Us section',
      });
    }
  };

  const handleSaveOurStory = async () => {
    // Validate Our Story title
    if (!ourStoryFormData.title.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'Missing Title',
        text: 'Please enter a title for the Our Story section',
      });
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', ourStoryFormData.title);

      if (ourStoryFormData.description) {
        formDataToSend.append('description', ourStoryFormData.description);
      }

      // Append images
      [1, 2, 3, 4, 5].forEach((num) => {
        const imageKey = `image${num}` as keyof OurStoryFormData;
        const file = ourStoryFormData[imageKey];
        if (file instanceof File) {
          formDataToSend.append(imageKey, file);
        }
      });

      if (ourStoryData?.id) {
        await updateOurStory({
          site: selectedSite,
          formData: formDataToSend,
        }).unwrap();
      } else {
        await createOurStory({
          site: selectedSite,
          formData: formDataToSend,
        }).unwrap();
      }

      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Our Story section has been saved successfully!',
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Operation Failed',
        text:
          (error as { data?: { message?: string } })?.data?.message ||
          'Failed to save Our Story section',
      });
    }
  };

  const handleBack = () => {
    navigate('/content');
  };

  const handleTogglePreview = () => {
    setIsPreviewMode(!isPreviewMode);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AboutUsHeader
        isPreviewMode={isPreviewMode}
        onTogglePreview={handleTogglePreview}
        onSave={handleSave}
        onBack={handleBack}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isLoading || isOurStoryLoading ? (
          <div className="flex items-center justify-center p-8">
            <p className="text-gray-500">Loading...</p>
          </div>
        ) : isPreviewMode ? (
          <AboutUsPreview formData={formData} ourStoryData={ourStoryFormData} />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <AboutUsForm
                formData={formData}
                onInputChange={handleInputChange}
                onDescriptionChange={handleDescriptionChange}
              />
              <OurStorySection
                formData={ourStoryFormData}
                onInputChange={handleOurStoryInputChange}
                onImageChange={handleOurStoryImageChange}
                onSave={handleSaveOurStory}
                isSaving={isCreatingOurStory || isUpdatingOurStory}
              />
            </div>
            <AboutUsSidebar
              selectedSite={selectedSite}
              onSiteChange={handleSiteChange}
              updatedAt={aboutUsData?.updatedAt}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AboutUs;
