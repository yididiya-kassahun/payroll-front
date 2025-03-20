import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import axios from "axios";
import { API_BASE_URL } from "../../config";
import { data } from "react-router-dom";

const pdfFormatter = async (record, format) => {
  const token = localStorage.getItem("authToken");
  try {
    const response = await axios.get(
      `${API_BASE_URL}/reports/payroll?employee_tin=${record.tinNumber}`,
      {
        params: { format },
        responseType: "json",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const dataSource = response.data;
    console.log(dataSource);

    const doc = new jsPDF();

    const employeeDetails =
      dataSource && dataSource.length > 0 ? dataSource[0] : null;

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

    let fileName = "Processed_Payment_Report"; 

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
        fileName = `payroll_report_${record.tinNumber.replace(/\s+/g, "_")}`;
      }
    });

    doc.text("Payroll Report", 148, 25);

    let currentY = 20; 

    if (employeeDetails) {
      doc.setFontSize(10);
      doc.text(
        `Employee Name: ${employeeDetails.employee_name || "N/A"}`,
        14,
        currentY
      );
      currentY += 7; 
      doc.text(
        `Employee TIN: ${employeeDetails.employee_tin || "N/A"}`,
        14,
        currentY
      );
      currentY += 7;
      doc.text(
        `Basic Salary: ${employeeDetails.basic_salary || "N/A"}`,
        14,
        currentY
      );
      currentY += 7;
      doc.text(
        `Bank Account: ${employeeDetails.bank_account || "N/A"}`,
        14,
        currentY
      );
      currentY += 10; // Add some extra space before the table
    } else {
      doc.setFontSize(10);
      doc.text("Employee details not found.", 14, currentY);
      currentY += 10; // Adjust spacing before table
    }

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: currentY, 
      styles: { fontSize: 8 }, 
      columnStyles: {
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
  }
};

export default pdfFormatter;