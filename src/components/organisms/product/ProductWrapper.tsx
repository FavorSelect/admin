"use client";
import { useGetAllCategoriesQuery } from "@/store/api/categoryApi";
import AddProductForm from "./AddProductForm";

const ProductWrapper = ({ token }: { token: string }) => {
  const { data } = useGetAllCategoriesQuery({ token });
  const categories = data?.categories || [];

  return (
    <div className="space-y-5">
      <AddProductForm categories={categories} token={token} />
    </div>
  );
};

export default ProductWrapper;
