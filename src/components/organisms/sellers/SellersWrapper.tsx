"use client";
import React from "react";
import Title from "@/components/atoms/Title";
import { setSellersTab } from "@/store/slices/tabSlice";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { RootState } from "@/store/store";
import { sellerTableColumns, sellersData } from "@/data";
import { Tab, Tabs } from "@/components/molecules/global/Tabs";
import Table from "@/components/molecules/global/table/Table";

const SellersWrapper = () => {
  const dispatch = useAppDispatch();
  const activeTab = useAppSelector(
    (state: RootState) => state.tabs.sellersActiveTab
  );

  return (
    <div className="space-y-3">
      <Title text="Sellers" />
      <Tabs
        activeTab={activeTab}
        onTabChange={(tab) => dispatch(setSellersTab(tab))}
      >
        <Tab label="All Sellers">
          <Table data={sellersData} columns={sellerTableColumns} />
        </Tab>
        <Tab label="Pending Approvals">
          <Table
            data={sellersData.filter((s) => s.status === "Inactive")}
            columns={sellerTableColumns}
          />
        </Tab>
      </Tabs>
    </div>
  );
};

export default SellersWrapper;
