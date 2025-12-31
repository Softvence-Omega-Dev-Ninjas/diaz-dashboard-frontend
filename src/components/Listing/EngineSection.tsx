/* eslint-disable @typescript-eslint/no-explicit-any */
import type { UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { DynamicFormSelect } from './DynamicFormSelect';
import { FormField } from './FormField';

interface EngineSectionProps {
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  watch: UseFormWatch<any>;
  engineNumber?: number;
}

export function EngineSection({
  register,
  setValue,
  watch,
  engineNumber = 1,
}: EngineSectionProps) {
  const formValues = watch();

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6">
      <h2 className="text-lg font-semibold mb-4">Engine {engineNumber}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <FormField
          label="Hours:"
          name="engine1Hours"
          register={register}
          type="number"
          required
        />
        <FormField
          label="Make:"
          name="engine1Make"
          register={register}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <FormField
          label="Model:"
          name="engine1Model"
          register={register}
          required
        />
        <FormField
          label="Total Power (HP):"
          name="engine1TotalPower"
          register={register}
          type="number"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <DynamicFormSelect
          label="Engine Fuel Type:"
          name="engine1FuelType"
          type="ENGINE_TYPE"
          register={register}
          value={formValues.engine1FuelType}
          onChange={(value) => setValue('engine1FuelType', value)}
          required
        />
        <DynamicFormSelect
          label="Propeller Type:"
          name="engine1PropellerType"
          type="PROP_TYPE"
          register={register}
          value={formValues.engine1PropellerType}
          onChange={(value) => setValue('engine1PropellerType', value)}
          required
        />
      </div>
    </div>
  );
}
