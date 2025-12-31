/* eslint-disable @typescript-eslint/no-unused-vars */

import { ArrowLeft, Eye, Plus, Save, Trash2, Upload } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  isActive: boolean;
  displayOrder: number;
}

interface CategoryFormData {
  title: string;
  subtitle: string;
  categories: Category[];
}

const CategoryManagement: React.FC = () => {
  const navigate = useNavigate();
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [formData, setFormData] = useState<CategoryFormData>({
    title: 'Browse by Category',
    subtitle: 'Explore our yacht categories',
    categories: [
      {
        id: '1',
        name: '',
        slug: '',
        description: '',
        image: '',
        isActive: true,
        displayOrder: 1,
      },
    ],
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (
    id: string,
    field: keyof Category,
    value: string | boolean | number,
  ) => {
    setFormData((prev) => ({
      ...prev,
      categories: prev.categories.map((category) =>
        category.id === id ? { ...category, [field]: value } : category,
      ),
    }));

    // Auto-generate slug from name
    if (field === 'name' && typeof value === 'string') {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      handleCategoryChange(id, 'slug', slug);
    }
  };

  const handleImageUpload = (
    id: string,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleCategoryChange(id, 'image', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addCategory = () => {
    const newId = Date.now().toString();
    const maxOrder = Math.max(
      ...formData.categories.map((c) => c.displayOrder),
      0,
    );
    setFormData((prev) => ({
      ...prev,
      categories: [
        ...prev.categories,
        {
          id: newId,
          name: '',
          slug: '',
          description: '',
          image: '',
          isActive: true,
          displayOrder: maxOrder + 1,
        },
      ],
    }));
  };

  const removeCategory = (id: string) => {
    if (formData.categories.length <= 1) {
      Swal.fire('Error', 'At least one category is required', 'error');
      return;
    }
    setFormData((prev) => ({
      ...prev,
      categories: prev.categories.filter((category) => category.id !== id),
    }));
  };

  const handleSave = async () => {
    const hasEmptyFields = formData.categories.some(
      (category) => !category.name.trim() || !category.slug.trim(),
    );

    if (!formData.title.trim() || hasEmptyFields) {
      Swal.fire('Error', 'Please fill in all required fields', 'error');
      return;
    }

    try {
      // TODO: Implement API call to save categories
      Swal.fire('Success!', 'Categories updated successfully', 'success');
    } catch (error) {
      Swal.fire('Error!', 'Failed to update categories', 'error');
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
              Category Management
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage yacht categories and their display
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

            {/* Categories */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-700">
                  Categories <span className="text-red-500">*</span>
                </h3>
                <button
                  onClick={addCategory}
                  className="flex items-center gap-2 px-3 py-1.5 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Category
                </button>
              </div>

              <div className="space-y-4">
                {formData.categories
                  .sort((a, b) => a.displayOrder - b.displayOrder)
                  .map((category, index) => (
                    <div
                      key={category.id}
                      className="p-4 border border-gray-200 rounded-lg space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium text-gray-700">
                          Category {index + 1}
                        </h4>
                        <div className="flex items-center gap-2">
                          <label className="flex items-center gap-2 text-xs text-gray-600">
                            <input
                              type="checkbox"
                              checked={category.isActive}
                              onChange={(e) =>
                                handleCategoryChange(
                                  category.id,
                                  'isActive',
                                  e.target.checked,
                                )
                              }
                              className="rounded"
                            />
                            Active
                          </label>
                          {formData.categories.length > 1 && (
                            <button
                              onClick={() => removeCategory(category.id)}
                              className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Image Upload */}
                      <div>
                        <label className="block text-xs text-gray-600 mb-2">
                          Category Image
                        </label>
                        <div className="flex items-center gap-4">
                          {category.image && (
                            <img
                              src={category.image}
                              alt={category.name}
                              className="w-20 h-20 object-cover rounded border border-gray-200"
                            />
                          )}
                          <label className="flex items-center gap-2 px-4 py-2 border border-gray-300 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
                            <Upload className="w-4 h-4" />
                            <span className="text-sm">Upload Image</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) =>
                                handleImageUpload(category.id, e)
                              }
                              className="hidden"
                            />
                          </label>
                        </div>
                      </div>

                      {/* Category Details */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-xs text-gray-600 mb-1">
                            Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={category.name}
                            onChange={(e) =>
                              handleCategoryChange(
                                category.id,
                                'name',
                                e.target.value,
                              )
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter name..."
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-600 mb-1">
                            Slug <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={category.slug}
                            onChange={(e) =>
                              handleCategoryChange(
                                category.id,
                                'slug',
                                e.target.value,
                              )
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                            placeholder="auto-generated..."
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-600 mb-1">
                            Display Order
                          </label>
                          <input
                            type="number"
                            value={category.displayOrder}
                            onChange={(e) =>
                              handleCategoryChange(
                                category.id,
                                'displayOrder',
                                parseInt(e.target.value) || 1,
                              )
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            min="1"
                          />
                        </div>
                      </div>

                      {/* Description */}
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">
                          Description
                        </label>
                        <textarea
                          value={category.description}
                          onChange={(e) =>
                            handleCategoryChange(
                              category.id,
                              'description',
                              e.target.value,
                            )
                          }
                          rows={2}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter description..."
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
              {formData.categories
                .filter((c) => c.isActive)
                .sort((a, b) => a.displayOrder - b.displayOrder)
                .map((category) => (
                  <div
                    key={category.id}
                    className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                  >
                    {category.image && (
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-32 object-cover"
                      />
                    )}
                    <div className="p-4">
                      <h3 className="font-semibold mb-1">
                        {category.name || 'Category Name'}
                      </h3>
                      {category.description && (
                        <p className="text-sm text-gray-600">
                          {category.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryManagement;
