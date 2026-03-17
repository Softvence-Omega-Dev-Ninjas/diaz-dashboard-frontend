/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import { Trash2 } from 'lucide-react';
import { DynamicFormSelect } from './DynamicFormSelect';
import { FormField } from './FormField';

interface EngineSectionProps {
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  watch: UseFormWatch<any>;
  engineNumber?: number;
  onDelete?: () => void;
  canDelete?: boolean;
}

export function EngineSection({
  register,
  setValue,
  watch,
  engineNumber = 1,
  onDelete,
  canDelete = false,
}: EngineSectionProps) {
  const formValues = watch();
  const engineIndex = engineNumber - 1;

  // Access engine data from engines array
  const engineData = formValues.engines?.[engineIndex] || {};

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Engine {engineNumber}</h2>
        {canDelete && onDelete && (
          <button
            type="button"
            onClick={onDelete}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Delete Engine"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <FormField
          label="Hours:"
          name={`engines.${engineIndex}.hours`}
          register={register}
          type="number"
        />
        <FormField
          label="Make:"
          name={`engines.${engineIndex}.make`}
          register={register}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <FormField
          label="Model:"
          name={`engines.${engineIndex}.model`}
          register={register}
        />
        <FormField
          label="Total Power (HP):"
          name={`engines.${engineIndex}.totalPower`}
          register={register}
          type="number"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <DynamicFormSelect
          label="Engine Fuel Type:"
          name={`engines.${engineIndex}.fuelType`}
          type="ENGINE_TYPE"
          register={register}
          value={engineData.fuelType}
          onChange={(value) => setValue(`engines.${engineIndex}.fuelType`, value)}
        />
        <DynamicFormSelect
          label="Propeller Type:"
          name={`engines.${engineIndex}.propellerType`}
          type="PROP_TYPE"
          register={register}
          value={engineData.propellerType}
          onChange={(value) => setValue(`engines.${engineIndex}.propellerType`, value)}
        />
      </div>
    </div>
  );
}
