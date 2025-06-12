import { Input } from "@/components/atoms/Input";
import ErrorMessage from "@/components/molecules/global/ErrorMessage";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { ProductFormValues } from "./AddProductForm";

type InputGroupProps = {
  label: string;
  name: keyof ProductFormValues;
  register: UseFormRegister<ProductFormValues>;
  errors?: FieldErrors<ProductFormValues>;
  type?: string;
  required?: boolean;
  multiple?: boolean;
  placeholder?: string;
};

const InputGroup: React.FC<InputGroupProps> = ({
  label,
  name,
  register,
  errors,
  type,
  required = false,
  multiple = false,
  placeholder,
}) => (
  <div className="space-y-1">
    <label className="font-semibold text-sm">
      {label} {required && "*"}
    </label>
    <Input
      type={type}
      multiple={multiple}
      placeholder={placeholder}
      {...register(name, required ? { required: `${label} is required` } : {})}
      className="w-full py-2 px-3 border border-gray-300 text-sm rounded-md font-medium bg-white"
    />
    {errors !== undefined && <ErrorMessage error={errors[name]} />}
  </div>
);

export default InputGroup;
