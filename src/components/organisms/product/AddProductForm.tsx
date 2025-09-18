/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/atoms/Button";
import { SingleSelectField } from "@/components/molecules/global/SingleSelectField";
import ErrorMessage from "@/components/molecules/global/ErrorMessage";
import Spinner from "@/components/molecules/global/Spinner";
import { Category, SubCategories } from "@/types/category";
import InputGroup from "../../molecules/global/InputGroup";
import TextAreaGroup from "./TeatAreaGroup";
import FileUploader from "@/components/molecules/global/FileUploader";
import {
  useAddProductMutation,
  useFetchProductByIdQuery,
  useUpdateProductMutation, // ⬅️ NEW
} from "@/store/api/productApi";
import { toast } from "react-hot-toast";
import { Plus } from "lucide-react";

export type ProductFormValues = {
  productCategoryId?: string;
  productSubcategoryId?: string;
  productName: string;
  productDescription: string;
  productBrand: string;
  stockKeepingUnit?: string;
  productModelNumber?: string;
  productBestSaleTag?: string;

  productDiscountPercentage?: number;
  productPrice: number | null;
  productDiscountPrice?: number;
  saleDayleft?: number;

  availableStockQuantity: number | null;
  productWeight?: number;

  coverImageUrl: File[];
  galleryImageUrls?: File[];
  productVideoUrl?: string;

  productSizes?: string;
  productColors?: string;
  productDimensions?: string;
  productMaterial?: string;

  productWarrantyInfo?: string;
  productReturnPolicy?: string;
};

type AddProductFormProps = {
  categories: Category[];
  token?: string;
  editId?: string;
};

