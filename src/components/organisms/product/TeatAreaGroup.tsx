import { Textarea } from "@/components/atoms/Textarea";
import ErrorMessage from "@/components/molecules/global/ErrorMessage";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { ProductFormValues } from "./AddProductForm";

type TextAreaGroupProps = {
  label: string;
  name: keyof ProductFormValues;
  register: UseFormRegister<ProductFormValues>;
  errors?: FieldErrors<ProductFormValues>;
  required?: boolean;
  placeholder?: string;
};

const TextAreaGroup: React.FC<TextAreaGroupProps> = ({
  label,
  name,
  register,
  errors,
  required,
  placeholder,
}) => (
  <div className="space-y-1">
    <label className="font-semibold text-sm">
      {label} {""} {required && "*"}
    </label>
    <Textarea
      {...register(name, required ? { required: `${label} is required` } : {})}
      className="w-full border border-gray-300 text-sm rounded-md font-medium bg-white"
      rows={4}
      placeholder={placeholder}
    />
    {errors !== undefined && <ErrorMessage error={errors[name]} />}
  </div>
);

export default TextAreaGroup;
