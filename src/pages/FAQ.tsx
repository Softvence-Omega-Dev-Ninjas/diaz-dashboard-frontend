/* eslint-disable @typescript-eslint/no-unused-vars */
import { ArrowLeft, Eye, Plus, Save, Trash2 } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { EditorPreview, RichTextEditor } from '../components/Editor';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

interface FAQFormData {
  title: string;
  subtitle: string;
  faqs: FAQItem[];
}

const FAQ: React.FC = () => {
  const navigate = useNavigate();
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [formData, setFormData] = useState<FAQFormData>({
    title: 'Frequently Asked Questions',
    subtitle: 'Find answers to common questions about our services',
    faqs: [{ id: '1', question: '', answer: '' }],
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFAQChange = (
    id: string,
    field: 'question' | 'answer',
    value: string,
  ) => {
    setFormData((prev) => ({
      ...prev,
      faqs: prev.faqs.map((faq) =>
        faq.id === id ? { ...faq, [field]: value } : faq,
      ),
    }));
  };

  const addFAQ = () => {
    const newId = Date.now().toString();
    setFormData((prev) => ({
      ...prev,
      faqs: [...prev.faqs, { id: newId, question: '', answer: '' }],
    }));
  };

  const removeFAQ = (id: string) => {
    if (formData.faqs.length <= 1) {
      Swal.fire('Error', 'At least one FAQ is required', 'error');
      return;
    }
    setFormData((prev) => ({
      ...prev,
      faqs: prev.faqs.filter((faq) => faq.id !== id),
    }));
  };

  const handleSave = async () => {
    const hasEmptyFields = formData.faqs.some(
      (faq) => !faq.question.trim() || !faq.answer.trim(),
    );

    if (!formData.title.trim() || hasEmptyFields) {
      Swal.fire('Error', 'Please fill in all required fields', 'error');
      return;
    }

    try {
      // TODO: Implement API call to save FAQ data
      Swal.fire('Success!', 'FAQ updated successfully', 'success');
    } catch (error) {
      Swal.fire('Error!', 'Failed to update FAQ', 'error');
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
              FAQ Content
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage frequently asked questions
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

            {/* FAQs */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-700">
                  FAQ Items <span className="text-red-500">*</span>
                </h3>
                <button
                  onClick={addFAQ}
                  className="flex items-center gap-2 px-3 py-1.5 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add FAQ
                </button>
              </div>

              <div className="space-y-4">
                {formData.faqs.map((faq, index) => (
                  <div
                    key={faq.id}
                    className="p-4 border border-gray-200 rounded-lg space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium text-gray-700">
                        Question {index + 1}
                      </h4>
                      {formData.faqs.length > 1 && (
                        <button
                          onClick={() => removeFAQ(faq.id)}
                          className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs text-gray-600 mb-1">
                        Question
                      </label>
                      <input
                        type="text"
                        value={faq.question}
                        onChange={(e) =>
                          handleFAQChange(faq.id, 'question', e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter question..."
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-gray-600 mb-1">
                        Answer
                      </label>
                      <RichTextEditor
                        value={faq.answer}
                        onChange={(value) =>
                          handleFAQChange(faq.id, 'answer', value)
                        }
                        placeholder="Enter answer..."
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="prose max-w-none">
            <h1 className="text-3xl font-bold mb-2">{formData.title}</h1>
            {formData.subtitle && (
              <p className="text-gray-600 mb-6">{formData.subtitle}</p>
            )}
            <div className="space-y-4">
              {formData.faqs.map((faq, index) => (
                <div key={faq.id} className="border-b border-gray-200 pb-4">
                  <h3 className="text-lg font-semibold mb-2">
                    {index + 1}. {faq.question || 'Question'}
                  </h3>
                  <EditorPreview content={faq.answer || 'Answer'} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FAQ;
