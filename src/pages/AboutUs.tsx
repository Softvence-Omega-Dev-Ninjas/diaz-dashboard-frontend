import {
  AboutUsForm,
  AboutUsHeader,
  AboutUsPreview,
  AboutUsSidebar,
  type AboutUsFormData,
} from '@/components/AboutUs';
import {
  useCreateAboutUsMutation,
  useGetAboutUsContentQuery,
  useUpdateAboutUsMutation,
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
  const [createAboutUs] = useCreateAboutUsMutation();
  const [updateAboutUs] = useUpdateAboutUsMutation();

  

  const [formData, setFormData] = useState<AboutUsFormData>({
    aboutTitle: '',
    aboutDescription: '',
    mission: '',
    vision: '',
    site: 'FLORIDA',
  });

  // Load data when fetched or site changes
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
      // Clear fields if no data exists for selected site
      setFormData({
        aboutTitle: '',
        aboutDescription: '',
        mission: '',
        vision: '',
        site: selectedSite,
      });
    }
  }, [aboutUsData, selectedSite]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
        text: 'Please fill in all required fields',
      });
      return;
    }

    try {
      const aboutUsContent = {
        aboutTitle: formData.aboutTitle,
        aboutDescription: formData.aboutDescription,
        mission: formData.mission,
        vision: formData.vision,
      };

      // If data exists, update; otherwise, create
      if (aboutUsData?.id) {
        await updateAboutUs({
          site: selectedSite,
          aboutUsContent,
        }).unwrap();

        Swal.fire({
          icon: 'success',
          title: 'About Us Updated',
          text: 'About Us page has been updated successfully!',
        });
      } else {
        await createAboutUs({
          site: selectedSite,
          aboutUsContent,
        }).unwrap();

        Swal.fire({
          icon: 'success',
          title: 'About Us Created',
          text: 'About Us page has been created successfully!',
        });
      }
      navigate('/content');
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Operation Failed',
        text:
          (error as { data?: { message?: string } })?.data?.message ||
          `Failed to ${aboutUsData?.id ? 'update' : 'create'} About Us page`,
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
        {isLoading ? (
          <div className="flex items-center justify-center p-8">
            <p className="text-gray-500">Loading...</p>
          </div>
        ) : isPreviewMode ? (
          <AboutUsPreview formData={formData} />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <AboutUsForm
              formData={formData}
              onInputChange={handleInputChange}
              onDescriptionChange={handleDescriptionChange}
            />
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
