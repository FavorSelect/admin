"use client";
import React from "react";
import Title from "@/components/atoms/Title";
import OrdersByCategory from "@/components/molecules/dashboard/OrdersByCategory";
import RevenueChart from "@/components/molecules/dashboard/RevenueChart";
import StatsCard from "@/components/molecules/dashboard/StatsCard";
import RecentActivity from "@/components/molecules/dashboard/RecentActivity";

const DashboardWrapper = () => {
  return (
    <div className="space-y-5">
      {/* stats */}
      <div>
        <Title text="Stats" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <StatsCard
            title="Total Revenue"
            value={25000}
            change="22"
            changeType="positive"
          />
          <StatsCard
            title="Orders"
            value={1200}
            change="22"
            changeType="negative"
          />
          <StatsCard
            title="Customers"
            value={500}
            change="8"
            changeType="positive"
          />
        </div>
      </div>
      {/* stats */}
      {/* analytics */}
      <div>
        <Title text="Sales overview" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <RevenueChart />
          <OrdersByCategory />
        </div>
      </div>
      {/* analytics */}
      {/* recent activity */}
      <RecentActivity />
    </div>
  );
};

export default DashboardWrapper;
