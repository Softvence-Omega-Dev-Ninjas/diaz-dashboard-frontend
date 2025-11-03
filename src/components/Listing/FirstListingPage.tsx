import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState, useRef } from 'react';
import { Upload, X, Plus } from 'lucide-react';
import RightPreviewSection from './RightPreviewSection';

const firstStepSchema = z.object({
  buildYear: z.string().optional(),
  make: z.string().optional(),
  model: z.string().optional(),
  lengthFt: z.string().optional(),
  lengthIn: z.string().optional(),
  beamFt: z.string().optional(),
  beamIn: z.string().optional(),
  maxDraftFt: z.string().optional(),
  maxDraftIn: z.string().optional(),
  class: z.string().optional(),
  material: z.string().optional(),
  fuelType: z.string().optional(),
  numberOfEngines: z.string().optional(),
  numberOfCabins: z.string().optional(),
  numberOfHeads: z.string().optional(),
  engine1Hours: z.string().optional(),
  engine1Make: z.string().optional(),
  engine1Model: z.string().optional(),
  engine1TotalPower: z.string().optional(),
  engine1FuelType: z.string().optional(),
  engine1PropellerType: z.string().optional(),
  condition: z.string().optional(),
  price: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zip: z.string().optional(),
  name: z.string().optional(),
  description: z.string().optional(),
  embedUrl: z.string().optional(),
});

type FirstStepFormData = z.infer<typeof firstStepSchema>;

interface MoreDetail {
  title: string;
  description: string;
}

interface FirstListingPageProps {
  onNext: (data: FirstStepFormData & { coverPhoto: string | null; galleryPhotos: string[]; moreDetails: MoreDetail[] }) => void;
  initialData?: Partial<FirstStepFormData>;
}

