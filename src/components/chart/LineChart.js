import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function LineChart({ data, isLoading }) {
  if (isLoading) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-lg">
        Loading chart data...
      </div>
    );
  }

  if (
    !data ||
    !data.payrollExpensesByEmployee ||
    data.payrollExpensesByEmployee.length === 0
  ) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-lg">
        No data to display.
      </div>
    );
  }

  const labels = data.payrollExpensesByEmployee.map(
    (item) => item["employee.Employee_Name"]
  );
  const payrolldata = data.payrollExpensesByEmployee.map((item) =>
    parseFloat(item.net_pay)
  );

  const lineChartData = {
    labels: labels,
    datasets: [
      {
        label: "Payroll data by Employee",
        data: payrolldata,
        borderColor: "rgb(54, 162, 235)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        tension: 0.4,
      },
    ],
  };

  const options = {
    // Add options for better chart presentation
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Payroll Expenses by Employee",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Salary",
        },
      },
      x: {
        title: {
          display: true,
          text: "Employee Name",
        },
      },
    },
  };

  return (
    <>
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-lg font-semibold mb-4">
          Payroll Expenses by Employee
        </h2>
        <Line options={options} data={lineChartData} />
      </div>
    </>
  );
}

export default LineChart;
