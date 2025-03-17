import React, { useState, useEffect } from "react";
import { Table, Button, Dropdown, Menu, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import "jspdf-autotable";
import {
  Document,
  Paragraph,
  Packer,
  Table as DocxTable,
  TableRow,
  TableCell,
  WidthType,
} from "docx";

const Reports = () => {
  const [reportData, setReportData] = useState([
    {
      payroll_date: "2025-03-16",
      gross_earning: "34145",
      taxable_income: "34133",
      income_tax: "5326.6",
      employee_pension_contribution: "2380",
      employer_pension_contribution: "3740",
      loan_deductions: "350",
      food_deduction: "1200",
      penalty_deductions: "0",
      net_pay: "24888.4",
    },
    {
      payroll_date: "2025-03-16",
      gross_earning: "23145",
      taxable_income: "23133",
      income_tax: "3126.6",
      employee_pension_contribution: "1610",
      employer_pension_contribution: "2530",
      loan_deductions: "250",
      food_deduction: "1200",
      penalty_deductions: "0",
      net_pay: "16958.4",
    },
  ]);

  const columns = [
    {
      title: "Payroll Date",
      dataIndex: "payroll_date",
      key: "payroll_date",
    },
    {
      title: "Gross Earning",
      dataIndex: "gross_earning",
      key: "gross_earning",
      render: (text) => `$${parseFloat(text).toLocaleString()}`,
    },
    {
      title: "Taxable Income",
      dataIndex: "taxable_income",
      key: "taxable_income",
      render: (text) => `$${parseFloat(text).toLocaleString()}`,
    },
    {
      title: "Income Tax",
      dataIndex: "income_tax",
      key: "income_tax",
      render: (text) => `$${parseFloat(text).toLocaleString()}`,
    },
    {
      title: "Employee Pension Contribution",
      dataIndex: "employee_pension_contribution",
      key: "employee_pension_contribution",
      render: (text) => `$${parseFloat(text).toLocaleString()}`,
    },
    {
      title: "Employer Pension Contribution",
      dataIndex: "employer_pension_contribution",
      key: "employer_pension_contribution",
      render: (text) => `$${parseFloat(text).toLocaleString()}`,
    },
    {
      title: "Loan Deductions",
      dataIndex: "loan_deductions",
      key: "loan_deductions",
      render: (text) => `$${parseFloat(text).toLocaleString()}`,
    },
    {
      title: "Food Deduction",
      dataIndex: "food_deduction",
      key: "food_deduction",
      render: (text) => `$${parseFloat(text).toLocaleString()}`,
    },
    {
      title: "Penalty Deductions",
      dataIndex: "penalty_deductions",
      key: "penalty_deductions",
      render: (text) => `$${parseFloat(text).toLocaleString()}`,
    },
    {
      title: "Net Pay",
      dataIndex: "net_pay",
      key: "net_pay",
      render: (text) => `$${parseFloat(text).toLocaleString()}`,
    },
  ];

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(reportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Payroll Report");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const data = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(data, "payroll_report.xlsx");
  };

  const exportToPdf = () => {
    const doc = new jsPDF();
    doc.text("Payroll Report", 10, 10);
    doc.autoTable({
      head: [columns.map((col) => col.title)],
      body: reportData.map((row) => columns.map((col) => row[col.dataIndex])),
    });
    doc.save("payroll_report.pdf");
  };

  const exportToWord = async () => {
    const doc = new Document({
      sections: [
        {
          children: [
            new Paragraph({ text: "Payroll Report", heading: "Heading1" }),
            new DocxTable({
              rows: [
                new TableRow({
                  children: columns.map(
                    (col) =>
                      new TableCell({
                        children: [new Paragraph({ text: col.title })],
                      })
                  ),
                }),
                ...reportData.map(
                  (row) =>
                    new TableRow({
                      children: columns.map(
                        (col) =>
                          new TableCell({
                            children: [
                              new Paragraph({
                                text: String(row[col.dataIndex]),
                              }),
                            ],
                          })
                      ),
                    })
                ),
              ],
              width: {
                size: 100,
                type: WidthType.PERCENTAGE,
              },
            }),
          ],
        },
      ],
    });
    const blob = await Packer.toBlob(doc);
    saveAs(blob, "payroll_report.docx");
  };

  const menu = (
    <Menu>
      <Menu.Item key="excel" onClick={exportToExcel}>
        Export to Excel
      </Menu.Item>
      <Menu.Item key="pdf" onClick={exportToPdf}>
        Export to PDF
      </Menu.Item>
      <Menu.Item key="word" onClick={exportToWord}>
        Export to Word
      </Menu.Item>
    </Menu>
  );

  return (
    <div>
      <h2>Payroll Report</h2>
      <Space style={{ marginBottom: 16 }}>
        <Dropdown overlay={menu}>
          <Button>
            Export <DownOutlined />
          </Button>
        </Dropdown>
      </Space>
      <Table
        dataSource={reportData}
        columns={columns}
        rowKey={(record) => record.payroll_date}
        bordered
      />
    </div>
  );
};

export default Reports;
