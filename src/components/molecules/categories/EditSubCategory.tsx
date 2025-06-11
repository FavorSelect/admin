import React, { useState } from "react";
import { RowData } from "@/types";
import { Button } from "@/components/atoms/Button";
import DrawerContainer from "../global/DrawerContainer";
import AddSubCategoryForm from "./AddSubCategoryForm";

interface EditCategoryProps {
  row: RowData;
  token: string;
  refetch: () => void;
  categories: { id: string; categoryName: string }[];
}

const EditSubCategory = ({
  row,
  token,
  refetch,
  categories,
}: EditCategoryProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const addCategory = () => {
    setIsOpen(true);
    console.log(row);
  };

  const initialFormData = {
    name: row.categoryName || "",
    description: row.categoryDescription || "",
    image: row.categoryImage || undefined,
  };

  return (
    <>
      <Button
        className="text-sm font-medium text-scarlet-red hover:underline"
        onClick={addCategory}
      >
        Edit
      </Button>
      <DrawerContainer
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        dismissible={false}
      >
        <AddSubCategoryForm
          setIsOpen={setIsOpen}
          token={token}
          refetch={refetch}
          initialData={initialFormData}
          editId={row.id?.toString()}
          categories={categories}
        />
      </DrawerContainer>
    </>
  );
};

export default EditSubCategory;
