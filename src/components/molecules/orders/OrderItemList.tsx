import React from "react";
import Image from "next/image";

interface Item {
  id: number;
  productImageUrl: string;
  productName: string;
  quantity: number;
  price: number;
  totalPrice: number;
}

const OrderItemList = ({ items }: { items: Item[] }) => (
  <div>
    <h2 className="text-lg font-semibold text-gray-800 mb-4">Order Items</h2>
    <div className="space-y-4">
      {items.map((item) => (
        <div
          key={item.id}
          className="flex items-center justify-between border border-pale-rose rounded-md p-4"
        >
          <div className="flex items-center gap-4">
            <Image
              src={item.productImageUrl}
              alt={item.productName}
              width={100}
              height={100}
              className="rounded-md object-cover"
            />
            <div>
              <p className="font-medium text-gray-800">{item.productName}</p>
              <p className="text-sm text-gray-500">
                Quantity: {item.quantity} × ${item.price.toLocaleString()}
              </p>
            </div>
          </div>
          <p className="font-semibold text-gray-800">
            ${item.totalPrice.toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  </div>
);

export default OrderItemList;
