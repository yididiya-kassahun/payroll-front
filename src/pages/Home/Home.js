import React from "react";
import {
  UsergroupAddOutlined,
  BookOutlined,
  SwapRightOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import card1 from "../../assets/cards/card1.svg";
import card2 from "../../assets/cards/card2.svg";
import card3 from "../../assets/cards/card3.svg";
import card4 from "../../assets/cards/card4.svg";

import PolarChart from "../../components/chart/PolarChart";
import LineChart from "../../components/chart/LineChart";
import { fetchStat } from "../../services/employeeService";
import { useQuery } from "@tanstack/react-query";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend
);

function Dashboard() {


  const { data:stat, isLoading,isError, error, refetch } = useQuery({
    queryKey: ["stat"],
    queryFn: () => fetchStat(),
    keepPreviousData: true,
  });
  
  if(isLoading){
    console.log("loading... ");
  }else{
    console.log("data ", stat);
  }
 // const stat = data?.tax;

    const reportData = React.useMemo(() => {
      if (isLoading) {
        return Array(4).fill({ label: "Loading...", value: "Loading..." });
      }

      if (isError) {
        return [
          { label: "Error", value: error.message || "Failed to load tax data" },
        ];
      }

      if (!stat) {
        return [{ label: "No Data", value: "Tax information not available." }];
      }

      return [
        {
          label: "Total Employee",
          value: stat.totalEmployees,
          icon: <UsergroupAddOutlined className="text-3xl text-blue-500" />,
          textColor: "text-blue-600",
          bgImage: card1,
        },
        {
          label: "Total Payroll Expenses ",
          value: stat.totalPayrollExpenses,
          icon: <BookOutlined className="text-3xl text-yellow-500" />,
          textColor: "text-yellow-600",
          bgImage: card2,
        },
        {
          label: "Average Net Pay",
          value: stat.averageNetPay,
          icon: <SwapRightOutlined className="text-3xl text-green-500" />,
          textColor: "text-green-600",
          bgImage: card3,
        },
        {
          label: "Total Deductions",
          value: stat.totalDeductions,
          icon: <MessageOutlined className="text-3xl text-purple-500" />,
          textColor: "text-purple-600",
          bgImage: card4,
        },
      ];
    }, [stat, isLoading, isError, error]);

  return (
    <div className="flex flex-col items-center bg-gray-100 p-6">
      {/* Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-7xl w-full">
        {reportData.map((item, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow-lg flex flex-col"
            style={{
              backgroundImage: `url(${item.bgImage})`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "bottom",
            }}
          >
            <div className="flex items-center gap-2 mb-4">
              {item.icon}
              <h2 className={`text-sm font-semibold ${item.textColor}`}>
                {item.label}
              </h2>
            </div>
            <p className="text-2xl font-bold mb-4">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10 max-w-7xl w-full">
        <LineChart data={stat} isLoading={isLoading} />
        <PolarChart data={stat} isLoading={isLoading} />
      </div>
    </div>
  );
}

export default Dashboard;
