import Title from "@/components/atoms/Title";
import React from "react";
import { Tab, Tabs } from "../global/Tabs";
import Table from "../global/table/Table";
import { setRecentActivityTab } from "@/store/slices/tabSlice";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { RootState } from "@/store/store";
import {
  newUsersColumns,
  supportTicketsColumns,
  newUsersData,
  recentOrdersColumns,
  recentOrdersData,
  supportTicketsData,
} from "@/data";
import { Button } from "@/components/atoms/Button";
import { useRouter } from "next/navigation";

const RecentActivity = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const activeTab = useAppSelector(
    (state: RootState) => state.tabs.recentActivityActiveTab
  );
  return (
    <div className="space-y-3">
      <Title text="Recent Activity" />
      <Tabs
        activeTab={activeTab}
        onTabChange={(tab) => dispatch(setRecentActivityTab(tab))}
      >
        <Tab label="New Users">
          <Table data={newUsersData} columns={newUsersColumns} />
          <div className="flex justify-end mt-4">
            <Button
              variant="action"
              onClick={() => router.push("/dashboard/users")}
            >
              View All Users
            </Button>
          </div>
        </Tab>
        <Tab label="Recent Orders">
          <Table data={recentOrdersData} columns={recentOrdersColumns} />
          <div className="flex justify-end mt-4">
            <Button
              variant="action"
              onClick={() => router.push("/dashboard/orders")}
            >
              View All Orders
            </Button>
          </div>
        </Tab>
        <Tab label="Support Tickets">
          <Table data={supportTicketsData} columns={supportTicketsColumns} />
          <div className="flex justify-end mt-4">
            <Button
              variant="action"
              onClick={() => router.push("/dashboard/tickets")}
            >
              View All Tickets
            </Button>
          </div>
        </Tab>
      </Tabs>
    </div>
  );
};

export default RecentActivity;
