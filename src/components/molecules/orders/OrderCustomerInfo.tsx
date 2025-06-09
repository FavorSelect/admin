import React from "react";

interface Props {
  name: string;
  email: string;
}

const OrderCustomerInfo = ({ name, email }: Props) => (
  <div className="border-b border-b-pale-rose pb-4">
    <h2 className="text-lg font-semibold text-gray-800 mb-2">
      Customer Information
    </h2>
    <p>
      <span className="font-medium">Name:</span> {name}
    </p>
    <p>
      <span className="font-medium">Email:</span> {email}
    </p>
  </div>
);

export default OrderCustomerInfo;
