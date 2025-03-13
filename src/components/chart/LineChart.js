import React from 'react'
import { Line } from "react-chartjs-2";

function LineChart() {
  // Sample Line Chart Data
  const lineChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "User Growth",
        data: [200, 500, 1500, 3200, 4500, 6000],
        borderColor: "rgb(54, 162, 235)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        tension: 0.4,
      },
    ],
  };

  return (
    <>
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-lg font-semibold mb-4">User Growth Over Time</h2>
        <Line data={lineChartData} />
      </div>
    </>
  );
}

export default LineChart