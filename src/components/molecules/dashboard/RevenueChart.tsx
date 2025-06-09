"use client";
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { useGetRevenueAnalyticsQuery } from "@/store/api/dashboardApi";

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale);

const RevenueChart: React.FC<{ token: string }> = ({ token }) => {
  const { data, isLoading, isError } = useGetRevenueAnalyticsQuery(token);

  if (isLoading) {
    return (
      <div className="p-4 rounded-lg border border-pale-rose w-full text-center text-gray-500">
        Loading revenue data...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4 rounded-lg border border-red-300 bg-red-50 w-full text-center text-red-600">
        Failed to load revenue analytics. Please try again later.
      </div>
    );
  }

  const chartData = {
    labels: data?.revenueOverTime.map((entry) => entry.month) || [],
    datasets: [
      {
        label: "Revenue",
        data: data?.revenueOverTime.map((entry) => entry.revenue) || [],
        borderColor: "#f5e5e5",
        fill: false,
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      y: {
        beginAtZero: false,
      },
    },
  };

  return (
    <div className="p-4 rounded-lg w-full border border-pale-rose">
      <div className="text-sm text-gray-500 mb-2">Revenue Over Time</div>
      <div className="text-xl font-bold text-gray-900">
        ${data?.totalRevenue?.toLocaleString() || 0}
      </div>
      <div
        className={`text-sm mb-4 ${
          typeof data?.percentageChange === "number"
            ? data.percentageChange >= 0
              ? "text-green-600"
              : "text-red-600"
            : "text-gray-500"
        }`}
      >
        Last 12 Months{" "}
        {typeof data?.percentageChange === "number"
          ? `${data.percentageChange >= 0 ? "+" : ""}${data.percentageChange}%`
          : "N/A"}
      </div>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default RevenueChart;
