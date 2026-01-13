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

export interface AboutUsSidebarProps {
  selectedSite: 'FLORIDA' | 'JUPITER';
  onSiteChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  updatedAt?: string;
}

export interface AboutUsPreviewProps {
  formData: AboutUsFormData;
}
