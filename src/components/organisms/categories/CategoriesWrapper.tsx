"use client";
import { Button } from "@/components/atoms/Button";
import Title from "@/components/atoms/Title";
import AddCategoryForm from "@/components/molecules/categories/AddCategoryForm";
import CategoryGrid from "@/components/molecules/categories/CategoryGrid";
import DrawerContainer from "@/components/molecules/global/DrawerContainer";
import Table from "@/components/molecules/global/table/Table";
import { Tab, Tabs } from "@/components/molecules/global/Tabs";
import { categoryColumns, categoryData } from "@/data";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { setProductCategoryTab } from "@/store/slices/tabSlice";
import { RootState } from "@/store/store";
import { Plus } from "lucide-react";
import React, { useState } from "react";

const CategoriesWrapper = () => {
  const dispatch = useAppDispatch();
  const activeTab = useAppSelector(
    (state: RootState) => state.tabs.productCategoriesActiveTab
  );
  const [isOpen, setIsOpen] = useState(false);

  const addCategory = () => {
    setIsOpen(true);
  };

  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center">
        <Title text="Product Categories" />
        <Button
          onClick={addCategory}
          variant="action"
          className="text-sm bg-scarlet-red hover:bg-red-500 text-white"
        >
          <Plus size={18} /> Add Category
        </Button>
      </div>
      <Tabs
        activeTab={activeTab}
        onTabChange={(tab) => dispatch(setProductCategoryTab(tab))}
      >
        <Tab label="List">
          <Table data={categoryData} columns={categoryColumns} />
        </Tab>
        <Tab label="Grid">
          <CategoryGrid data={categoryData} />
        </Tab>
      </Tabs>
      <DrawerContainer
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        dismissible={false}
      >
        <AddCategoryForm setIsOpen={setIsOpen} />
      </DrawerContainer>
    </div>
  );
};

export default CategoriesWrapper;
