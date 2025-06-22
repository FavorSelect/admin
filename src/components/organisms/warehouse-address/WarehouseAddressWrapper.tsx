/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/atoms/Button";
import Span from "@/components/atoms/Span";
import { MapPin } from "lucide-react";
import React, { useState } from "react";
import WarehouseAddressList from "@/components/molecules/warehouse-address/WarehouseAddressList";
import WarehouseAddForm from "@/components/molecules/warehouse-address/WarehouseAddForm";
import DrawerContainer from "@/components/molecules/global/DrawerContainer";
import { useGetWarehouseAddressesQuery } from "@/store/api/warehouseAddressApi";

const WarehouseAddressWrapper = () => {
  const { data, refetch } = useGetWarehouseAddressesQuery();

  const [isOpen, setIsOpen] = useState(false);
  const [editAddress, setEditAddress] = useState<any | null>(null);

  const openForAdd = () => {
    setEditAddress(null);
    setIsOpen(true);
  };

  const openForEdit = (address: any) => {
    setEditAddress(address);
    setIsOpen(true);
  };

  return (
    <>
      <div className="relative h-full flex flex-col">
        {/* Header Section */}
        <div className="w-full flex justify-between items-center p-4">
          <h2 className="text-xl font-bold text-gray-800">
            Warehouse address Address
          </h2>
          <Span className="text-sm text-gray-500 hover:text-gray-700">
            Manage warehouse address addresses
          </Span>
        </div>

        <div className="flex-grow px-4">
          {data?.warehouses.length !== 0 ? (
            <>
              <WarehouseAddressList
                onEdit={openForEdit}
                addresses={data?.warehouses || []}
                refetch={refetch}
              />
              <div className="flex justify-end mt-4">
                <Button
                  onClick={openForAdd}
                  className="px-6 py-2 rounded-md text-sm bg-scarlet-red text-white"
                >
                  Add More
                </Button>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              <MapPin className="text-gray-300 w-12 h-12 mb-4" />
              <h2 className="text-lg font-semibold text-gray-700 mb-2">
                No addresses saved
              </h2>
              <p className="text-sm text-gray-500 mb-4">
                Add an address for faster checkout
              </p>
              <Button
                onClick={openForAdd}
                className="px-6 py-2 rounded-md text-sm bg-scarlet-red"
              >
                Add Address
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Drawer for add/edit */}
      <DrawerContainer
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        dismissible={false}
      >
        <WarehouseAddForm
          setIsOpen={setIsOpen}
          updateAdd={editAddress}
          refetch={refetch}
        />
      </DrawerContainer>
    </>
  );
};

export default WarehouseAddressWrapper;
