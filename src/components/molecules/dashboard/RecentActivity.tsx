"use client";
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
  recentOrdersColumns,
} from "@/data";
import { Button } from "@/components/atoms/Button";
import { useRouter } from "next/navigation";
import {
  useGetLatestUsersQuery,
  useGetLatestOrdersQuery,
  useGetLatestTicketsQuery,
} from "@/store/api/dashboardApi";

const RecentActivity = ({ token }: { token: string }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const activeTab = useAppSelector(
    (state: RootState) => state.tabs.recentActivityActiveTab
  );

  const {
    data: usersData,
    isLoading: loadingUsers,
    isError: errorUsers,
  } = useGetLatestUsersQuery(token);

  const {
    data: ordersData,
    isLoading: loadingOrders,
    isError: errorOrders,
  } = useGetLatestOrdersQuery(token);

  const {
    data: ticketsData,
    isLoading: loadingTickets,
    isError: errorTickets,
  } = useGetLatestTicketsQuery(token);

  console.log(ticketsData);

  return (
    <div className="space-y-3">
      <Title text="Recent Activity" />
      <Tabs
        activeTab={activeTab}
        onTabChange={(tab) => dispatch(setRecentActivityTab(tab))}
      >
        {/* Users Tab */}
        <Tab label="New Users">
          {loadingUsers ? (
            <p className="text-center py-4">Loading users...</p>
          ) : errorUsers ? (
            <p className="text-red-500 text-center py-4">
              Failed to load users.
            </p>
          ) : (
            <>
              <Table data={usersData?.users || []} columns={newUsersColumns} />
              <div className="flex justify-end mt-4">
                <Button variant="action" onClick={() => router.push("/users")}>
                  View All Users
                </Button>
              </div>
            </>
          )}
        </Tab>

        {/* Orders Tab */}
        <Tab label="Recent Orders">
          {loadingOrders ? (
            <p className="text-center py-4">Loading orders...</p>
          ) : errorOrders ? (
            <p className="text-red-500 text-center py-4">
              Failed to load orders.
            </p>
          ) : (
            <>
              <Table
                data={ordersData?.orders || []}
                columns={recentOrdersColumns}
              />
              <div className="flex justify-end mt-4">
                <Button variant="action" onClick={() => router.push("/orders")}>
                  View All Orders
                </Button>
              </div>
            </>
          )}
        </Tab>

        {/* Tickets Tab */}
        <Tab label="Support Tickets">
          {loadingTickets ? (
            <p className="text-center py-4">Loading tickets...</p>
          ) : errorTickets ? (
            <p className="text-red-500 text-center py-4">
              Failed to load tickets.
            </p>
          ) : (
            <>
              <Table
                data={ticketsData?.tickets || []}
                columns={supportTicketsColumns}
              />
              <div className="flex justify-end mt-4">
                <Button
                  variant="action"
                  onClick={() => router.push("/tickets")}
                >
                  View All Tickets
                </Button>
              </div>
            </>
          )}
        </Tab>
      </Tabs>
    </div>
  );
};

export default RecentActivity;
