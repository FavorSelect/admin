"use client";
import React from "react";
import { useFetchProductsQuery } from "@/store/api/productApi";
import { productColumns } from "@/column";
import Table from "@/components/molecules/global/table/Table";

const ProductListWrapper = () => {
  const { data: products } = useFetchProductsQuery();
  return (
    <div>
      <Table columns={productColumns} data={products || []} />
    </div>
  );
};

export default ProductListWrapper;
