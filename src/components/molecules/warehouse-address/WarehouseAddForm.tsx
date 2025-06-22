import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/atoms/Input";
import { Button } from "@/components/atoms/Button";
import ErrorMessage from "../global/ErrorMessage";

import toast from "react-hot-toast";
import Spinner from "../global/Spinner";
import {
  useAddWarehouseAddressMutation,
  useUpdateWarehouseAddressMutation,
} from "@/store/api/warehouseAddressApi";

export type AddressFormValues = {
  id: number;
  warehouseName: string;
  contactNumber: string;
  addressLine: string;
  city: string;
  district: string;
  countryName: string;
  state: string;
  pinCode: string;
  isPrimary: boolean;
};

const WarehouseAddForm = ({
  setIsOpen,
  updateAdd,
  refetch,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  updateAdd?: AddressFormValues | null;
  refetch: () => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AddressFormValues>({
    defaultValues: updateAdd || {
      warehouseName: "",
      contactNumber: "",
      addressLine: "",
      city: "",
      district: "",
      countryName: "",
      state: "",
      pinCode: "",
      isPrimary: false,
    },
  });

  const [addWarehouseAddress] = useAddWarehouseAddressMutation();
  const [updateWarehouseAddress] = useUpdateWarehouseAddressMutation();

  const onSubmit = async (data: AddressFormValues) => {
    const id = updateAdd?.id;

    const isUpdate = updateAdd && typeof id === "number";

    try {
      const response = isUpdate
        ? await updateWarehouseAddress({ data, id }).unwrap()
        : await addWarehouseAddress(data).unwrap();

      console.log("Warehouse Address Response:", response);

      toast.success(
        response.message ||
          (isUpdate
            ? "Address updated successfully!"
            : "Address added successfully!")
      );
      refetch();
      setIsOpen(false);
    } catch (err) {
      if (err instanceof Error) {
        toast.error(
          err.message || isUpdate
            ? "Failed to update address. Please try again."
            : "Failed to add address. Please try again."
        );
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 px-5">
      <div className="space-y-1">
        <label className="inline-block font-semibold text-sm">
          Warehouse Name
        </label>
        <Input
          type="text"
          {...register("warehouseName", {
            required: "Recipient name is required",
          })}
          placeholder="Enter full name"
          className="w-full py-2 px-3 border border-gray-300 text-sm rounded-md font-medium"
        />
        <ErrorMessage error={errors.warehouseName} />
      </div>

      <div className="space-y-1">
        <label className="inline-block font-semibold text-sm">
          Contact Number
        </label>
        <Input
          type="text"
          {...register("contactNumber", {
            required: "Phone number is required",
          })}
          placeholder="Enter phone number"
          className="w-full py-2 px-3 border border-gray-300 text-sm rounded-md font-medium"
        />
        <ErrorMessage error={errors.contactNumber} />
      </div>

      <div className="space-y-1">
        <label className="inline-block font-semibold text-sm">
          Address Line
        </label>
        <Input
          type="text"
          {...register("addressLine", {
            required: "Street address is required",
          })}
          placeholder="123 Main Street"
          className="w-full py-2 px-3 border border-gray-300 text-sm rounded-md font-medium"
        />
        <ErrorMessage error={errors.addressLine} />
      </div>

      <div className="space-y-1">
        <label className="inline-block font-semibold text-sm">City</label>
        <Input
          type="text"
          {...register("city", { required: "City is required" })}
          placeholder="Enter state"
          className="w-full py-2 px-3 border border-gray-300 text-sm rounded-md font-medium"
        />
        <ErrorMessage error={errors.city} />
      </div>
      <div className="space-y-1">
        <label className="inline-block font-semibold text-sm">
          Country Name
        </label>
        <Input
          type="text"
          {...register("countryName", { required: "Country is required" })}
          placeholder="Enter state"
          className="w-full py-2 px-3 border border-gray-300 text-sm rounded-md font-medium"
        />
        <ErrorMessage error={errors.countryName} />
      </div>
      <div className="space-y-1">
        <label className="inline-block font-semibold text-sm">District</label>
        <Input
          type="text"
          {...register("district", { required: "State is required" })}
          placeholder="Enter state"
          className="w-full py-2 px-3 border border-gray-300 text-sm rounded-md font-medium"
        />
        <ErrorMessage error={errors.district} />
      </div>
      <div className="space-y-1">
        <label className="inline-block font-semibold text-sm">State</label>
        <Input
          type="text"
          {...register("state", { required: "State is required" })}
          placeholder="Enter state"
          className="w-full py-2 px-3 border border-gray-300 text-sm rounded-md font-medium"
        />
        <ErrorMessage error={errors.state} />
      </div>

      <div className="space-y-1">
        <label className="inline-block font-semibold text-sm">Pin Code</label>
        <Input
          type="text"
          {...register("pinCode", { required: "Postal code is required" })}
          placeholder="400001"
          className="w-full py-2 px-3 border border-gray-300 text-sm rounded-md font-medium"
        />
        <ErrorMessage error={errors.pinCode} />
      </div>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          {...register("isPrimary")}
          id="isDefault"
          className="h-4 w-4"
        />
        <label htmlFor="isDefault" className="text-sm font-medium">
          Is Primary
        </label>
      </div>

      <div className="flex justify-end pt-2">
        <Button type="submit" disabled={isSubmitting} variant="authBtn">
          {isSubmitting ? (
            <>
              <Spinner /> Saving...
            </>
          ) : updateAdd ? (
            "Update Address"
          ) : (
            "Add Address"
          )}
        </Button>
      </div>
    </form>
  );
};

export default WarehouseAddForm;
