"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import FileUploader from "./FileUploader";

type FormData = {
  name: string;
  files: File[];
};

export default function MyFormPage() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      files: [],
    },
  });

  const onSubmit = (data: FormData) => {
    if (!data.files || data.files.length === 0) {
      alert("Please upload at least one image.");
      return;
    }

    console.log("✅ Submitted data:", data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5 max-w-lg mx-auto p-4"
    >
      {/* Name Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          {...register("name", { required: "Name is required" })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
        {errors.name && (
          <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
        )}
      </div>

      {/* File Uploader */}
      <Controller
        control={control}
        name="files"
        render={({ field, fieldState }) => (
          <div>
            <FileUploader
              files={field.value || []}
              onFilesChange={field.onChange}
              maxFiles={3}
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

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
      >
        Submit
      </button>
    </form>
  );
}
