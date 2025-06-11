"use client";
import { Button } from "@/components/atoms/Button";
import AddSubCategoryForm from "@/components/molecules/categories/AddSubCategoryForm";
import DrawerContainer from "@/components/molecules/global/DrawerContainer";
import Table from "@/components/molecules/global/table/Table";
import { subCategoryTableColumn } from "@/data/subCategoryTableColumn";
import { useGetAllCategoriesQuery } from "@/store/api/categoryApi";
import { Plus } from "lucide-react";
import React, { useState } from "react";

const SubCategoryWrapper = ({ token }: { token: string }) => {
  const { data, refetch } = useGetAllCategoriesQuery({
    token,
  });

  const [isOpen, setIsOpen] = useState(false);

  const subCategories = data?.categories.flatMap(
    (category) => category.subcategories
  );
  const categories = (data?.categories || []).map(({ id, categoryName }) => ({
    id: id.toString(),
    categoryName,
  }));

  const addCategory = () => {
    setIsOpen(true);
  };

  return (
    <div className="space-y-5">
      <Table
        data={subCategories || []}
        columns={subCategoryTableColumn}
        token={token}
        refetch={refetch}
        categories={categories}
      />
      <div className="flex justify-end items-center">
        <Button
          onClick={addCategory}
          variant="action"
          className="text-sm bg-scarlet-red hover:bg-red-500 text-white"
        >
          <Plus size={18} /> Add Sub Category
        </Button>
      </div>
      <DrawerContainer
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        dismissible={false}
      >
        <AddSubCategoryForm
          refetch={refetch}
          token={token}
          setIsOpen={setIsOpen}
          categories={categories}
        />
      </DrawerContainer>
    </div>
  );
};

export default SubCategoryWrapper;
