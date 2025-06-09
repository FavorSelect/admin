"use client";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Input } from "@/components/atoms/Input";
import { Button } from "@/components/atoms/Button";
import ErrorMessage from "@/components/molecules/global/ErrorMessage";
import { Textarea } from "@/components/atoms/Textarea";
import { SingleSelectField } from "../global/SingleSelectField";
import {
  useCreateMembershipMutation,
  useUpdateMembershipMutation,
} from "@/store/api/membershipApi";
import { toast } from "react-hot-toast";
import Spinner from "@/components/molecules/global/Spinner";

const planOptions = [
  { value: "Basic", label: "Basic" },
  { value: "Standard", label: "Standard" },
  { value: "Premium", label: "Premium" },
];

const durations = [
  { value: "30", label: "1 Month" },
  { value: "90", label: "3 Months" },
  { value: "180", label: "6 Months" },
  { value: "365", label: "1 Year" },
  { value: "730", label: "2 Years" },
];

export type MembershipFormValues = {
  planName: string;
  durationInDays: string;
  price: number;
  description: string;
};

interface Props {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  token: string;
  refetch: () => void;
  initialData?: MembershipFormValues;
  editId?: string;
}

const AddMembershipForm = ({
  setIsOpen,
  token,
  refetch,
  initialData,
  editId,
}: Props) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<MembershipFormValues>({
    defaultValues: initialData || {
      planName: "",
      durationInDays: "",
      price: 0,
      description: "",
    },
  });

  const [createMembership] = useCreateMembershipMutation();
  const [updateMembership] = useUpdateMembershipMutation();

  const isEdit = !!editId;

  const onSubmit = async (data: MembershipFormValues) => {
    try {
      if (isEdit) {
        const response = await updateMembership({
          token,
          id: editId!,
          data,
        }).unwrap();
        toast.success(response.message || "Membership updated successfully");
        console.log(response);
        console.log(response);
      } else {
        const response = await createMembership({
          token,
          data,
        }).unwrap();
        toast.success(response.message || "Membership created successfully");
      }
      refetch();
      setIsOpen(false);
      reset();
    } catch (error: unknown) {
      console.error("Submit failed:", error);
      if (typeof error === "object" && error !== null && "data" in error) {
        const apiError = error as { data: { message?: string } };
        toast.error(apiError.data.message || "Something went wrong.");
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 px-4">
      <h2 className="text-lg font-semibold">
        {isEdit ? "Edit Membership" : "Add Membership"}
      </h2>

      {/* Plan Name */}
      <div className="space-y-1">
        <label className="inline-block font-semibold text-sm">Plan Name</label>
        <Controller
          name="planName"
          control={control}
          rules={{ required: "Plan name is required" }}
          render={({ field, fieldState, formState }) => (
            <>
              <SingleSelectField
                field={field}
                fieldState={fieldState}
                formState={formState}
                options={planOptions}
                placeholder="Select a plan"
              />
              <ErrorMessage error={fieldState.error} />
            </>
          )}
        />
      </div>

      {/* Price */}
      <div className="space-y-1">
        <label htmlFor="price" className="inline-block font-semibold text-sm">
          Price
        </label>
        <Input
          id="price"
          type="number"
          placeholder="Enter price"
          {...register("price", { required: "Price is required" })}
          className="w-full py-2 px-3 border border-gray-300 text-sm rounded-md font-medium"
        />
        <ErrorMessage error={errors.price} />
      </div>

      {/* Duration */}
      <div className="space-y-1">
        <label className="inline-block font-semibold text-sm">
          Duration (Days)
        </label>
        <Controller
          name="durationInDays"
          control={control}
          rules={{ required: "Duration is required" }}
          render={({ field, fieldState, formState }) => (
            <>
              <SingleSelectField
                field={field}
                fieldState={fieldState}
                formState={formState}
                options={durations}
                placeholder="Select duration"
              />
              <ErrorMessage error={fieldState.error} />
            </>
          )}
        />
      </div>

      {/* Description */}
      <div className="space-y-1">
        <label
          htmlFor="description"
          className="inline-block font-semibold text-sm"
        >
          Description
        </label>
        <Textarea
          id="description"
          {...register("description", { required: "Description is required" })}
          placeholder="Enter plan benefits or description"
          className="w-full py-2 px-3 border border-gray-300 text-sm rounded-md font-medium mt-1"
          rows={4}
        />
        <ErrorMessage error={errors.description} />
      </div>

      <div className="pt-2 space-x-2 flex">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-scarlet-red text-white py-2 rounded-md hover:bg-red-600 transition duration-200 font-semibold text-sm md:text-base inline-flex justify-center items-center"
        >
          {isSubmitting && <Spinner />}
          {isSubmitting
            ? isEdit
              ? "Updating..."
              : "Creating..."
            : isEdit
            ? "Update Membership"
            : "Add Membership"}
        </Button>
      </div>
    </form>
  );
};

export default AddMembershipForm;
