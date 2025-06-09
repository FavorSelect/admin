import React from "react";

interface SellerInfoItemProps {
  label: string;
  value: React.ReactNode;
  fullWidth?: boolean;
}

const SellerInfoItem = ({
  label,
  value,
  fullWidth = false,
}: SellerInfoItemProps) => {
  return (
    <p className={fullWidth ? "col-span-full" : ""}>
      <strong>{label}:</strong> {value}
    </p>
  );
};

export default SellerInfoItem;
