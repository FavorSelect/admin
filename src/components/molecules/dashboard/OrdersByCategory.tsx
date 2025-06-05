import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale);

const OrdersByCategory: React.FC = () => {
  const data = {
    labels: ["Electronics", "Clothing", "Home", "Books", "Other"],
    datasets: [
      {
        label: "Orders",
        data: [250, 240, 230, 220, 260],
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
        ticks: { stepSize: 50 },
      },
    },
  };

  return (
    <div className="p-4 rounded-lg border border-pale-rose w-full">
      <div className="text-sm text-gray-500 mb-2">Orders by Category</div>
      <div className="text-xl font-bold text-gray-900">1,200</div>
      <div className="text-sm text-green-600 mb-4">Last 12 Months +5%</div>
      <Bar data={data} options={options} />
    </div>
  );
};

export default OrdersByCategory;
