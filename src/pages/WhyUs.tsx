/* eslint-disable @typescript-eslint/no-unused-vars */
import { ArrowLeft, Eye, Plus, Save, Trash2 } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { EditorPreview, RichTextEditor } from '../components/Editor';

interface WhyUsItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

interface WhyUsFormData {
  mainTitle: string;
  subtitle: string;
  items: WhyUsItem[];
}

const WhyUs: React.FC = () => {
  const navigate = useNavigate();
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [formData, setFormData] = useState<WhyUsFormData>({
    mainTitle: 'Why Choose Us',
    subtitle: 'Discover what makes us the best choice for your needs',
    items: [{ id: '1', title: '', description: '', icon: '✓' }],
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleItemChange = (
    id: string,
    field: keyof WhyUsItem,
    value: string,
  ) => {
    setFormData((prev) => ({
      ...prev,
      items: prev.items.map((item) =>
        item.id === id ? { ...item, [field]: value } : item,
      ),
    }));
  };

  const addItem = () => {
    const newId = Date.now().toString();
    setFormData((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        { id: newId, title: '', description: '', icon: '✓' },
      ],
    }));
  };

  const removeItem = (id: string) => {
    if (formData.items.length <= 1) {
      Swal.fire('Error', 'At least one item is required', 'error');
      return;
    }
    setFormData((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.id !== id),
    }));
  };

  const handleSave = async () => {
    const hasEmptyFields = formData.items.some(
      (item) => !item.title.trim() || !item.description.trim(),
    );

    if (!formData.mainTitle.trim() || hasEmptyFields) {
      Swal.fire('Error', 'Please fill in all required fields', 'error');
      return;
    }

    try {
      // TODO: Implement API call to save Why Us data
      Swal.fire('Success!', 'Why Us page updated successfully', 'success');
    } catch (error) {
      Swal.fire('Error!', 'Failed to update Why Us page', 'error');
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
              Why Us Content
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Highlight your competitive advantages
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
            {/* Main Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Main Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="mainTitle"
                value={formData.mainTitle}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter main title..."
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

            {/* Items */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-700">
                  Why Us Items <span className="text-red-500">*</span>
                </h3>
                <button
                  onClick={addItem}
                  className="flex items-center gap-2 px-3 py-1.5 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Item
                </button>
              </div>

              <div className="space-y-4">
                {formData.items.map((item, index) => (
                  <div
                    key={item.id}
                    className="p-4 border border-gray-200 rounded-lg space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium text-gray-700">
                        Item {index + 1}
                      </h4>
                      {formData.items.length > 1 && (
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">
                          Icon/Emoji
                        </label>
                        <input
                          type="text"
                          value={item.icon}
                          onChange={(e) =>
                            handleItemChange(item.id, 'icon', e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="✓"
                          maxLength={2}
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">
                          Title
                        </label>
                        <input
                          type="text"
                          value={item.title}
                          onChange={(e) =>
                            handleItemChange(item.id, 'title', e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter title..."
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs text-gray-600 mb-1">
                        Description
                      </label>
                      <RichTextEditor
                        value={item.description}
                        onChange={(value) =>
                          handleItemChange(item.id, 'description', value)
                        }
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
              {formData.mainTitle}
            </h1>
            {formData.subtitle && (
              <p className="text-gray-600 mb-8 text-center">
                {formData.subtitle}
              </p>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {formData.items.map((item) => (
                <div
                  key={item.id}
                  className="p-6 border border-gray-200 rounded-lg"
                >
                  <div className="text-4xl mb-3">{item.icon}</div>
                  <h3 className="text-lg font-semibold mb-2">
                    {item.title || 'Title'}
                  </h3>
                  <EditorPreview content={item.description || 'Description'} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WhyUs;
