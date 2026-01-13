import React from 'react';
import { EditorPreview } from '../Editor';
import type { AboutUsPreviewProps } from './types';

export const AboutUsPreview: React.FC<AboutUsPreviewProps> = ({ formData }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* About Title */}
        <h1 className="text-4xl font-bold text-gray-900">
          {formData.aboutTitle || 'About Us'}
        </h1>

        {/* About Description */}
        <div className="prose prose-lg max-w-none">
          <EditorPreview content={formData.aboutDescription} />
        </div>

        {/* Mission Section */}
        {formData.mission && (
          <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              Our Mission
            </h2>
            <p className="text-gray-700 text-lg">{formData.mission}</p>
          </div>
        )}

        {/* Vision Section */}
        {formData.vision && (
          <div className="bg-green-50 border-l-4 border-green-600 p-6 rounded-r-lg">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              Our Vision
            </h2>
            <p className="text-gray-700 text-lg">{formData.vision}</p>
          </div>
        )}
      </div>
    </div>
  );
};
