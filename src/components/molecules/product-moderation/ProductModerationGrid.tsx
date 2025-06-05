import React from "react";
import Image from "next/image";
import { Button } from "@/components/atoms/Button";
import { RowData } from "@/types";

const ProductModerationGrid = ({ data }: { data: RowData[] }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
      {data.map((item) => (
        <div
          key={item.id}
          className="p-4 border border-pale-rose rounded-lg relative bg-white"
        >
          <Image
            src={item.image}
            alt={item.name}
            width={100}
            height={100}
            className="rounded-md object-cover mx-auto"
          />
          <div className="text-center mt-2">
            <p className="font-semibold">{item.name}</p>
            <p className="text-sm text-gray-500">{item.seller}</p>
            <p className="text-xs text-gray-400">{item.submitted}</p>
            <div className="mt-2 space-x-2">
              <Button className="text-green-600 text-sm hover:underline">
                Approve
              </Button>
              <Button className="text-red-600 text-sm hover:underline">
                Reject
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductModerationGrid;
