import React, { useState } from "react";
import { RowData } from "@/types";
import { Button } from "@/components/atoms/Button";
import DrawerContainer from "../global/DrawerContainer";
import AddCategoryForm from "./AddCategoryForm";

interface EditCategoryProps {
  row: RowData;
  token: string;
  refetch: () => void;
}

const EditCategory = ({ row, token, refetch }: EditCategoryProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const addCategory = () => {
    setIsOpen(true);
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
        <AddCategoryForm
          setIsOpen={setIsOpen}
          token={token}
          refetch={refetch}
          initialData={initialFormData}
          editId={row.id?.toString()}
        />
      </DrawerContainer>
    </>
  );
};

export default EditCategory;
