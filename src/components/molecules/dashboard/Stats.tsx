"use client";
import React from "react";
import StatsCard from "@/components/molecules/dashboard/StatsCard";
import Title from "@/components/atoms/Title";
import { useGetAdminStatsQuery } from "@/store/api/dashboardApi";

const Stats = ({ token }: { token: string }) => {
  const { data, isLoading, isError } = useGetAdminStatsQuery(token);
  const stats = data?.data?.[0];

  if (isLoading) {
    return (
      <div className="text-center text-gray-600 py-10 text-lg">
        Loading dashboard stats...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-500 py-10 text-lg">
        Failed to load dashboard stats. Please try again later.
      </div>
    );
  }

  return (
    <div>
      <Title text="Stats" />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <StatsCard
          title="Total Revenue"
          value={stats?.totalRevenue || 0}
          change={stats?.totalRevenuePercentage?.toString() || "0"}
          changeType={
            typeof stats?.totalRevenuePercentage === "number"
              ? stats.totalRevenuePercentage >= 0
                ? "positive"
                : "negative"
              : "positive"
          }
        />
        <StatsCard
          title="Orders"
          value={stats?.totalOrders || 0}
          change={stats?.totalOrdersPercentage?.toString() || "0"}
          changeType={
            typeof stats?.totalOrdersPercentage === "number"
              ? stats.totalOrdersPercentage >= 0
                ? "positive"
                : "negative"
              : "positive"
          }
        />
        <StatsCard
          title="Customers"
          value={stats?.totalCustomers || 0}
          change={stats?.totalCustomersPercentage?.toString() || "0"}
          changeType={
            typeof stats?.totalCustomersPercentage === "number"
              ? stats.totalCustomersPercentage >= 0
                ? "positive"
                : "negative"
              : "positive"
          }
        />
      </div>
    </div>
  );
};

export default Stats;
