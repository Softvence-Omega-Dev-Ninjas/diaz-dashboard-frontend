import React, { useState, useRef } from 'react';
import { Upload, ChevronDown, ChevronUp, X } from 'lucide-react';

interface AccordionSection {
  id: string;
  title: string;
  isOpen: boolean;
}

const HomeBannersSection: React.FC = () => {
  const [bannerTitle, setBannerTitle] = useState('FLORIDA YACHT TRADER');
  const [subtitle, setSubtitle] = useState(
    "The World's most affordable and safe marketplace",
  );
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [backgroundPreview, setBackgroundPreview] = useState<string | null>(
    null,
  );

  const logoInputRef = useRef<HTMLInputElement>(null);
  const backgroundInputRef = useRef<HTMLInputElement>(null);

  const [accordions, setAccordions] = useState<AccordionSection[]>([
    { id: 'hero', title: 'Homepage Hero Banner', isOpen: true },
    { id: 'blogs', title: 'Blogs', isOpen: false },
    { id: 'contact', title: 'Contact', isOpen: false },
    { id: 'search', title: 'Search', isOpen: false },
    { id: 'privacy', title: 'Privacy Policy', isOpen: false },
    { id: 'terms', title: 'Terms of Service', isOpen: false },
  ]);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBackgroundUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setBackgroundPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearLogoPreview = () => {
    setLogoPreview(null);
    if (logoInputRef.current) {
      logoInputRef.current.value = '';
    }
  };

  const clearBackgroundPreview = () => {
    setBackgroundPreview(null);
    if (backgroundInputRef.current) {
      backgroundInputRef.current.value = '';
    }
  };

  const handleSaveChanges = () => {
    console.log('Saving changes...', {
      bannerTitle,
      subtitle,
      logoPreview,
      backgroundPreview,
    });
  };

  const toggleAccordion = (id: string) => {
    setAccordions(
      accordions.map((acc) =>
        acc.id === id ? { ...acc, isOpen: !acc.isOpen } : acc,
      ),
    );
  };

  return (
    <div className="space-y-4">
      {/* Homepage Hero Banner Accordion */}
      {accordions.map((accordion) => (
        <div
          key={accordion.id}
          className="bg-white rounded-lg shadow-sm overflow-hidden"
        >
          <button
            onClick={() => toggleAccordion(accordion.id)}
            className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
          >
            <span className="text-sm font-medium text-gray-900">
              {accordion.title}
            </span>
            {accordion.isOpen ? (
              <ChevronUp className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-400" />
            )}
          </button>

          {accordion.isOpen && accordion.id === 'hero' && (
            <div className="p-6 border-t border-gray-100 space-y-6">
              {/* Banner Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Banner Title
                </label>
                <input
                  type="text"
                  value={bannerTitle}
                  onChange={(e) => setBannerTitle(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter banner title"
                />
              </div>

              {/* Subtitle */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subtitle
                </label>
                <input
                  type="text"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter subtitle"
                />
              </div>

              {/* File Uploads */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Logo Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Logo
                  </label>
                  {logoPreview ? (
                    <div className="relative border-2 border-gray-300 rounded-lg p-4 group">
                      <button
                        onClick={clearLogoPreview}
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors z-10"
                        aria-label="Remove logo"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <img
                        src={logoPreview}
                        alt="Logo preview"
                        className="w-full h-32 object-contain"
                      />
                    </div>
                  ) : (
                    <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-8 hover:border-gray-400 transition-colors">
                      <input
                        ref={logoInputRef}
                        type="file"
                        onChange={handleLogoUpload}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        accept="image/*"
                      />
                      <div className="flex flex-col items-center justify-center text-center">
                        <Upload className="w-8 h-8 text-gray-400 mb-2" />
                        <p className="text-xs text-gray-500">
                          Click to upload or drag and drop
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Background Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Background Video/Image
                  </label>
                  {backgroundPreview ? (
                    <div className="relative border-2 border-gray-300 rounded-lg p-4 group">
                      <button
                        onClick={clearBackgroundPreview}
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors z-10"
                        aria-label="Remove background"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <img
                        src={backgroundPreview}
                        alt="Background preview"
                        className="w-full h-32 object-cover rounded"
                      />
                    </div>
                  ) : (
                    <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-8 hover:border-gray-400 transition-colors">
                      <input
                        ref={backgroundInputRef}
                        type="file"
                        onChange={handleBackgroundUpload}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        accept="image/*,video/*"
                      />
                      <div className="flex flex-col items-center justify-center text-center">
                        <Upload className="w-8 h-8 text-gray-400 mb-2" />
                        <p className="text-xs text-gray-500">
                          Click to upload or drag and drop
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Save Changes Button */}
              <div>
                <button
                  onClick={handleSaveChanges}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {accordion.isOpen && accordion.id !== 'hero' && (
            <div className="p-6 border-t border-gray-100">
              <p className="text-sm text-gray-500">
                Content for {accordion.title} will be implemented here.
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default HomeBannersSection;
