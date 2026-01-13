import React from 'react';
import { EditorPreview } from '../Editor';
import type { AboutUsPreviewProps } from './types';

export const AboutUsPreview: React.FC<AboutUsPreviewProps> = ({
  formData,
  ourStoryData,
}) => {
  const getImageUrl = (imageKey: string): string | null => {
    const fileKey = imageKey as keyof typeof ourStoryData;
    const existingKey =
      `existing${imageKey.charAt(0).toUpperCase() + imageKey.slice(1)}` as keyof typeof ourStoryData;

    const file = ourStoryData[fileKey];
    const existingImage = ourStoryData[existingKey];

    if (file && file instanceof File) {
      return URL.createObjectURL(file);
    }
    if (typeof existingImage === 'string' && existingImage) {
      return existingImage;
    }
    return null;
  };

  const ourStoryImages = [1, 2, 3, 4, 5]
    .map((num) => getImageUrl(`image${num}`))
    .filter((url): url is string => url !== null);

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

        {/* Our Story Section */}
        {(ourStoryData.title ||
          ourStoryData.description ||
          ourStoryImages.length > 0) && (
          <div className="bg-gray-50 border border-gray-200 p-6 rounded-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {ourStoryData.title || 'Our Story'}
            </h2>

            {ourStoryData.description && (
              <p className="text-gray-700 text-lg mb-6 whitespace-pre-wrap">
                {ourStoryData.description}
              </p>
            )}

            {ourStoryImages.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                {ourStoryImages.map((imageUrl, index) => (
                  <div
                    key={index}
                    className="relative aspect-video rounded-lg overflow-hidden shadow-md"
                  >
                    <img
                      src={imageUrl}
                      alt={`Our Story ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
