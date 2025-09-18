import { Edit } from "lucide-react";
import React, { useState } from "react";
import DrawerContainer from "../global/DrawerContainer";
import AddProductForm from "@/components/organisms/product/AddProductForm";
import { useGetAllCategoriesQuery } from "@/store/api/categoryApi";
import { RowData } from "@/types";

interface UpdateProductProps {
  row: RowData;
}

const UpdateProduct = ({ row }: UpdateProductProps) => {
  const { data } = useGetAllCategoriesQuery();

  const categories = data?.categories || [];
  const [isOpen, setIsOpen] = useState(false);

  const addCategory = () => {
    setIsOpen(true);
  };

  return (
    <>
      <button
        type="button"
        className="inline-flex items-center px-3 py-1.5 text-sm cursor-pointer font-medium rounded-md border border-slate-300 text-slate-700
               hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2
               disabled:opacity-50 disabled:cursor-not-allowed transition"
        onClick={addCategory}
      >
        <Edit className="h-4 w-4 mr-2" />
        Edit
      </button>

      <DrawerContainer
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        dismissible={false}
      >
        <AddProductForm categories={categories} editId={row.id?.toString()} />
      </DrawerContainer>
    </>
  );
};

export default UpdateProduct;
