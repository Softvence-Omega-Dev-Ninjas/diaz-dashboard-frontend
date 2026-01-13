export interface AboutUsData {
  id?: string;
  site: 'FLORIDA' | 'JUPITER';
  aboutTitle: string;
  aboutDescription: string;
  mission: string;
  vision: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AboutUsFormData {
  aboutTitle: string;
  aboutDescription: string;
  mission: string;
  vision: string;
  site: 'FLORIDA' | 'JUPITER';
}

export interface ImageData {
  id: string;
  filename: string;
  originalFilename: string;
  path: string;
  url: string;
  fileType: string;
  mimeType: string;
  size: number;
  createdAt: string;
  updatedAt: string;
}

export interface OurStoryData {
  id?: string;
  site: 'FLORIDA' | 'JUPITER';
  title: string;
  description: string;
  image1Id?: string;
  image2Id?: string;
  image3Id?: string;
  image4Id?: string;
  image5Id?: string;
  image1?: ImageData;
  image2?: ImageData;
  image3?: ImageData;
  image4?: ImageData;
  image5?: ImageData;
  createdAt?: string;
  updatedAt?: string;
}

export interface OurStoryFormData {
  title: string;
  description: string;
  image1?: File | null;
  image2?: File | null;
  image3?: File | null;
  image4?: File | null;
  image5?: File | null;
  existingImage1?: string;
  existingImage2?: string;
  existingImage3?: string;
  existingImage4?: string;
  existingImage5?: string;
}

export interface AboutUsHeaderProps {
  isPreviewMode: boolean;
  onTogglePreview: () => void;
  onSave: () => void;
  onBack: () => void;
}

export interface AboutUsFormProps {
  formData: AboutUsFormData;
  onInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  onDescriptionChange: (value: string) => void;
}

export interface OurStorySectionProps {
  formData: OurStoryFormData;
  onInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  onImageChange: (imageKey: string, file: File | null) => void;
  onSave: () => void;
  isSaving?: boolean;
}

export interface AboutUsSidebarProps {
  selectedSite: 'FLORIDA' | 'JUPITER';
  onSiteChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  updatedAt?: string;
}

export interface AboutUsPreviewProps {
  formData: AboutUsFormData;
  ourStoryData: OurStoryFormData;
}
