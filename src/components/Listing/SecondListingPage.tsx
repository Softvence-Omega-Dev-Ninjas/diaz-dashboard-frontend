import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import RightPreviewSection from './RightPreviewSection';

const secondStepSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  contactNumber: z.string().optional(),
  email: z.string().email().optional().or(z.literal('')),
  country: z.string().optional(),
  sellerCity: z.string().optional(),
  sellerState: z.string().optional(),
  sellerZip: z.string().optional(),
  username: z.string().optional(),
  password: z.string().optional(),
  confirmPassword: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type SecondStepFormData = z.infer<typeof secondStepSchema>;

interface SecondListingPageProps {
  onBack: () => void;
  onSubmit: (data: SecondStepFormData) => void;
  initialData?: Partial<SecondStepFormData>;
  previewData?: {
    coverPhoto?: string | null;
    city?: string;
    state?: string;
    name?: string;
    make?: string;
    model?: string;
    buildYear?: string;
    price?: string;
  };
}

const SecondListingPage = ({ onBack, onSubmit, initialData, previewData }: SecondListingPageProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm<SecondStepFormData>({
    resolver: zodResolver(secondStepSchema),
    defaultValues: initialData || {},
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleFormSubmit = (data: SecondStepFormData) => {
    onSubmit(data);
  };

  return (
    <div className="mx-auto p-4 md:p-6 lg:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Form Section */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
            {/* Progress Bar */}
            <div>
              <h1 className="text-xl md:text-2xl font-semibold mb-2">Listing progress</h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex-1">
                  <div className="h-1 bg-cyan-500 rounded-full"></div>
                  <p className="text-xs text-gray-600 mt-1">Boat Information</p>
                </div>
                <div className="flex-1">
                  <div className="h-1 bg-cyan-500 rounded-full"></div>
                  <p className="text-xs text-gray-600 mt-1">Seller Information</p>
                </div>
              </div>
              <p className="text-sm text-gray-500 text-right">Step 2</p>
            </div>

            {/* Your Contact Details Section */}
            <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6">
              <h2 className="text-lg font-semibold mb-4">Your Contact Details</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    First Name: <span className="text-red-500">*</span>
                  </label>
                  <input 
                    {...register('firstName')} 
                    type="text" 
                    placeholder="Type here" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-50 focus:ring-2 focus:ring-cyan-500 focus:border-transparent focus:bg-white" 
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Last Name: <span className="text-red-500">*</span>
                  </label>
                  <input 
                    {...register('lastName')} 
                    type="text" 
                    placeholder="Type here" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-50 focus:ring-2 focus:ring-cyan-500 focus:border-transparent focus:bg-white" 
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Contact Number: <span className="text-red-500">*</span>
                  </label>
                  <input 
                    {...register('contactNumber')} 
                    type="text" 
                    placeholder="Type here" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-50 focus:ring-2 focus:ring-cyan-500 focus:border-transparent focus:bg-white" 
                  />
                  {errors.contactNumber && (
                    <p className="text-red-500 text-xs mt-1">{errors.contactNumber.message}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Email: <span className="text-red-500">*</span>
                  </label>
                  <input 
                    {...register('email')} 
                    type="email" 
                    placeholder="Type here" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-50 focus:ring-2 focus:ring-cyan-500 focus:border-transparent focus:bg-white" 
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Country: <span className="text-red-500">*</span>
                </label>
                <select 
                  {...register('country')} 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                >
                  <option value="">Select</option>
                  <option value="USA">United States</option>
                  <option value="Canada">Canada</option>
                  <option value="Mexico">Mexico</option>
                </select>
                {errors.country && (
                  <p className="text-red-500 text-xs mt-1">{errors.country.message}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    City: <span className="text-red-500">*</span>
                  </label>
                  <select 
                    {...register('sellerCity')} 
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  >
                    <option value="">Select</option>
                    <option value="Miami">Miami</option>
                    <option value="Fort Lauderdale">Fort Lauderdale</option>
                  </select>
                  {errors.sellerCity && (
                    <p className="text-red-500 text-xs mt-1">{errors.sellerCity.message}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">
                    State: <span className="text-red-500">*</span>
                  </label>
                  <select 
                    {...register('sellerState')} 
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  >
                    <option value="">Select</option>
                    <option value="Florida">Florida</option>
                    <option value="California">California</option>
                  </select>
                  {errors.sellerState && (
                    <p className="text-red-500 text-xs mt-1">{errors.sellerState.message}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Zip: <span className="text-red-500">*</span>
                  </label>
                  <input 
                    {...register('sellerZip')} 
                    type="text" 
                    placeholder="Type here" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-50 focus:ring-2 focus:ring-cyan-500 focus:border-transparent focus:bg-white" 
                  />
                  {errors.sellerZip && (
                    <p className="text-red-500 text-xs mt-1">{errors.sellerZip.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Seller Account Information Section */}
            <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6">
              <h2 className="text-lg font-semibold mb-4">Seller Account Information</h2>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Username: <span className="text-red-500">*</span>
                </label>
                <input 
                  {...register('username')} 
                  type="text" 
                  placeholder="username" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-50 focus:ring-2 focus:ring-cyan-500 focus:border-transparent focus:bg-white" 
                />
                {errors.username && (
                  <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Password: <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input 
                    {...register('password')} 
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••••" 
                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg text-sm bg-gray-50 focus:ring-2 focus:ring-cyan-500 focus:border-transparent focus:bg-white" 
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Confirm Password: <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input 
                    {...register('confirmPassword')} 
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••••" 
                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg text-sm bg-gray-50 focus:ring-2 focus:ring-cyan-500 focus:border-transparent focus:bg-white" 
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>
                )}
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center pt-4">
              <button
                type="button"
                onClick={onBack}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors flex items-center gap-2"
              >
                Post Now
                <span>→</span>
              </button>
            </div>
          </form>
        </div>

        {/* Right Preview Section */}
        <div className="lg:col-span-1">
          <RightPreviewSection 
            data={previewData || {}}
          />
        </div>
      </div>
    </div>
  );
};

export default SecondListingPage;