const AddProductForm: React.FC<AddProductFormProps> = ({
  categories,
  token,
  editId,
}) => {
  const [addProduct] = useAddProductMutation();
  const [updateProduct] = useUpdateProductMutation(); // ⬅️ NEW
  const { data, isLoading } = useFetchProductByIdQuery(editId!, {
    skip: !editId,
  });
  const [existingCoverUrl, setExistingCoverUrl] = useState<string | null>(null);

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<ProductFormValues>({
    defaultValues: {
      productCategoryId: "",
      productSubcategoryId: "",
      productName: "",
      productDescription: "",
      productBrand: "",
      productPrice: null,
      coverImageUrl: [],
      availableStockQuantity: null,
    },
  });

  useEffect(() => {
    if (!editId || !data) return;

    setExistingCoverUrl(data.coverImageUrl ?? null);

    const parentCategoryId = data.productCategoryId
      ? String(data.productCategoryId)
      : "";

    reset({
      productCategoryId: parentCategoryId,
      productSubcategoryId: "",

      productName: data.productName ?? "",
      productDescription: data.productDescription ?? "",
      productBrand: data.productBrand ?? "",
      productPrice: data.productPrice ?? null,
      availableStockQuantity: data.availableStockQuantity ?? null,

      stockKeepingUnit: data.stockKeepingUnit ?? "",
      productModelNumber: data.productModelNumber ?? "",
      productBestSaleTag: data.productBestSaleTag ?? "",
      productDiscountPercentage: data.productDiscountPercentage ?? undefined,
      productDiscountPrice: data.productDiscountPrice ?? undefined,
      saleDayleft: data.saleDayleft ?? undefined,
      productWeight: data.productWeight ?? undefined,
      productVideoUrl: data.productVideoUrl ?? "",
      productSizes: data.productSizes ?? "",
      productColors: data.productColors ?? "",
      productDimensions: data.productDimensions ?? "",
      productMaterial: data.productMaterial ?? "",
      productWarrantyInfo: data.productWarrantyInfo ?? "",
      productReturnPolicy: data.productReturnPolicy ?? "",

      coverImageUrl: [],
      galleryImageUrls: [],
    });
  }, [editId, data, reset]);

  // Watch for main category selection
  const selectedCategoryId = watch("productCategoryId");

  // Find selected category object
  const selectedCategory = categories.find(
    (cat: Category) => String(cat.id) === selectedCategoryId
  );

  // Map main categories for select
  const mainCategoryOptions = categories.map((cat: Category) => ({
    value: String(cat.id),
    label: cat.categoryName,
  }));

  // Map subcategories from selected main category
  const subCategoryOptions =
    selectedCategory?.subcategories?.map((sub: SubCategories) => ({
      value: String(sub.id),
      label: sub.categoryName,
    })) || [];

  const onSubmit = async (data: ProductFormValues) => {
    const formData = new FormData();
    let categoryIdToSend;

    if (data.productSubcategoryId) {
      const subcategory = selectedCategory?.subcategories.find(
        (sub: SubCategories) => String(sub.id) === data.productSubcategoryId
      );
      categoryIdToSend = String(
        subcategory?.parentCategoryId || data.productCategoryId
      );
    } else {
      categoryIdToSend = String(data.productCategoryId);
    }

    // Required fields
    formData.append("productCategoryId", categoryIdToSend);
    formData.append("productName", data.productName);
    formData.append("productDescription", data.productDescription);
    formData.append("productBrand", data.productBrand);
    formData.append("productPrice", String(data.productPrice ?? ""));
    formData.append(
      "availableStockQuantity",
      String(data.availableStockQuantity ?? "")
    );

    // Optional fields
    const optionalFields = [
      "stockKeepingUnit",
      "productModelNumber",
      "productBestSaleTag",
      "productDiscountPercentage",
      "productDiscountPrice",
      "saleDayleft",
      "productWeight",
      "productVideoUrl",
      "productSizes",
      "productColors",
      "productDimensions",
      "productMaterial",
      "productWarrantyInfo",
      "productReturnPolicy",
    ];

    optionalFields.forEach((field) => {
      const value = data[field as keyof ProductFormValues];
      if (value !== undefined && value !== null && value !== "") {
        formData.append(field, String(value));
      }
    });

    // Cover Image (single)
    if (data.coverImageUrl?.[0]) {
      formData.append("coverImageUrl", data.coverImageUrl[0]);
    }
    // Gallery Images (multiple) send only during update flow
    if (editId && data.galleryImageUrls && data.galleryImageUrls.length > 0) {
      Array.from(data.galleryImageUrls).forEach((file) => {
        formData.append("galleryImageUrls", file);
      });
    }

    try {
      if (editId) {
        console.log(editId);
        const res = await updateProduct({
          id: editId,
          data: formData,
        }).unwrap();
        console.log("✅ Product updated:", res);
        toast.success(res?.message || "✅ Product updated successfully!");
      } else {
        const res = await addProduct({ data: formData }).unwrap();
        console.log("✅ Product added:", res);
        toast.success(res?.message || "✅ Product added successfully!");
      }
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
      className="space-y-4 max-w-4xl px-4"
    >
      <h2 className="text-lg font-semibold">
        {!editId ? "Add Product" : "Update Product"}
      </h2>
      <InputGroup<ProductFormValues>
        label="Product Name"
        name="productName"
        register={register}
        errors={errors}
        required
        placeholder="Enter product name"
      />
      <TextAreaGroup
        label="Product Description"
        name="productDescription"
        register={register}
        errors={errors}
        required
        placeholder="Enter product desciption"
      />
      <InputGroup<ProductFormValues>
        label="Product Brand"
        name="productBrand"
        register={register}
        errors={errors}
        required
        placeholder="Enter product brand"
      />
      <InputGroup<ProductFormValues>
        label="Product Price"
        name="productPrice"
        register={register}
        errors={errors}
        type="number"
        required
        placeholder="Enter product price"
        step="0.01"
        min="0"
      />
      {/* MAIN CATEGORY */}
      <div>
        <label className="font-semibold text-sm">Main Category</label>
        <Controller
          name="productCategoryId"
          control={control}
          rules={{ required: "Please select a category" }}
          render={({ field, fieldState, formState }) => (
            <>
              <SingleSelectField
                field={field}
                options={mainCategoryOptions}
                placeholder="Select category"
                formState={formState}
                fieldState={fieldState}
              />
              <ErrorMessage error={fieldState.error} />
            </>
          )}
        />
      </div>

      {/* SUBCATEGORY: only show when category is selected */}
      {subCategoryOptions.length > 0 && (
        <div>
          <label className="font-semibold text-sm">Sub Category</label>
          <Controller
            name="productSubcategoryId"
            control={control}
            rules={{ required: "Please select a subcategory" }}
            render={({ field, fieldState, formState }) => (
              <>
                <SingleSelectField
                  field={field}
                  options={subCategoryOptions}
                  placeholder="Select subcategory"
                  formState={formState}
                  fieldState={fieldState}
                />
                <ErrorMessage error={fieldState.error} />
              </>
            )}
          />
        </div>
      )}

      {/* cover image Uploader */}
      <Controller
        control={control}
        name="coverImageUrl"
        rules={{
          validate: (files) => {
            const hasExisting = !!existingCoverUrl;
            const hasNew = (files?.length ?? 0) > 0;
            return hasExisting || hasNew || "Please upload cover image";
          },
        }}
        render={({ field, fieldState }) => (
          <div className="space-y-2">
            <label className="font-semibold text-sm">Cover Image</label>

            <FileUploader
              files={field.value || []}
              onFilesChange={field.onChange}
              maxFiles={1}
            />

            {/*  SHOW EXISTING COVER ONLY WHEN NO NEW FILE SELECTED */}
            {existingCoverUrl && (!field.value || field.value.length === 0) && (
              <div className="mt-2 flex items-center gap-3 rounded-md border border-slate-200 p-3">
                <img
                  src={existingCoverUrl}
                  alt="Current cover"
                  className="h-16 w-16 rounded object-cover"
                />
                <div className="text-sm">
                  <div className="font-medium">Current cover</div>
                  <div className="text-muted-foreground">
                    This image will be kept unless you upload a new one.
                  </div>
                </div>
              </div>
            )}

            <ErrorMessage error={fieldState.error} />
          </div>
        )}
      />

      <InputGroup<ProductFormValues>
        label="Stock Quantity"
        name="availableStockQuantity"
        register={register}
        errors={errors}
        type="number"
        required
        placeholder="Enter avilable stock quantity"
      />
      <InputGroup<ProductFormValues>
        label="SKU"
        name="stockKeepingUnit"
        register={register}
        errors={errors}
        placeholder="Enter SKU"
      />
      <InputGroup<ProductFormValues>
        label="Model Number"
        name="productModelNumber"
        register={register}
        errors={errors}
        placeholder="Enter product model number"
      />
      <InputGroup<ProductFormValues>
        label="Best Sale Tag"
        name="productBestSaleTag"
        register={register}
        errors={errors}
        placeholder="Enter best sale tag"
      />
      <InputGroup<ProductFormValues>
        label="Discount (%)"
        name="productDiscountPercentage"
        register={register}
        errors={errors}
        type="number"
        placeholder="Enter discount percentage"
      />
      <InputGroup<ProductFormValues>
        label="Discount Price"
        name="productDiscountPrice"
        register={register}
        errors={errors}
        type="number"
        placeholder="Enter discounted price"
        step="0.01"
        min="0"
      />
      <InputGroup<ProductFormValues>
        label="Sale Days Left"
        name="saleDayleft"
        register={register}
        errors={errors}
        type="number"
        placeholder="Enter days left for sale"
      />
      <InputGroup<ProductFormValues>
        label="Weight"
        name="productWeight"
        register={register}
        errors={errors}
        type="text"
        placeholder="Enter product weight (in kg)"
      />
      {editId && (
        <Controller
          control={control}
          name="galleryImageUrls"
          render={({ field }) => (
            <div className="space-y-2">
              <label className="font-semibold text-sm">Gallery Images</label>
              <FileUploader
                files={field.value || []}
                onFilesChange={field.onChange}
                maxFiles={6}
                multiple={true}
              />
            </div>
          )}
        />
      )}
      <InputGroup<ProductFormValues>
        label="Product Video URL"
        name="productVideoUrl"
        register={register}
        placeholder="Enter product video URL"
      />
      <InputGroup<ProductFormValues>
        label="Sizes"
        name="productSizes"
        register={register}
        placeholder="Enter available sizes (e.g. S, M, L)"
      />
      <InputGroup<ProductFormValues>
        label="Colors"
        name="productColors"
        register={register}
        placeholder="Enter available colors"
      />
      <InputGroup<ProductFormValues>
        label="Dimensions"
        name="productDimensions"
        register={register}
        placeholder="Enter dimensions (e.g. 10x20x5 cm)"
      />
      <InputGroup<ProductFormValues>
        label="Material"
        name="productMaterial"
        register={register}
        placeholder="Enter product material"
      />
      <TextAreaGroup
        label="Warranty Info"
        name="productWarrantyInfo"
        register={register}
        placeholder="Enter product warranty information"
      />
      <TextAreaGroup
        label="Return Policy"
        name="productReturnPolicy"
        register={register}
        placeholder="Enter return policy details"
      />

      {/* SUBMIT BUTTON */}
      <div className="flex justify-end pt-2 pb-3">
        <Button
          type="submit"
          disabled={isSubmitting || (editId ? isLoading : false)}
          variant="authBtn"
        >
          {isSubmitting ? (
            <>
              <Spinner /> {editId ? "Updating" : "Adding"}
            </>
          ) : (
            <>
              <Plus /> {editId ? "Update Product" : "Add Product"}
            </>
          )}
        </Button>
      </div>
    </form>
  );
};

export default AddProductForm;
