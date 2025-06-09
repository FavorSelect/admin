"use client";
import React from "react";
import { useGetOrderByIdQuery } from "@/store/api/orderApi";
import OrderCustomerInfo from "@/components/molecules/orders/OrderCustomerInfo";
import OrderInfoBlock from "@/components/molecules/orders/OrderInfoBlock";
import OrderItemList from "@/components/molecules/orders/OrderItemList";

const OrderDetailsWrapper = ({ token, id }: { token: string; id: string }) => {
  const {
    data: orderDetails,
    isLoading,
    isError,
  } = useGetOrderByIdQuery({ token, id });

  const order = orderDetails?.order;

  if (isLoading)
    return <p className="text-gray-500">Loading order details...</p>;
  if (isError || !order)
    return <p className="text-red-500">Failed to load order.</p>;

  return (
    <div className="w-full space-y-4">
      <OrderCustomerInfo name={order.User.firstName} email={order.User.email} />

      <OrderInfoBlock
        orderId={order.uniqueOrderId}
        orderStatus={order.orderStatus}
        paymentMethod={order.paymentMethod}
        paymentStatus={order.paymentStatus}
        deliveryDate={order.deliveryDate}
        totalAmount={order.totalAmount}
      />

      <OrderItemList items={order.orderItems} />
    </div>
  );
};

export default OrderDetailsWrapper;
