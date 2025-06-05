"use client";
import React, { useState } from "react";
import Title from "@/components/atoms/Title";
import Table from "@/components/molecules/global/table/Table";
import { Tab, Tabs } from "@/components/molecules/global/Tabs";
import Select from "react-select";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { setTicketTab } from "@/store/slices/tabSlice";
import { RootState } from "@/store/store";
import {
  sellersTicketData,
  sellerTicketTableColumns,
  usersTicketData,
  usersTicketTableColumns,
} from "@/data";

// Status options
const filterOptions = ["Open", "In Progress", "Closed"].map((status) => ({
  label: status,
  value: status,
}));

const TicketsWrapper = () => {
  const dispatch = useAppDispatch();
  const activeTab = useAppSelector(
    (state: RootState) => state.tabs.ticketActiveTab
  );

  const [sellerFilter, setSellerFilter] = useState<{
    label: string;
    value: string;
  } | null>(null);
  const [userFilter, setUserFilter] = useState<{
    label: string;
    value: string;
  } | null>(null);

  // Filtered data
  const filteredSellers = sellerFilter
    ? sellersTicketData.filter((d) => d.status === sellerFilter.value)
    : sellersTicketData;

  const filteredUsers = userFilter
    ? usersTicketData.filter((d) => d.status === userFilter.value)
    : usersTicketData;

  return (
    <div className="space-y-5">
      <Title text="Tickets" />
      <Tabs
        activeTab={activeTab}
        onTabChange={(tab) => dispatch(setTicketTab(tab))}
      >
        <Tab label="Seller Tickets">
          <Select
            options={filterOptions}
            value={sellerFilter}
            onChange={setSellerFilter}
            placeholder="Filter by status"
            isClearable
            className="mb-4 text-sm max-w-72"
          />
          <Table data={filteredSellers} columns={sellerTicketTableColumns} />
        </Tab>
        <Tab label="User Tickets">
          <Select
            options={filterOptions}
            value={userFilter}
            onChange={setUserFilter}
            placeholder="Filter by status"
            isClearable
            className="mb-4 text-sm max-w-72"
          />
          <Table data={filteredUsers} columns={usersTicketTableColumns} />
        </Tab>
      </Tabs>
    </div>
  );
};

export default TicketsWrapper;
