"use client";

import { Button } from "@/components/atoms/Button";
import InputGroup from "@/components/molecules/global/InputGroup";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import FileUploader from "../global/FileUploader";
import Spinner from "../global/Spinner";
import { Plus } from "lucide-react";
import { useAddHomepageBannerMutation } from "@/store/api/bannerApi";
import { toast } from "react-hot-toast";

export type AddHomePageBannerFormValue = {
  title: string;
  image: File[];
};

export const AddHomePageBannerForm = ({ token }: { token: string }) => {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AddHomePageBannerFormValue>({
    defaultValues: {
      title: "",
      image: [],
    },
  });

  const [addHomepageBanner] = useAddHomepageBannerMutation();

  const onSubmit = async (data: AddHomePageBannerFormValue) => {
    const formData = new FormData();
    formData.append("title", data.title);
    if (data.image.length > 0) {
      formData.append("image", data.image[0]);
    }

    try {
      const res = await addHomepageBanner({ token, data: formData }).unwrap();
      console.log("✅ Homepage banner added:", res);
      toast.success(res?.message || "✅ Homepage banner added successfully!");
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
      <InputGroup<AddHomePageBannerFormValue>
        label="Banner Title"
        name="title"
        register={register}
        errors={errors}
        required
        placeholder="Enter banner title"
      />

      <Controller
        control={control}
        name="image"
        rules={{ required: "Please upload a banner image" }}
        render={({ field }) => (
          <div>
            <label className="font-semibold text-sm">
              Upload homepage banner image
            </label>
            <FileUploader
              onFilesSelected={field.onChange}
              value={field.value}
              multiple={false}
              maxSizeMB={3}
              acceptedTypes={["image/jpeg", "image/png"]}
              placeholder="Upload banner image"
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
            <Plus /> Add Banner
          </>
        )}
      </Button>
    </form>
  );
};
