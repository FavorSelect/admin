import { Input } from "@/components/atoms/Input";
import React from "react";
import { FieldErrors, Path, UseFormRegister } from "react-hook-form";

interface InputGroupProps<T extends Record<string, unknown>> {
  label: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  errors?: FieldErrors<T>;
  required?: boolean;
  placeholder?: string;
  type?: string;
  step?: string;
  min?: string;
}

const InputGroup = <T extends Record<string, unknown>>({
  label,
  name,
  register,
  errors,
  required,
  placeholder,
  type = "text",
  step,
  min,
}: InputGroupProps<T>) => {
  return (
    <div className="space-y-1">
      <label className="font-semibold text-sm inline-block mb-1">
        {label} {required && "*"}
      </label>
      <Input
        type={type}
        step={step}
        min={min}
        placeholder={placeholder}
        {...register(
          name,
          required ? { required: `${label} is required` } : {}
        )}
        className="w-full py-2 px-3 border border-gray-300 text-sm rounded-md font-medium bg-white"
      />
      {errors && errors[name] && (
        <p className="text-red-500 text-sm mt-1">
          {(errors[name]?.message as string) || "This field is required"}
        </p>
      )}
    </div>
  );
};

export default InputGroup;
