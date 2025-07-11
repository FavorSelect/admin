/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Button } from "@/components/atoms/Button";
import toast from "react-hot-toast";
import Spinner from "../global/Spinner";
import { Edit, Trash } from "lucide-react";
import { useDeleteWarehouseAddressMutation } from "@/store/api/warehouseAddressApi";

type ShippingAddressListProps = {
  onEdit: (address: any) => void;
  addresses: any[];
  refetch: () => void;
};

const WarehouseAddressList = ({
  onEdit,
  addresses,
  refetch,
}: ShippingAddressListProps) => {
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [deleteWarehouseAddress] = useDeleteWarehouseAddressMutation();

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this address?"
    );
    if (!confirmed) return;

    setDeletingId(id);
    try {
      await deleteWarehouseAddress(id).unwrap();
      toast.success("Address deleted successfully!");
      refetch();
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message || "Failed to delete address.");
      } else {
        toast.error("Failed to delete address.");
      }
    }
  };

  return (
    <div className="space-y-4">
      {addresses.length !== 0 &&
        addresses.map((address: any) => (
          <div
            key={address.id}
            className="border border-gray-200 rounded-lg p-5 bg-white"
          >
            <div className="flex justify-between items-start gap-4">
              <div className="space-y-2 text-sm text-gray-700">
                <div>
                  <p className="font-semibold text-gray-800">
                    {address.warehouseName}
                  </p>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Phone:</span>{" "}
                  <span>{address.contactNumber}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Address:</span>{" "}
                  <span>{address.addressLine}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-600">City:</span>{" "}
                  <span>{address.city}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-600">District:</span>{" "}
                  <span>{address.district}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-600">State:</span>{" "}
                  <span>{address.state}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Country:</span>{" "}
                  <span>{address.countryName?.toUpperCase()}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Pin Code:</span>{" "}
                  <span>{address.pinCode}</span>
                </div>
              </div>

              {/* Default Badge */}
              {address.isPrimary && (
                <span className="text-xs font-medium bg-green-100 text-green-700 px-2 py-1 rounded">
                  Primary
                </span>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-4">
              <Button
                onClick={() => onEdit(address)}
                className="text-sm border border-gray-300 px-4 py-2 rounded-md text-gray-700 hover:bg-gray-50 transition"
              >
                <Edit className="w-4 h-4" />
                Edit
              </Button>
              <Button
                onClick={() => handleDelete(address.id)}
                className="text-sm border border-transparent px-4 py-2 rounded-md text-white bg-scarlet-red hover:bg-red-600 transition"
              >
                {deletingId === address.id ? (
                  <>
                    <Spinner />
                    <span className="ml-1">Deleting...</span>
                  </>
                ) : (
                  <>
                    <Trash className="w-4 h-4" /> <span>Delete</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default WarehouseAddressList;
