import React, { useState, useRef } from 'react';
import { ImageIcon, X } from 'lucide-react';

const Branding = () => {
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveLogo = () => {
    setLogoPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6">
      <h2 className="text-base md:text-lg font-semibold text-gray-900 mb-4 md:mb-6">
        Branding
      </h2>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Logo
        </label>

        {logoPreview ? (
          <div className="relative w-32 h-32 border border-gray-300 rounded-lg overflow-hidden group">
            <img
              src={logoPreview}
              alt="Logo preview"
              className="w-full h-full object-cover"
            />
            <button
              onClick={handleRemoveLogo}
              className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="w-full sm:w-auto h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 transition-colors"
          >
            <ImageIcon className="w-8 h-8 text-gray-400 mb-2" />
            <span className="text-sm text-gray-500">Upload logo</span>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleLogoUpload}
          className="hidden"
        />
      </div>
    </div>
  );
};

export default Branding;
