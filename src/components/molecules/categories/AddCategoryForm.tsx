"use client";

import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/atoms/Input";
import { Button } from "@/components/atoms/Button";
import ErrorMessage from "@/components/molecules/global/ErrorMessage";
import { Textarea } from "@/components/atoms/Textarea";
import { X } from "lucide-react";
import Image from "next/image";
import { toast } from "react-hot-toast";
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
} from "@/store/api/categoryApi";
import Spinner from "../global/Spinner";

export type CategoryFormValues = {
  name: string;
  description: string;
  image?: FileList;
};

const AddCategoryForm = ({
  setIsOpen,
  token,
  refetch,
  initialData,
  editId,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  token: string;
  refetch: () => void;
  initialData?: CategoryFormValues;
  editId?: string;
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    typeof initialData?.image === "string" ? initialData.image : null
  );

  // setting edit image for category image
  useEffect(() => {
    if (typeof initialData?.image === "string") {
      setPreviewUrl(initialData.image);
    }
  }, [initialData]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CategoryFormValues>({
    defaultValues: initialData || {
      name: "",
      description: "",
      image: undefined,
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && e.target.files) {
      setValue("image", e.target.files);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setValue("image", undefined);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();

  const isEdit = !!editId;

  const onSubmit = async (data: CategoryFormValues) => {
    const formData = new FormData();
    formData.append("categoryName", data.name);
    formData.append("categoryDescription", data.description);
    formData.append("parentCategoryId", "null");

    if (data.image && data.image.length > 0) {
      formData.append("categoryImage", data.image[0]);
    }
    try {
      let response;

      if (isEdit && editId) {
        response = await updateCategory({
          token,
          id: editId,
          data: formData,
        }).unwrap();
        toast.success(response.message || "Category updated successfully");
      } else {
        response = await createCategory({
          token,
          data: formData,
        }).unwrap();
        toast.success(response.message || "Category created successfully");
      }

      console.log("✅ Response:", response);

      refetch();
      setIsOpen(false);
      reset();
      setPreviewUrl(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
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
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 px-4">
        <h2 className="text-lg font-semibold">Add New Category</h2>

        {/* Category Name */}
        <div className="space-y-1">
          <label
            className="inline-block font-semibold text-sm"
            htmlFor="categoryName"
          >
            Category Name
          </label>
          <Input
            id="categoryName"
            placeholder="Enter category name"
            {...register("name", { required: "Category name is required" })}
            className="w-full py-2 px-3 border border-gray-300 text-sm rounded-md font-medium"
          />
          <ErrorMessage error={errors.name} />
        </div>

        {/* Description */}
        <div className="space-y-1">
          <label
            className="inline-block font-semibold text-sm"
            htmlFor="categoryDescription"
          >
            Description
          </label>
          <Textarea
            id="categoryDescription"
            {...register("description", {
              required: "Description is required",
            })}
            placeholder="Enter description"
            className="w-full py-2 px-3 border border-gray-300 text-sm rounded-md font-medium mt-1"
            rows={4}
          />
          <ErrorMessage error={errors.description} />
        </div>

        {/* Image Upload */}
        <div className="space-y-1">
          <label className="text-sm font-medium">Image</label>
          <Input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full py-2 px-3 border border-gray-300 text-sm rounded-md font-medium"
          />
          <ErrorMessage error={errors.image} />

          {/* Preview */}
          {previewUrl && (
            <div className="relative mt-2 w-full max-w-xs">
              <Image
                src={previewUrl}
                alt="Preview"
                width={150}
                height={100}
                className="w-full h-32 object-cover rounded-md border border-pale-rose"
              />
              <Button
                type="button"
                onClick={removeImage}
                className="absolute top-1 right-1 bg-white text-black border border-gray-300 rounded-full p-1 text-xs hover:bg-red-500 hover:text-white transition"
              >
                <X size={18} />
              </Button>
            </div>
          )}
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
              ? "Update Category"
              : "Add Category"}
          </Button>
        </div>
      </form>
    </>
  );
};

export default AddCategoryForm;
