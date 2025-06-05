"use client";
import Title from "@/components/atoms/Title";
import Table from "@/components/molecules/global/table/Table";
import { Tab, Tabs } from "@/components/molecules/global/Tabs";
import ProductModerationGrid from "@/components/molecules/product-moderation/ProductModerationGrid";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { RootState } from "@/store/store";
import { setProductModerationTab } from "@/store/slices/tabSlice";
import { productModerationData, productModerationTableColumns } from "@/data";
import Paragraph from "@/components/atoms/Paragraph";

const ProductModerationWrapper = () => {
  const dispatch = useAppDispatch();
  const activeTab = useAppSelector(
    (state: RootState) => state.tabs.productModerationActiveTab
  );

  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center flex-wrap gap-2">
        <Title text="Product Submissions" />
        <Paragraph className="text-sm text-gray-500">
          Review and manage new product submissions from sellers.
        </Paragraph>
      </div>
      <Tabs
        activeTab={activeTab}
        onTabChange={(tab) => dispatch(setProductModerationTab(tab))}
      >
        <Tab label="List">
          <Table
            data={productModerationData}
            columns={productModerationTableColumns}
          />
        </Tab>
        <Tab label="Grid">
          <ProductModerationGrid data={productModerationData} />
        </Tab>
      </Tabs>
    </div>
  );
};

export default ProductModerationWrapper;
