"use client";

import { Controller, useForm } from "react-hook-form";
import InputGroup from "../global/InputGroup";
import FileUploader from "../global/FileUploader";
import { Button } from "@/components/atoms/Button";
import Spinner from "../global/Spinner";
import { Plus } from "lucide-react";
import { toast } from "react-hot-toast";
import { useAddPopularBannerMutation } from "@/store/api/bannerApi";

export type AddPopularBannerFormValue = {
  title: string;
  image: File[];
};

export const AddPopularBannerForm = () => {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AddPopularBannerFormValue>({
    defaultValues: {
      title: "",
      image: [],
    },
  });

  const [addPopularBanner] = useAddPopularBannerMutation();

  const onSubmit = async (data: AddPopularBannerFormValue) => {
    const formData = new FormData();
    formData.append("title", data.title);
    if (data.image.length > 0) {
      formData.append("image", data.image[0]);
    }

    try {
      const res = await addPopularBanner({ data: formData }).unwrap();
      console.log("✅ Popular banner added:", res);
      toast.success(res?.message || "✅ Popular banner added successfully!");
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
      <InputGroup<AddPopularBannerFormValue>
        label="Banner Title"
        name="title"
        register={register}
        errors={errors}
        required
        placeholder="Enter popular banner title"
      />
      <Controller
        control={control}
        name="image"
        rules={{ required: "Please upload a popular banner image" }}
        render={({ field }) => (
          <div>
            <label className="font-semibold text-sm">
              Upload Popular Banner Image
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
            <Plus /> Add Popular Banner
          </>
        )}
      </Button>
    </form>
  );
};
