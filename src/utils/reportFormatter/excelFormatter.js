import * as XLSX from "xlsx";

const excelFormatter = (record, dataSource) => {
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

  const tableRows = dataSource?.map((payrollData) => [
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
  ]);

  const wb = XLSX.utils.book_new();

  const ws = XLSX.utils.aoa_to_sheet([tableColumn, ...tableRows]);

  XLSX.utils.book_append_sheet(wb, ws, "Payroll Report");

  const fileName = `payroll_report_${record.tinNumber?.replace(/\s+/g, "_") || "default"}.xlsx`;

  XLSX.writeFile(wb, fileName);
};

export default excelFormatter;
