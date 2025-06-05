"use client";
import React, { useState } from "react";
import { Button } from "@/components/atoms/Button";
import Title from "@/components/atoms/Title";
import DrawerContainer from "@/components/molecules/global/DrawerContainer";
import Table from "@/components/molecules/global/table/Table";
import { membershipData, membershipTableColumns } from "@/data";
import { Plus } from "lucide-react";
import AddMembershipForm from "@/components/molecules/membership/AddMembershipForm";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { Tab, Tabs } from "@/components/molecules/global/Tabs";
import { setMembershipTab } from "@/store/slices/tabSlice";
import { RootState } from "@/store/store";
import MembershipGrid from "@/components/molecules/membership/MembershipGrid";

const MembershipWrapper = () => {
  const dispatch = useAppDispatch();
  const activeTab = useAppSelector(
    (state: RootState) => state.tabs.membershipActiveTab
  );
  const [isOpen, setIsOpen] = useState(false);

  const openAddMembershipDrawer = () => {
    setIsOpen(true);
  };

  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center">
        <Title text="Memberships" />
        <Button
          onClick={openAddMembershipDrawer}
          variant="action"
          className="text-sm bg-scarlet-red hover:bg-red-500 text-white"
        >
          <Plus size={18} /> New membership
        </Button>
      </div>
      <Tabs
        activeTab={activeTab}
        onTabChange={(tab) => dispatch(setMembershipTab(tab))}
      >
        <Tab label="List">
          <Table data={membershipData} columns={membershipTableColumns} />
        </Tab>
        <Tab label="Grid">
          <MembershipGrid data={membershipData} />
        </Tab>
      </Tabs>

      <DrawerContainer
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        dismissible={false}
      >
        <AddMembershipForm setIsOpen={setIsOpen} />
      </DrawerContainer>
    </div>
  );
};

export default MembershipWrapper;
