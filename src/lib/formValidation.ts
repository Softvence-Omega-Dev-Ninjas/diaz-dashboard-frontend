import z from 'zod';

// Step 1 - Boat Information Schema
export const firstStepSchema = z.object({
  buildYear: z.coerce
    .number()
    .min(1900, 'Invalid year')
    .max(new Date().getFullYear() + 1, 'Invalid year'),
  make: z.string().min(1, 'Make is required'),
  model: z.string().min(1, 'Model is required'),
  lengthFt: z.coerce.number().min(0, 'Length feet must be positive'),
  lengthIn: z.coerce
    .number()
    .min(0, 'Length inches must be 0-12')
    .max(12, 'Inches cannot exceed 12'),
  beamFt: z.coerce.number().min(0, 'Beam feet must be positive'),
  beamIn: z.coerce
    .number()
    .min(0, 'Beam inches must be 0-12')
    .max(12, 'Inches cannot exceed 12'),
  maxDraftFt: z.coerce.number().min(0, 'Draft feet must be positive'),
  maxDraftIn: z.coerce
    .number()
    .min(0, 'Draft inches must be 0-12')
    .max(12, 'Inches cannot exceed 12'),
  class: z.string().min(1, 'Class is required'),
  material: z.string().min(1, 'Material is required'),
  fuelType: z.string().min(1, 'Fuel type is required'),
  propMaterial: z.string().min(1, 'Propeller material is required'),
  numberOfEngines: z.coerce
    .number()
    .min(1, 'Number of engines is required')
    .max(10, 'Maximum 10 engines'),
  numberOfCabins: z.coerce
    .number()
    .min(0, 'Number of cabins must be positive')
    .max(50, 'Maximum 50 cabins'),
  numberOfHeads: z.coerce
    .number()
    .min(0, 'Number of heads must be positive')
    .max(50, 'Maximum 50 heads'),
  engine1Hours: z.coerce.number().min(0, 'Hours must be positive'),
  engine1Make: z.string().min(1, 'Engine make is required'),
  engine1Model: z.string().min(1, 'Engine model is required'),
  engine1TotalPower: z.coerce.number().min(0, 'Total power must be positive'),
  engine1FuelType: z.string().min(1, 'Engine fuel type is required'),
  engine1PropellerType: z.string().min(1, 'Propeller type is required'),

  // Engine fields for engine2..engine10.
  // These must exist in the schema; otherwise `zodResolver` strips them and only
  // `engine1*` values reach `createBoatRegistrationFormData`, resulting in only
  // the first engine being effectively persisted.
  engine2Hours: z.coerce.number().min(0, 'Hours must be positive').optional(),
  engine2Make: z.string().min(1, 'Engine make is required').optional(),
  engine2Model: z.string().min(1, 'Engine model is required').optional(),
  engine2TotalPower: z.coerce.number().min(0, 'Total power must be positive').optional(),
  engine2FuelType: z.string().min(1, 'Engine fuel type is required').optional(),
  engine2PropellerType: z.string().min(1, 'Propeller type is required').optional(),

  engine3Hours: z.coerce.number().min(0, 'Hours must be positive').optional(),
  engine3Make: z.string().min(1, 'Engine make is required').optional(),
  engine3Model: z.string().min(1, 'Engine model is required').optional(),
  engine3TotalPower: z.coerce.number().min(0, 'Total power must be positive').optional(),
  engine3FuelType: z.string().min(1, 'Engine fuel type is required').optional(),
  engine3PropellerType: z.string().min(1, 'Propeller type is required').optional(),

  engine4Hours: z.coerce.number().min(0, 'Hours must be positive').optional(),
  engine4Make: z.string().min(1, 'Engine make is required').optional(),
  engine4Model: z.string().min(1, 'Engine model is required').optional(),
  engine4TotalPower: z.coerce.number().min(0, 'Total power must be positive').optional(),
  engine4FuelType: z.string().min(1, 'Engine fuel type is required').optional(),
  engine4PropellerType: z.string().min(1, 'Propeller type is required').optional(),

  engine5Hours: z.coerce.number().min(0, 'Hours must be positive').optional(),
  engine5Make: z.string().min(1, 'Engine make is required').optional(),
  engine5Model: z.string().min(1, 'Engine model is required').optional(),
  engine5TotalPower: z.coerce.number().min(0, 'Total power must be positive').optional(),
  engine5FuelType: z.string().min(1, 'Engine fuel type is required').optional(),
  engine5PropellerType: z.string().min(1, 'Propeller type is required').optional(),

  engine6Hours: z.coerce.number().min(0, 'Hours must be positive').optional(),
  engine6Make: z.string().min(1, 'Engine make is required').optional(),
  engine6Model: z.string().min(1, 'Engine model is required').optional(),
  engine6TotalPower: z.coerce.number().min(0, 'Total power must be positive').optional(),
  engine6FuelType: z.string().min(1, 'Engine fuel type is required').optional(),
  engine6PropellerType: z.string().min(1, 'Propeller type is required').optional(),

  engine7Hours: z.coerce.number().min(0, 'Hours must be positive').optional(),
  engine7Make: z.string().min(1, 'Engine make is required').optional(),
  engine7Model: z.string().min(1, 'Engine model is required').optional(),
  engine7TotalPower: z.coerce.number().min(0, 'Total power must be positive').optional(),
  engine7FuelType: z.string().min(1, 'Engine fuel type is required').optional(),
  engine7PropellerType: z.string().min(1, 'Propeller type is required').optional(),

  engine8Hours: z.coerce.number().min(0, 'Hours must be positive').optional(),
  engine8Make: z.string().min(1, 'Engine make is required').optional(),
  engine8Model: z.string().min(1, 'Engine model is required').optional(),
  engine8TotalPower: z.coerce.number().min(0, 'Total power must be positive').optional(),
  engine8FuelType: z.string().min(1, 'Engine fuel type is required').optional(),
  engine8PropellerType: z.string().min(1, 'Propeller type is required').optional(),

  engine9Hours: z.coerce.number().min(0, 'Hours must be positive').optional(),
  engine9Make: z.string().min(1, 'Engine make is required').optional(),
  engine9Model: z.string().min(1, 'Engine model is required').optional(),
  engine9TotalPower: z.coerce.number().min(0, 'Total power must be positive').optional(),
  engine9FuelType: z.string().min(1, 'Engine fuel type is required').optional(),
  engine9PropellerType: z.string().min(1, 'Propeller type is required').optional(),

  engine10Hours: z.coerce.number().min(0, 'Hours must be positive').optional(),
  engine10Make: z.string().min(1, 'Engine make is required').optional(),
  engine10Model: z.string().min(1, 'Engine model is required').optional(),
  engine10TotalPower: z.coerce.number().min(0, 'Total power must be positive').optional(),
  engine10FuelType: z.string().min(1, 'Engine fuel type is required').optional(),
  engine10PropellerType: z.string().min(1, 'Propeller type is required').optional(),

  condition: z.string().min(1, 'Condition is required'),
  price: z.coerce.number().min(0, 'Price must be positive'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  zip: z.string().min(1, 'Zip is required'),
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  embedUrl: z.string().optional(),
});

// Step 2 - Seller Information Schema
export const secondStepSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  contactNumber: z.string().min(1, 'Contact number is required'),
  email: z.string().email('Invalid email address').min(1, 'Email is required'),
  country: z.string().min(1, 'Country is required'),
  sellerCity: z.string().min(1, 'City is required'),
  sellerState: z.string().min(1, 'State is required'),
  sellerZip: z.string().min(1, 'Zip code is required'),
});
