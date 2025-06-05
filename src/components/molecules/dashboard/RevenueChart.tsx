import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale);

const RevenueChart: React.FC = () => {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Revenue",
        data: [30000, 28000, 32000, 25000, 27000, 29000, 34000],
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
      <div className="text-xl font-bold text-gray-900">$250,000</div>
      <div className="text-sm text-green-600 mb-4">Last 12 Months +10%</div>
      <Line data={data} options={options} />
    </div>
  );
};

export default RevenueChart;
