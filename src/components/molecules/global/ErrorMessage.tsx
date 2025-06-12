import { FieldError } from "react-hook-form";

type ErrorMessageProps = {
  error?: FieldError | { message?: string };
};

const ErrorMessage: React.FC<ErrorMessageProps> = ({ error }) => {
  if (!error || typeof error !== "object") return null;

  return (
    <p className="text-red-500 text-sm mt-1">
      {"message" in error ? error.message : null}
    </p>
  );
};

export default ErrorMessage;
