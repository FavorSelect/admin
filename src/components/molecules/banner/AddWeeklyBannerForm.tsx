"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import InputGroup from "../global/InputGroup";
import FileUploader from "../global/FileUploader";
import { Button } from "@/components/atoms/Button";
import Spinner from "../global/Spinner";
import { Plus } from "lucide-react";
import { toast } from "react-hot-toast";
import { useAddWeeklyBannerMutation } from "@/store/api/bannerApi";

export type AddWeeklyBannerFormValue = {
  title: string;
  image: File[];
};

export const AddWeeklyBannerForm = () => {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AddWeeklyBannerFormValue>({
    defaultValues: {
      title: "",
      image: [],
    },
  });

  const [addWeeklyBanner] = useAddWeeklyBannerMutation();

  const onSubmit = async (data: AddWeeklyBannerFormValue) => {
    const formData = new FormData();
    formData.append("title", data.title);
    if (data.image.length > 0) {
      formData.append("image", data.image[0]);
    }

    try {
      const res = await addWeeklyBanner({ data: formData }).unwrap();
      console.log("✅ Weekly banner added:", res);
      toast.success(res?.message || "✅ Weekly banner added successfully!");
      reset();
    } catch (error: unknown) {
      console.error("❌ Submit failed:", error);
      if (typeof error === "object" && error !== null && "data" in error) {
        const apiError = error as { data: { message?: string } };
        toast.error(apiError.data.message || "Something went wrong.");
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 max-w-2xl px-4"
    >
      <InputGroup<AddWeeklyBannerFormValue>
        label="Banner Title"
        name="title"
        register={register}
        errors={errors}
        required
        placeholder="Enter weekly banner title"
      />

      <Controller
        control={control}
        name="image"
        rules={{ required: "Please upload a weekly banner image" }}
        render={({ field }) => (
          <div>
            <label className="font-semibold text-sm">
              Upload Weekly Banner Image
            </label>
            <FileUploader
              onFilesSelected={field.onChange}
              value={field.value}
              multiple={true}
              maxSizeMB={3}
              acceptedTypes={["image/jpeg", "image/png"]}
              placeholder="Upload image"
            />
            {errors.image && (
              <p className="text-sm text-red-500 mt-2">
                {errors.image.message}
              </p>
            )}
          </div>
        )}
      />

      <Button type="submit" disabled={isSubmitting} variant="authBtn">
        {isSubmitting ? (
          <>
            <Spinner /> Adding
          </>
        ) : (
          <>
            <Plus /> Add Weekly Banner
          </>
        )}
      </Button>
    </form>
  );
};
