"use client";
import { Button } from "@/components/atoms/Button";
import AddCategoryForm from "@/components/molecules/categories/AddCategoryForm";
import DrawerContainer from "@/components/molecules/global/DrawerContainer";
import Table from "@/components/molecules/global/table/Table";
import { categoryColumns } from "@/column";
import { useGetAllCategoriesQuery } from "@/store/api/categoryApi";
import { Plus } from "lucide-react";
import React, { useState } from "react";

const CategoriesWrapper = ({ token }: { token: string }) => {
  const { data, isLoading, isError, refetch } = useGetAllCategoriesQuery({
    token,
  });

  const [isOpen, setIsOpen] = useState(false);

  const addCategory = () => {
    setIsOpen(true);
  };

  if (isLoading) {
    return <p className="text-gray-500 italic">Loading category...</p>;
  }

  if (isError) {
    return <h2>there is some problem to get categories</h2>;
  }

  return (
    <div className="space-y-5">
      <Table
        data={data?.categories || []}
        columns={categoryColumns}
        token={token}
        refetch={refetch}
      />
      <div className="flex justify-end items-center">
        <Button
          onClick={addCategory}
          variant="action"
          className="text-sm bg-scarlet-red hover:bg-red-500 text-white"
        >
          <Plus size={18} /> Add Category
        </Button>
      </div>
      <DrawerContainer
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        dismissible={false}
      >
        <AddCategoryForm
          setIsOpen={setIsOpen}
          token={token}
          refetch={refetch}
        />
      </DrawerContainer>
    </div>
  );
};

export default CategoriesWrapper;
