import React from 'react'
import { PolarArea } from "react-chartjs-2";

function PolarChart() {
  // Sample Polar Area Chart Data
  const polarChartData = {
    labels: ["Marketing", "Development", "Sales", "Support", "HR"],
    datasets: [
      {
        data: [30, 30, 20, 40, 35],
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
        ],
      },
    ],
  };

  return (
    <>
      <div className="bg-white p-14 rounded-xl shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Department Distribution</h2>
        <PolarArea data={polarChartData} />
      </div>
    </>
  );
}

export default PolarChart