"use client";

import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Input } from "@/components/atoms/Input";
import { Button } from "@/components/atoms/Button";
import ErrorMessage from "@/components/molecules/global/ErrorMessage";
import { Textarea } from "@/components/atoms/Textarea";
import { SingleSelectField } from "../global/SingleSelectField";

const durations = [
  { value: "1 month", label: "1 Month" },
  { value: "3 months", label: "3 Months" },
  { value: "6 months", label: "6 Months" },
  { value: "1 year", label: "1 Year" },
];

export type MembershipFormValues = {
  membershipName: string;
  price: string;
  duration: string;
  benefits: string;
};

const AddMembershipForm = ({
  setIsOpen,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<MembershipFormValues>({
    defaultValues: {
      membershipName: "",
      price: "",
      duration: "",
      benefits: "",
    },
  });

  const onSubmit = (data: MembershipFormValues) => {
    console.log("Membership Form Submitted:", {
      membershipName: data.membershipName,
      price: data.price,
      duration: data.duration,
      benefits: data.benefits,
    });

    // Close form modal
    setIsOpen(false);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 px-4">
      <h2 className="text-lg font-semibold">Add Membership</h2>

      {/* Membership Name */}
      <div className="space-y-1">
        <label
          className="inline-block font-semibold text-sm"
          htmlFor="membershipName"
        >
          Membership Name
        </label>
        <Input
          id="membershipName"
          placeholder="Enter membership name"
          {...register("membershipName", {
            required: "Membership name is required",
          })}
          className="w-full py-2 px-3 border border-gray-300 text-sm rounded-md font-medium"
        />
        <ErrorMessage error={errors.membershipName} />
      </div>

      {/* Price */}
      <div className="space-y-1">
        <label className="inline-block font-semibold text-sm" htmlFor="price">
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
        <label className="inline-block font-semibold text-sm">Duration</label>
        <Controller
          name="duration"
          control={control}
          rules={{ required: "Duration is required" }}
          render={({ field, fieldState, formState }) => (
            <>
              <SingleSelectField
                field={field}
                fieldState={fieldState}
                formState={formState}
                options={durations}
                placeholder="Select city"
              />
              <ErrorMessage error={fieldState.error} />
            </>
          )}
        />
      </div>

      {/* Benefits */}
      <div className="space-y-1">
        <label
          className="inline-block font-semibold text-sm"
          htmlFor="benefits"
        >
          Benefits
        </label>
        <Textarea
          id="benefits"
          {...register("benefits", { required: "Benefits are required" })}
          placeholder="Enter benefits"
          className="w-full py-2 px-3 border border-gray-300 text-sm rounded-md font-medium mt-1"
          rows={4}
        />
        <ErrorMessage error={errors.benefits} />
      </div>

      {/* Submit Buttons */}
      <div className="pt-2 space-x-2 flex">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-scarlet-red text-white py-2 rounded-md hover:bg-red-600 transition duration-200 font-semibold text-sm md:text-base"
        >
          {isSubmitting ? "Creating..." : "Add Membership"}
        </Button>
      </div>
    </form>
  );
};

export default AddMembershipForm;
