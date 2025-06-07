import { ReactNode } from "react";

interface FormHeaderProps {
  children: ReactNode;
  className?: string;
}

const FormHeader = ({ children, className = "" }: FormHeaderProps) => {
  return (
    <h1 className={`text-xl lg:text-2xl font-bold mb-2 ${className}`}>
      {children}
    </h1>
  );
};

export default FormHeader;
