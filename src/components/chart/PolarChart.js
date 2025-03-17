import React from "react";
import { PolarArea } from "react-chartjs-2";
import moment from "moment";

function PolarChart({ data, isLoading }) {
  if (isLoading) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-lg">
        Loading chart data...
      </div>
    );
  }

  if (
    !data ||
    !data.payrollExpensesByMonth ||
    data.payrollExpensesByMonth.length === 0
  ) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-lg">
        No data to display.
      </div>
    );
  }

  const monthLabels = data.payrollExpensesByMonth.map((item) =>
    moment(item.month).format("MMM")
  );
  const totalExpensesValues = data.payrollExpensesByMonth.map(
    (
      item // Corrected data mapping
    ) => parseFloat(item.total_expenses)
  );

  const polarChartData = {
    labels: monthLabels,
    datasets: [
      {
        label: "Total Expenses",
        data: totalExpensesValues,
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      title: {
        display: true,
        text: "Payroll Expenses by Month",
        font: {
          size: 18,
        },
      },
      legend: {
        position: "bottom",
      },
    },
    scales: {
      // configure radial scale
      r: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Total Expenses",
        },
      },
    },
  };

  return (
    <>
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-lg font-semibold mb-4">
          Payroll Expenses by Month
        </h2>
        <PolarArea data={polarChartData} options={options} />
      </div>
    </>
  );
}

export default PolarChart;
