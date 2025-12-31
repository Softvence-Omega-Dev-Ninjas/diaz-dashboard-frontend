/* eslint-disable @typescript-eslint/no-unused-vars */
import { ArrowLeft, Eye, Plus, Save, Trash2, Upload } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

interface Brand {
  id: string;
  name: string;
  logo: string;
  description: string;
  website: string;
}

interface FeaturedBrandsFormData {
  title: string;
  subtitle: string;
  brands: Brand[];
}

const FeaturedBrands: React.FC = () => {
  const navigate = useNavigate();
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [formData, setFormData] = useState<FeaturedBrandsFormData>({
    title: 'Featured Brands',
    subtitle: 'Trusted brands we work with',
    brands: [{ id: '1', name: '', logo: '', description: '', website: '' }],
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBrandChange = (id: string, field: keyof Brand, value: string) => {
    setFormData((prev) => ({
      ...prev,
      brands: prev.brands.map((brand) =>
        brand.id === id ? { ...brand, [field]: value } : brand,
      ),
    }));
  };

  const handleLogoUpload = (
    id: string,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleBrandChange(id, 'logo', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addBrand = () => {
    const newId = Date.now().toString();
    setFormData((prev) => ({
      ...prev,
      brands: [
        ...prev.brands,
        { id: newId, name: '', logo: '', description: '', website: '' },
      ],
    }));
  };

  const removeBrand = (id: string) => {
    if (formData.brands.length <= 1) {
      Swal.fire('Error', 'At least one brand is required', 'error');
      return;
    }
    setFormData((prev) => ({
      ...prev,
      brands: prev.brands.filter((brand) => brand.id !== id),
    }));
  };

  const handleSave = async () => {
    const hasEmptyFields = formData.brands.some(
      (brand) => !brand.name.trim() || !brand.logo.trim(),
    );

    if (!formData.title.trim() || hasEmptyFields) {
      Swal.fire('Error', 'Please fill in all required fields', 'error');
      return;
    }

    try {
      // TODO: Implement API call to save brands data
      Swal.fire('Success!', 'Featured Brands updated successfully', 'success');
    } catch (error) {
      Swal.fire('Error!', 'Failed to update Featured Brands', 'error');
    }
  };

  const handleBack = () => {
    navigate('/content');
  };

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={handleBack}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl md:text-2xl font-semibold text-gray-900">
              Featured Brands
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage featured brand partners
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={() => setIsPreviewMode(!isPreviewMode)}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <Eye className="w-4 h-4" />
            {isPreviewMode ? 'Edit' : 'Preview'}
          </button>
          <button
            onClick={handleSave}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        {!isPreviewMode ? (
          <div className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Page Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter page title..."
              />
            </div>

            {/* Subtitle */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subtitle
              </label>
              <input
                type="text"
                name="subtitle"
                value={formData.subtitle}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter subtitle..."
              />
            </div>

            {/* Brands */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-700">
                  Brands <span className="text-red-500">*</span>
                </h3>
                <button
                  onClick={addBrand}
                  className="flex items-center gap-2 px-3 py-1.5 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Brand
                </button>
              </div>

              <div className="space-y-4">
                {formData.brands.map((brand, index) => (
                  <div
                    key={brand.id}
                    className="p-4 border border-gray-200 rounded-lg space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium text-gray-700">
                        Brand {index + 1}
                      </h4>
                      {formData.brands.length > 1 && (
                        <button
                          onClick={() => removeBrand(brand.id)}
                          className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    {/* Logo Upload */}
                    <div>
                      <label className="block text-xs text-gray-600 mb-2">
                        Brand Logo <span className="text-red-500">*</span>
                      </label>
                      <div className="flex items-center gap-4">
                        {brand.logo && (
                          <img
                            src={brand.logo}
                            alt={brand.name}
                            className="w-20 h-20 object-contain border border-gray-200 rounded p-2"
                          />
                        )}
                        <label className="flex items-center gap-2 px-4 py-2 border border-gray-300 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
                          <Upload className="w-4 h-4" />
                          <span className="text-sm">Upload Logo</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleLogoUpload(brand.id, e)}
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>

                    {/* Brand Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">
                          Brand Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={brand.name}
                          onChange={(e) =>
                            handleBrandChange(brand.id, 'name', e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter brand name..."
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">
                          Website URL
                        </label>
                        <input
                          type="url"
                          value={brand.website}
                          onChange={(e) =>
                            handleBrandChange(
                              brand.id,
                              'website',
                              e.target.value,
                            )
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="https://..."
                        />
                      </div>
                    </div>

                    {/* Description */}
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">
                        Description
                      </label>
                      <textarea
                        value={brand.description}
                        onChange={(e) =>
                          handleBrandChange(
                            brand.id,
                            'description',
                            e.target.value,
                          )
                        }
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter brand description..."
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="prose max-w-none">
            <h1 className="text-3xl font-bold mb-2 text-center">
              {formData.title}
            </h1>
            {formData.subtitle && (
              <p className="text-gray-600 mb-8 text-center">
                {formData.subtitle}
              </p>
            )}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {formData.brands.map((brand) => (
                <div
                  key={brand.id}
                  className="p-6 border border-gray-200 rounded-lg text-center hover:shadow-md transition-shadow"
                >
                  {brand.logo && (
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      className="w-full h-20 object-contain mb-3"
                    />
                  )}
                  <h3 className="font-semibold mb-2">
                    {brand.name || 'Brand Name'}
                  </h3>
                  {brand.description && (
                    <p className="text-sm text-gray-600 mb-2">
                      {brand.description}
                    </p>
                  )}
                  {brand.website && (
                    <a
                      href={brand.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:underline"
                    >
                      Visit Website
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeaturedBrands;
