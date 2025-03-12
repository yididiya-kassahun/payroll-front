import React from "react";
import {
  UsergroupAddOutlined,
  BookOutlined,
  SwapRightOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import card1 from "../../assets/cards/card1.svg";
import card2 from "../../assets/cards/card2.svg";
import card3 from "../../assets/cards/card3.svg";
import card4 from "../../assets/cards/card4.svg";

function Dashboard() {
  const reportData = [
    {
      label: "USERS SIGNED UP",
      value: "3882",
      icon: <UsergroupAddOutlined className="text-3xl text-blue-500" />,
      // bgColor: "bg-blue-100",
      textColor: "text-blue-600",
      bgImage: card1,
    },
    {
      label: "LIFETIME VALUE",
      value: "532",
      icon: <BookOutlined className="text-3xl text-yellow-500" />,
      // bgColor: "bg-yellow-100",
      textColor: "text-yellow-600",
      bgImage: card2,
    },
    {
      label: "CONVERSION RATE",
      value: "12.6%",
      icon: <SwapRightOutlined className="text-3xl text-green-500" />,
      // bgColor: "bg-green-100",
      textColor: "text-green-600",
      bgImage: card3,
    },
    {
      label: "ACTIVE TRIALS",
      value: "440",
      icon: <MessageOutlined className="text-3xl text-purple-500" />,
      // bgColor: "bg-purple-100",
      textColor: "text-purple-600",
      bgImage: card4,
    },
  ];

  return (
    <div className="flex items-center justify-center bg-gray-100 p-2">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-7xl w-full">
        {reportData.map((item, index) => (
          <div
            key={index}
            className={`bg-white p-6 rounded-xl shadow-lg flex flex-col`}
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
    </div>
  );
}

export default Dashboard;
