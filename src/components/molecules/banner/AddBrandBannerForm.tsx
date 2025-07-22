"use client";

import { Controller, useForm } from "react-hook-form";
import InputGroup from "../global/InputGroup";
import FileUploader from "../global/FileUploader";
import { Button } from "@/components/atoms/Button";
import Spinner from "../global/Spinner";
import { Plus } from "lucide-react";
import { toast } from "react-hot-toast";
import { useAddBrandPosterMutation } from "@/store/api/bannerApi";

export type AddBrandBannerFormValue = {
  title: string;
  image: File[];
};

export const AddBrandBannerForm = () => {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AddBrandBannerFormValue>({
    defaultValues: {
      title: "",
      image: [],
    },
  });

  const [addBrandPoster] = useAddBrandPosterMutation();

  const onSubmit = async (data: AddBrandBannerFormValue) => {
    const formData = new FormData();
    formData.append("title", data.title);
    if (data.image.length > 0) {
      formData.append("image", data.image[0]);
    }

    try {
      const res = await addBrandPoster({ data: formData }).unwrap();
      console.log("✅ Brand banner added:", res);
      toast.success(res?.message || "✅ Brand banner added successfully!");
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
      <InputGroup<AddBrandBannerFormValue>
        label="Banner Title"
        name="title"
        register={register}
        errors={errors}
        required
        placeholder="Enter brand banner title"
      />
      <Controller
        control={control}
        name="image"
        rules={{ required: "Please upload a brand banner image" }}
        render={({ field }) => (
          <div>
            <label className="font-semibold text-sm">
              Upload Brand Banner Image
            </label>
            <FileUploader
              onFilesSelected={field.onChange}
              value={field.value}
              multiple={false}
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
            <Plus /> Add Brand Banner
          </>
        )}
      </Button>
    </form>
  );
};
