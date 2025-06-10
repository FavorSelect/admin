"use client";
import { Button } from "@/components/atoms/Button";
import Title from "@/components/atoms/Title";
import AddSubCategoryForm from "@/components/molecules/categories/AddSubCategoryForm";
import DrawerContainer from "@/components/molecules/global/DrawerContainer";
import Table from "@/components/molecules/global/table/Table";
import { categoryColumns } from "@/data";
import { useGetAllCategoriesQuery } from "@/store/api/categoryApi";
import { Plus } from "lucide-react";
import React, { useState } from "react";

const SubCategoryWrapper = ({ token }: { token: string }) => {
  const { data, refetch } = useGetAllCategoriesQuery({
    token,
  });

  const subCategories = data?.categories.flatMap(
    (category) => category.subcategories
  );

  const [isOpen, setIsOpen] = useState(false);

  const addCategory = () => {
    setIsOpen(true);
  };

  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center">
        <Title text="Categories" />
        <Button
          onClick={addCategory}
          variant="action"
          className="text-sm bg-scarlet-red hover:bg-red-500 text-white"
        >
          <Plus size={18} /> Add Sub Category
        </Button>
      </div>
      <Table
        data={subCategories || []}
        columns={categoryColumns}
        token={token}
        refetch={refetch}
      />
      <DrawerContainer
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        dismissible={false}
      >
        <AddSubCategoryForm
          refetch={refetch}
          token={token}
          setIsOpen={setIsOpen}
          categories={data?.categories || []}
        />
      </DrawerContainer>
    </div>
  );
};

export default SubCategoryWrapper;
