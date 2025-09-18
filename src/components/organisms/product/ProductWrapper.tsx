"use client";
import { useGetAllCategoriesQuery } from "@/store/api/categoryApi";
import AddProductForm from "./AddProductForm";

const ProductWrapper = () => {
  const { data } = useGetAllCategoriesQuery();

  const categories = data?.categories || [];

  return (
    <div className="space-y-5">
      <AddProductForm categories={categories} />
    </div>
  );
};

export default ProductWrapper;
