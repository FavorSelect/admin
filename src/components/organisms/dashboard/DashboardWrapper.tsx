"use client";
import React from "react";
import Title from "@/components/atoms/Title";
import OrdersByCategory from "@/components/molecules/dashboard/OrdersByCategory";
import RevenueChart from "@/components/molecules/dashboard/RevenueChart";
import RecentActivity from "@/components/molecules/dashboard/RecentActivity";

import Stats from "@/components/molecules/dashboard/Stats";

const DashboardWrapper = ({ token }: { token: string }) => {
  return (
    <div className="space-y-5">
      <Stats token={token} />
      <div>
        <Title text="Sales overview" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <RevenueChart token={token} />
          <OrdersByCategory token={token} />
        </div>
      </div>
      <RecentActivity token={token} />
    </div>
  );
};

export default DashboardWrapper;