const FirstListingPage = ({ onNext, initialData }: FirstListingPageProps) => {
  const { register, handleSubmit, watch } = useForm<FirstStepFormData>({
    resolver: zodResolver(firstStepSchema),
    defaultValues: initialData || {},
  });

  const [coverPhoto, setCoverPhoto] = useState<string | null>(null);
  const [galleryPhotos, setGalleryPhotos] = useState<string[]>([]);
  const [moreDetails, setMoreDetails] = useState<MoreDetail[]>([{ title: '', description: '' }]);
  
  const coverPhotoRef = useRef<HTMLInputElement>(null);
  const galleryPhotoRef = useRef<HTMLInputElement>(null);

  // Watch form values for real-time preview updates
  const formValues = watch();

  const handleCoverPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGalleryUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newPhotos: string[] = [];
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          newPhotos.push(reader.result as string);
          if (newPhotos.length === files.length) {
            setGalleryPhotos([...galleryPhotos, ...newPhotos]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeGalleryPhoto = (index: number) => {
    setGalleryPhotos(galleryPhotos.filter((_, i) => i !== index));
  };

  const addMoreDetail = () => {
    setMoreDetails([...moreDetails, { title: '', description: '' }]);
  };

  const updateMoreDetail = (index: number, field: 'title' | 'description', value: string) => {
    const updated = [...moreDetails];
    updated[index][field] = value;
    setMoreDetails(updated);
  };

  const onSubmit = (data: FirstStepFormData) => {
    // Combine ft and in values into formatted strings
    const formattedData = {
      ...data,
      length: data.lengthFt || data.lengthIn 
        ? `${data.lengthFt || ''}${data.lengthFt ? 'ft' : ''} ${data.lengthIn || ''}${data.lengthIn ? 'in' : ''}`.trim()
        : undefined,
      beamSize: data.beamFt || data.beamIn
        ? `${data.beamFt || ''}${data.beamFt ? 'ft' : ''} ${data.beamIn || ''}${data.beamIn ? 'in' : ''}`.trim()
        : undefined,
      maxDraft: data.maxDraftFt || data.maxDraftIn
        ? `${data.maxDraftFt || ''}${data.maxDraftFt ? 'ft' : ''} ${data.maxDraftIn || ''}${data.maxDraftIn ? 'in' : ''}`.trim()
        : undefined,
    };
    
    onNext({ ...formattedData, coverPhoto, galleryPhotos, moreDetails });
  };

  return (
    <div className=" mx-auto p-4 md:p-6 lg:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Form Section */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Progress Bar */}
            <div>
              <h1 className="text-xl md:text-2xl font-semibold mb-2">Listing progress</h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex-1">
                  <div className="h-1 bg-cyan-500 rounded-full"></div>
                  <p className="text-xs text-gray-600 mt-1">Boat Information</p>
                </div>
                <div className="flex-1">
                  <div className="h-1 bg-gray-200 rounded-full"></div>
                  <p className="text-xs text-gray-400 mt-1">Seller Information</p>
                </div>
              </div>
              <p className="text-sm text-gray-500 text-right">Step 1</p>
            </div>

            {/* Specifications Section */}
            <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6">
              <h2 className="text-lg font-semibold mb-4">Specifications</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Build Year: <span className="text-red-500">*</span>
                  </label>
                  <select {...register('buildYear')} className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm focus:ring-2 focus:ring-cyan-500 focus:border-transparent">
                    <option value="">Select</option>
                    {Array.from({ length: 50 }, (_, i) => new Date().getFullYear() - i).map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Make: <span className="text-red-500">*</span>
                  </label>
                  <select {...register('make')} className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm focus:ring-2 focus:ring-cyan-500 focus:border-transparent">
                    <option value="">Select</option>
                    <option value="Viking">Viking</option>
                    <option value="Hatteras">Hatteras</option>
                    <option value="SeaVee">SeaVee</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Model: <span className="text-red-500">*</span>
                  </label>
                  <select {...register('model')} className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm focus:ring-2 focus:ring-cyan-500 focus:border-transparent">
                    <option value="">Select</option>
                    <option value="80 Enclosed">80 Enclosed</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Length (Ft/In):</label>
                  <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <input 
                        {...register('lengthFt')} 
                        type="text" 
                        placeholder="-" 
                        className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-lg text-sm text-center bg-gray-50 focus:ring-2 focus:ring-cyan-500 focus:border-transparent focus:bg-white" 
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">ft</span>
                    </div>
                    <div className="relative flex-1">
                      <input 
                        {...register('lengthIn')} 
                        type="text" 
                        placeholder="-" 
                        className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-lg text-sm text-center bg-gray-50 focus:ring-2 focus:ring-cyan-500 focus:border-transparent focus:bg-white" 
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">In</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Beam Size(Ft/In):</label>
                  <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <input 
                        {...register('beamFt')} 
                        type="text" 
                        placeholder="-" 
                        className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-lg text-sm text-center bg-gray-50 focus:ring-2 focus:ring-cyan-500 focus:border-transparent focus:bg-white" 
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">ft</span>
                    </div>
                    <div className="relative flex-1">
                      <input 
                        {...register('beamIn')} 
                        type="text" 
                        placeholder="-" 
                        className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-lg text-sm text-center bg-gray-50 focus:ring-2 focus:ring-cyan-500 focus:border-transparent focus:bg-white" 
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">In</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Max Draft(Ft/In):</label>
                  <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <input 
                        {...register('maxDraftFt')} 
                        type="text" 
                        placeholder="-" 
                        className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-lg text-sm text-center bg-gray-50 focus:ring-2 focus:ring-cyan-500 focus:border-transparent focus:bg-white" 
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">ft</span>
                    </div>
                    <div className="relative flex-1">
                      <input 
                        {...register('maxDraftIn')} 
                        type="text" 
                        placeholder="-" 
                        className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-lg text-sm text-center bg-gray-50 focus:ring-2 focus:ring-cyan-500 focus:border-transparent focus:bg-white" 
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">In</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Class: <span className="text-red-500">*</span>
                  </label>
                  <select {...register('class')} className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm focus:ring-2 focus:ring-cyan-500 focus:border-transparent">
                    <option value="">Select</option>
                    <option value="Power">Power</option>
                    <option value="Sail">Sail</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Material: <span className="text-red-500">*</span>
                  </label>
                  <select {...register('material')} className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm focus:ring-2 focus:ring-cyan-500 focus:border-transparent">
                    <option value="">Select</option>
                    <option value="Fiberglass">Fiberglass</option>
                    <option value="Aluminum">Aluminum</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Fuel Type: <span className="text-red-500">*</span>
                  </label>
                  <select {...register('fuelType')} className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm focus:ring-2 focus:ring-cyan-500 focus:border-transparent">
                    <option value="">Select</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Gas">Gas</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Number of Engine: <span className="text-red-500">*</span>
                  </label>
                  <select {...register('numberOfEngines')} className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm focus:ring-2 focus:ring-cyan-500 focus:border-transparent">
                    <option value="01">01</option>
                    <option value="02">02</option>
                    <option value="03">03</option>
                    <option value="04">04</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Number of Cabin: <span className="text-red-500">*</span>
                  </label>
                  <select {...register('numberOfCabins')} className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm focus:ring-2 focus:ring-cyan-500 focus:border-transparent">
                    <option value="">Select</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Number of Heads: <span className="text-red-500">*</span>
                  </label>
                  <select {...register('numberOfHeads')} className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm focus:ring-2 focus:ring-cyan-500 focus:border-transparent">
                    <option value="">Select</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Engine 1 Section */}
            <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6">
              <h2 className="text-lg font-semibold mb-4">Engine 1</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Hours:</label>
                  <input {...register('engine1Hours')} type="text" placeholder="Type here" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-50 focus:ring-2 focus:ring-cyan-500 focus:border-transparent focus:bg-white" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Make:</label>
                  <input {...register('engine1Make')} type="text" placeholder="Type here" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-50 focus:ring-2 focus:ring-cyan-500 focus:border-transparent focus:bg-white" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Model:</label>
                  <input {...register('engine1Model')} type="text" placeholder="Type here" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-50 focus:ring-2 focus:ring-cyan-500 focus:border-transparent focus:bg-white" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Total Power (HP):</label>
                  <input {...register('engine1TotalPower')} type="text" placeholder="Type here" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-50 focus:ring-2 focus:ring-cyan-500 focus:border-transparent focus:bg-white" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Fuel Type</label>
                  <select {...register('engine1FuelType')} className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm focus:ring-2 focus:ring-cyan-500 focus:border-transparent">
                    <option value="">Select</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Gas">Gas</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Propeller Type</label>
                  <select {...register('engine1PropellerType')} className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm focus:ring-2 focus:ring-cyan-500 focus:border-transparent">
                    <option value="">Select</option>
                    <option value="Fixed">Fixed</option>
                    <option value="Folding">Folding</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Basic Information Section */}
            <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6">
              <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Condition: <span className="text-red-500">*</span>
                  </label>
                  <select {...register('condition')} className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm focus:ring-2 focus:ring-cyan-500 focus:border-transparent">
                    <option value="">Select</option>
                    <option value="New">New</option>
                    <option value="Used">Used</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Price: <span className="text-red-500">*</span>
                  </label>
                  <input {...register('price')} type="text" placeholder="Type here" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-50 focus:ring-2 focus:ring-cyan-500 focus:border-transparent focus:bg-white" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    City: <span className="text-red-500">*</span>
                  </label>
                  <select {...register('city')} className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm focus:ring-2 focus:ring-cyan-500 focus:border-transparent">
                    <option value="">Select</option>
                    <option value="Miami">Miami</option>
                    <option value="Fort Lauderdale">Fort Lauderdale</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">
                    State: <span className="text-red-500">*</span>
                  </label>
                  <select {...register('state')} className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm focus:ring-2 focus:ring-cyan-500 focus:border-transparent">
                    <option value="">Select</option>
                    <option value="Florida">Florida</option>
                    <option value="California">California</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Zip: <span className="text-red-500">*</span>
                  </label>
                  <input {...register('zip')} type="text" placeholder="Type here" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-50 focus:ring-2 focus:ring-cyan-500 focus:border-transparent focus:bg-white" />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Name: <span className="text-red-500">*</span>
                </label>
                <input {...register('name')} type="text" placeholder="Type here" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-50 focus:ring-2 focus:ring-cyan-500 focus:border-transparent focus:bg-white" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Description:</label>
                <textarea {...register('description')} placeholder="Write description..." rows={4} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-50 focus:ring-2 focus:ring-cyan-500 focus:border-transparent focus:bg-white resize-none"></textarea>
              </div>
            </div>

            {/* More Details Section */}
            <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6">
              <h2 className="text-lg font-semibold mb-4">More Details (optional)</h2>
              
              {moreDetails.map((detail, index) => (
                <div key={index} className="mb-4 space-y-3">
                  <input
                    type="text"
                    placeholder="Enter Title"
                    value={detail.title}
                    onChange={(e) => updateMoreDetail(index, 'title', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-50 focus:ring-2 focus:ring-cyan-500 focus:border-transparent focus:bg-white"
                  />
                  <textarea
                    placeholder="Write description..."
                    value={detail.description}
                    onChange={(e) => updateMoreDetail(index, 'description', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-50 focus:ring-2 focus:ring-cyan-500 focus:border-transparent focus:bg-white resize-none"
                  ></textarea>
                </div>
              ))}

              <button
                type="button"
                onClick={addMoreDetail}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Another Description
              </button>
            </div>

            {/* Media & Gallery Section */}
            <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6">
              <h2 className="text-lg font-semibold mb-2">Media & Gallery</h2>
              <p className="text-sm text-gray-500 mb-4">Your package allows 25 images.</p>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Enter Embed URL (YouTube or Vimeo):</label>
                <input {...register('embedUrl')} type="text" placeholder="url" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-50 focus:ring-2 focus:ring-cyan-500 focus:border-transparent focus:bg-white" />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Upload Cover Photo</label>
                {coverPhoto ? (
                  <div className="relative w-full h-48 border border-gray-300 rounded-lg overflow-hidden">
                    <img src={coverPhoto} alt="Cover" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setCoverPhoto(null)}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div
                    onClick={() => coverPhotoRef.current?.click()}
                    className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-cyan-500 transition-colors"
                  >
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">Click to upload or drag & drop</p>
                  </div>
                )}
                <input
                  ref={coverPhotoRef}
                  type="file"
                  accept="image/*"
                  onChange={handleCoverPhotoUpload}
                  className="hidden"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Upload Media Gallery</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4">
                  {galleryPhotos.map((photo, index) => (
                    <div key={index} className="relative aspect-square border border-gray-300 rounded-lg overflow-hidden group">
                      <img src={photo} alt={`Gallery ${index + 1}`} className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removeGalleryPhoto(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-3 h-3" />
                      </button>
                      {index === galleryPhotos.length - 1 && (
                        <button
                          type="button"
                          className="absolute bottom-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded"
                        >
                          See All {galleryPhotos.length} photo
                        </button>
                      )}
                    </div>
                  ))}
                  
                  <div
                    onClick={() => galleryPhotoRef.current?.click()}
                    className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-cyan-500 transition-colors"
                  >
                    <Plus className="w-8 h-8 text-gray-400 mb-1" />
                    <p className="text-xs text-gray-500">Add Photo</p>
                  </div>
                </div>
                <input
                  ref={galleryPhotoRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleGalleryUpload}
                  className="hidden"
                />
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center pt-4">
              <button
                type="button"
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors flex items-center gap-2"
              >
                Next
                <span>→</span>
              </button>
            </div>
          </form>
        </div>

        {/* Right Preview Section */}
        <div className="lg:col-span-1">
          <RightPreviewSection 
            data={{
              coverPhoto,
              city: formValues.city,
              state: formValues.state,
              name: formValues.name,
              make: formValues.make,
              model: formValues.model,
              buildYear: formValues.buildYear,
              price: formValues.price,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default FirstListingPage;