"use client";
import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { useGetOrdersByCategoryQuery } from "@/store/api/dashboardApi";

ChartJS.register(BarElement, CategoryScale, LinearScale);

const OrdersByCategory: React.FC<{ token: string }> = ({ token }) => {
  const { data, isLoading, isError } = useGetOrdersByCategoryQuery(token);

  if (isLoading) {
    return (
      <div className="p-4 rounded-lg border border-pale-rose w-full text-center text-gray-500">
        Loading category orders...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4 rounded-lg border border-red-300 bg-red-50 w-full text-center text-red-600">
        Failed to load order categories. Please try again later.
      </div>
    );
  }

  const chartData = {
    labels: data?.ordersByCategory.map((entry) => entry.category) || [],
    datasets: [
      {
        label: "Orders",
        data: data?.ordersByCategory.map((entry) => entry.orders) || [],
        backgroundColor: "#f5e5e5",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 5 },
      },
    },
  };

  return (
    <div className="p-4 rounded-lg border border-pale-rose w-full">
      <div className="text-sm text-gray-500 mb-2">Orders by Category</div>
      <div className="text-xl font-bold text-gray-900">
        {data?.totalOrders?.toLocaleString() || 0}
      </div>
      <div className="text-sm text-green-600 mb-4">Last 12 Months</div>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default OrdersByCategory;
