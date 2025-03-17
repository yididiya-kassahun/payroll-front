import React from "react";

function ReportCards({ reportData }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl w-full md:w-auto ml-auto">
      {reportData.map((item, index) => (
        <div
          key={index}
          className={`bg-white p-4 rounded-xl shadow-lg flex flex-col h-32`} // Reduced padding & set height
          style={{
            backgroundImage: `url(${item.bgImage})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "bottom",
          }}
        >
          <div className="flex items-center gap-2">
            {item.icon}
            <h2 className={`text-sm font-semibold ${item.textColor}`}>
              {item.label}
            </h2>
          </div>
          <p className="text-lg font-bold">{item.value}</p>{" "}
          {/* Reduced text size */}
        </div>
      ))}
    </div>
  );
}

export default ReportCards;
