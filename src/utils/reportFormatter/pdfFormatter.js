import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import axios from "axios";
import { API_BASE_URL } from "../../config";
import { data } from "react-router-dom";

// Assuming API_BASE_URL and record are defined elsewhere in your code

const pdfFormatter = async (record, format) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/reports/payroll?employee_tin=${record.tinNumber}`,
      {
        params: { format },
        responseType: "json", // Expect JSON response
      }
    );

    const dataSource = response.data;
    console.log(dataSource);

    const doc = new jsPDF();

    const tableColumn = [
      "Payroll Date",
      "Gross Earning",
      "Taxable Income",
      "Income Tax",
      "Employee Pension Contribution",
      "Employer Pension Contribution",
      "Loan Deductions",
      "Food Deduction",
      "Penalty Deductions",
      "Net Pay",
    ];

    const tableRows = [];

    let fileName = "Processed_Payment_Report"; // Default file name

    dataSource?.forEach((payrollData, index) => {
      const rowData = [
        payrollData.payroll_date,
        payrollData.gross_earning,
        payrollData.taxable_income,
        payrollData.income_tax,
        payrollData.employee_pension_contribution,
        payrollData.employer_pension_contribution,
        payrollData.loan_deductions,
        payrollData.food_deduction,
        payrollData.penalty_deductions,
        payrollData.net_pay,
      ];
      tableRows.push(rowData);

      if (index === 0) {
        fileName = `payroll_report${record.tinNumber.replace(/\s+/g, "_")}`;
      }
    });

    doc.text("Payroll Report", 14, 15);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
      styles: { fontSize: 8 }, // Adjusted font size for more columns
      columnStyles: {
        // Optional: Adjust column widths as needed
        0: { cellWidth: 20 }, // Payroll Date
        1: { cellWidth: 18 }, // Gross Earning
        2: { cellWidth: 18 }, // Taxable Income
        3: { cellWidth: 14 }, // Income Tax
        4: { cellWidth: 22 }, // Employee Pension
        5: { cellWidth: 22 }, // Employer Pension
        6: { cellWidth: 16 }, // Loan Deductions
        7: { cellWidth: 16 }, // Food Deduction
        8: { cellWidth: 16 }, // Penalty Deductions
        9: { cellWidth: 16 }, // Net Pay
      },
    });

    doc.save(`${fileName}.pdf`);
  } catch (error) {
    console.error("Error downloading PDF:", error);
    // Handle the error appropriately, e.g., display an error message to the user
  }
};

export default pdfFormatter;
