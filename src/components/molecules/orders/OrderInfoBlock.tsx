import React from "react";
import { format } from "date-fns";

interface Props {
  orderId: string;
  orderStatus: string;
  paymentMethod: string | null;
  paymentStatus: string | null;
  deliveryDate: string | null;
  totalAmount: number;
}

const OrderInfoBlock = ({
  orderId,
  orderStatus,
  paymentMethod,
  paymentStatus,
  deliveryDate,
  totalAmount,
}: Props) => (
  <div className="border-b border-b-pale-rose pb-4">
    <h2 className="text-lg font-semibold text-gray-800 mb-2">
      Order Information
    </h2>
    <p>
      <span className="font-medium">Order ID:</span> #
      {orderId.replaceAll("-", "")}
    </p>
    <p>
      <span className="font-medium">Order Status:</span>{" "}
      <span className="font-semibold">{orderStatus}</span>
    </p>
    <p>
      <span className="font-medium">Payment Method:</span>{" "}
      {paymentMethod || "N/A"}
    </p>
    <p>
      <span className="font-medium">Payment Status:</span>{" "}
      {paymentStatus || "N/A"}
    </p>
    <p>
      <span className="font-medium">Delivery Date:</span>{" "}
      {deliveryDate ? format(new Date(deliveryDate), "dd MMM yyyy") : "N/A"}
    </p>
    <p>
      <span className="font-medium">Total Amount:</span> $
      {totalAmount.toLocaleString()}
    </p>
  </div>
);

export default OrderInfoBlock;
