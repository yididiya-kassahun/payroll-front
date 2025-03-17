// ReportContext.js
import React, { createContext, useState, useContext } from "react";

const ReportContext = createContext();

export const useReport = () => useContext(ReportContext);

export const ReportProvider = ({ children }) => {
  const [reportData, setReportData] = useState(null);

  const value = {
    reportData,
    setReportData,
  };

  return (
    <ReportContext.Provider value={value}>{children}</ReportContext.Provider>
  );
};
