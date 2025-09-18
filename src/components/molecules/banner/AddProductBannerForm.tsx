"use client";

import { Controller, useForm } from "react-hook-form";
import InputGroup from "../global/InputGroup";
import FileUploader from "../global/FileUploader";
import { Button } from "@/components/atoms/Button";
import Spinner from "../global/Spinner";
import { Plus } from "lucide-react";
import { toast } from "react-hot-toast";
import { useAddProductPosterMutation } from "@/store/api/bannerApi";

export type AddProductBannerFormValue = {
  title: string;
  image: File[];
};

export const AddProductBannerForm = () => {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AddProductBannerFormValue>({
    defaultValues: {
      title: "",
      image: [],
    },
  });

  const [addProductPoster] = useAddProductPosterMutation();

  const onSubmit = async (data: AddProductBannerFormValue) => {
    const formData = new FormData();
    formData.append("title", data.title);
    if (data.image.length > 0) {
      formData.append("image", data.image[0]);
    }

    try {
      const res = await addProductPoster({ data: formData }).unwrap();
      console.log("✅ Product banner added:", res);
      toast.success(res?.message || "✅ Product banner added successfully!");
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
      <InputGroup<AddProductBannerFormValue>
        label="Banner Title"
        name="title"
        register={register}
        errors={errors}
        required
        placeholder="Enter product banner title"
      />
      <Controller
        control={control}
        name="image"
        rules={{ required: "Please upload a product banner image" }}
        render={({ field, fieldState }) => (
          <div>
            <label className="font-semibold text-sm">
              Upload Product Banner Image
            </label>
            <FileUploader
              files={field.value || []}
              onFilesChange={field.onChange}
              maxFiles={5}
              multiple={true}
            />
            {fieldState.error && (
              <p className="text-sm text-red-500 mt-2">
                {fieldState.error.message}
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
            <Plus /> Add Product Banner
          </>
        )}
      </Button>
    </form>
  );
};
