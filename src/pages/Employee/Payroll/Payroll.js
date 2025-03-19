import React from "react";
import {
  UsergroupAddOutlined,
  BookOutlined,
  SwapRightOutlined,
  MessageOutlined,
  ReloadOutlined,
  DeleteOutlined,
  FileExcelOutlined,
  FilePdfOutlined,
  FileWordOutlined,
  MailOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  InputNumber,
  message,
  Row,
  Spin,
  Table,
} from "antd";
import {
  addLoan,
  fetchLoanHistory,
  fetchTaxes,
} from "../../../services/employeeService";
import { useMutation, useQuery } from "@tanstack/react-query";
import ErrorBlock from "../../../components/UI/ErrorBlock";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment/moment";
import { fetchPayroll, refreshPayroll, sendEmailToEmployee } from "../../../services/payrollService";
import user from "../../../assets/imgs/user.png";
import pdfFormatter from "../../../utils/reportFormatter/pdfFormatter";
import ReportCards from "./ReportCards";

const { Column } = Table;

function Payroll({ format }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [form] = Form.useForm();
  // const { reportData, setReportData } = useReport();

  const { record } = location.state || {};

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["payroll", record?.tinNumber],
    queryFn: () => fetchPayroll(record?.tinNumber),
    keepPreviousData: true,
    staleTime: 5000,
    enabled: !!record?.tinNumber,
  });

  const { mutate, isError, isPending, error } = useMutation({
    mutationFn: addLoan,
    onSuccess: (data) => {
      message.success("Load added successfully!");
      form.resetFields();
      refetch();
    },
    onError: (error) => {
      message.error("Failed to add load data: " + error.message);
      console.log("Mutation error:", error.message);
    },
  });

  const { data: loanData } = useQuery({
    queryKey: ["loan", record?.tinNumber],
    queryFn: () => fetchLoanHistory(record.tinNumber),
    keepPreviousData: true,
    staleTime: 5000,
    enabled: !!record?.tinNumber,
  });

  const { data: taxData, refetch: refetchTax } = useQuery({
    queryKey: ["tax", record?.tinNumber],
    queryFn: () => fetchTaxes("1234"),
    keepPreviousData: true,
    staleTime: 5000,
    enabled: !!record?.tinNumber,
  });

 // const payrollData = data?.payroll ? [data.payroll] : [];
  const loanHistory = loanData?.loan ? [loanData.loan] : [];
  const tax = taxData?.tax;

 //console.log("Record Data:", record);

  const reportData2 = React.useMemo(() => {
    if (isLoading) {
      return Array(4).fill({ label: "Loading...", value: "Loading..." });
    }

    if (isError) {
      return [
        { label: "Error", value: error.message || "Failed to load tax data" },
      ];
    }

    if (!tax) {
      return [{ label: "No Data", value: "Tax information not available." }];
    }

    return [
      {
        label: "Taxable Income",
        value: tax.taxable_income,
        icon: <UsergroupAddOutlined className="text-3xl text-blue-500" />,
        bgColor: "bg-blue-100",
        textColor: "text-blue-600",
      },
      {
        label: "Income Tax",
        value: tax.income_tax,
        icon: <BookOutlined className="text-3xl text-yellow-500" />,
        bgColor: "bg-yellow-100",
        textColor: "text-yellow-600",
      },
      {
        label: "Employer Pension Contribution",
        value: tax.employer_pension_contribution,
        icon: <SwapRightOutlined className="text-3xl text-green-500" />,
        bgColor: "bg-green-100",
        textColor: "text-green-600",
      },
      {
        label: "Employee Pension Contribution",
        value: tax.employee_pension_contribution,
        icon: <MessageOutlined className="text-3xl text-purple-500" />,
        bgColor: "bg-purple-100",
        textColor: "text-purple-600",
      },
    ];
  }, [tax, isLoading, isError, error]);

  function handleLoanForm(values) {
    // const startDateFormatted = moment(values.Deduction_Start_Date).format(
    //   "YYY-MM-DD"
    // );

    const payload = {
      tin_number: record.tinNumber,
      Loan_Amount: values.Loan_Amount,
      Loan_Deduction_Per_Month: values.Loan_Deduction_Per_Month,
      Deduction_Start_Date: values.Deduction_Start_Date,
    };

    mutate(payload);
  }

  const {
    mutate: refreshPayrollMutate,
    isLoading: isRefreshPayrollLoading,
    // isError: isRefreshPayrollError,
    // error: refreshPayrollError,
  } = useMutation({
    mutationFn: () => refreshPayroll(record?.tinNumber),
    onSuccess: () => {
      message.success("Payroll refreshed successfully!");
      refetch();
      refetchTax();
    },
    onError: (error) => {
      message.error("Failed to refresh payroll: " + error.message);
      console.error("Error refreshing payroll:", error);
    },
  });

  const handleRefreshPayroll = () => {
    refreshPayrollMutate();
  };

  const dataSource = data?.payrolls?.map((payroll, index) => ({
    key: index,
    employee_tin: payroll.employee_tin,
    payroll_date: new Date(payroll.payroll_date).toLocaleDateString(),
    gross_earning: payroll.gross_earning,
    taxable_income: payroll.taxable_income,
    income_tax: payroll.income_tax,
    employer_pension_contribution: payroll.employer_pension_contribution,
    employee_pension_contribution: payroll.employee_pension_contribution,
    loan_deductions: payroll.loan_deductions,
    food_deduction: payroll.food_deduction,
    penalty_deductions: payroll.penalty_deductions,
    net_pay: payroll.net_pay,
    bank_account: payroll.bank_account,
  }));

  const buttonStyle = { size: "medium", type: "primary" };

  const handleDownload = () => {
    pdfFormatter(record, format);
  };

 
  const { mutate:emailMutate } = useMutation({
    mutationFn: sendEmailToEmployee,
    onSuccess: () => {
      message.success("Email sent successfully!");
    },
    onError: (error) => {
      message.error("Failed to send email: " + error.message);
      console.error("Mutation error:", error);
    },
  });

  const sendEmail = () => {

    if (!record?.name || !record?.email) {
      message.error("Employee name and email are required!");
      return;
    }

    emailMutate({ name: record?.name, email: record?.email, tinNumber:record?.tinNumber  });
  };

  return (
    <div className="items-center justify-center bg-gray-100 p-2">
      <Row gutter={[16, 16]}>
        {/* Employee Profile Column */}
        <Col xs={24} sm={24} md={6}>
          <Card className="shadow-md rounded-xl bg-gray-200 h-55">
            <div className="flex items-center gap-4">
              <Avatar size={64} src={user} />
              <div>
                <h2 className="font-semibold text-lg">
                  {record?.name}
                </h2>
                <p className="text-gray-500 text-sm">
                  Email: {record?.email}
                </p>
                <p className="text-gray-500 text-sm">
                  Tin Number : {record?.tinNumber}
                </p>
              </div>
            </div>
          </Card>
        </Col>

        {/* Report Cards Column */}
        <Col xs={24} sm={24} md={18} className="justify-end">
          <ReportCards reportData={reportData2} />
        </Col>
      </Row>

      <div className="bg-white shadow-md mt-10 p-4">
        <Row gutter={[16, 16]} align="middle">
          {/* File Export Buttons (Left Side) */}
          <Col>
            <Button
              {...buttonStyle}
              icon={<FileExcelOutlined />}
              style={{ backgroundColor: "#28a745", borderColor: "#28a745" }}
              key="excel"
              onClick={handleDownload}
            >
              Excel
            </Button>
          </Col>
          <Col>
            <Button
              {...buttonStyle}
              icon={<FilePdfOutlined />}
              style={{ backgroundColor: "#dc3545", borderColor: "#dc3545" }}
              onClick={handleDownload}
            >
              PDF
            </Button>
          </Col>
          <Col>
            <Button
              {...buttonStyle}
              icon={<FileWordOutlined />}
              style={{ backgroundColor: "#007bff", borderColor: "#007bff" }}
              onClick={handleDownload}
            >
              Word
            </Button>
          </Col>
          <Col>
            <Button
              {...buttonStyle}
              icon={<MailOutlined />}
              style={{ backgroundColor: "#6c757d", borderColor: "#6c757d" }}
              onClick={sendEmail}
            >
              Send Email
            </Button>
          </Col>

          {/* Refresh Button (Right Side) */}
          <Col flex="auto" style={{ textAlign: "right" }}>
            <Button
              className="mb-10"
              color="default"
              variant="solid"
              onClick={handleRefreshPayroll}
              disabled={isRefreshPayrollLoading}
            >
              <ReloadOutlined spin={isRefreshPayrollLoading} />
              Refresh table
            </Button>
          </Col>
        </Row>
        <Table dataSource={dataSource}>
          <Column
            title="Gross Earning"
            dataIndex="gross_earning"
            key="gross_earning"
          />
          <Column
            title="Taxable Income"
            dataIndex="taxable_income"
            key="taxable_income"
          />

          <Column title="Income Tax" dataIndex="income_tax" key="income_tax" />
          <Column
            title="Employer Pension Contribution"
            dataIndex="employer_pension_contribution"
            key="employer_pension_contribution"
          />
          <Column
            title="Employee Pension Contribution"
            dataIndex="employee_pension_contribution"
            key="employee_pension_contribution"
          />
          <Column
            title="Loan Deductions"
            dataIndex="loan_deductions"
            key="loan_deductions"
            render={(value) => (value ? `- ${value}` : "-")}
          />
          <Column
            title="Food Deduction"
            dataIndex="food_deduction"
            key="food_deduction"
          />
          <Column
            title="Penalty Deductions"
            dataIndex="penalty_deductions"
            key="penalty_deductions"
          />
          <Column title="Net Pay" dataIndex="net_pay" key="net_pay" />
          <Column
            title="Actions"
            render={(_, record) => (
              <Button
                onClick={handleRefreshPayroll}
                color="danger"
                variant="solid"
              >
                <DeleteOutlined />
              </Button>
            )}
          />
        </Table>
      </div>

      {/* <div className="bg-white shadow-md mt-10"> */}
      <Row gutter={24}>
        <Col span={12}>
          <div className="bg-white shadow-md p-6 mt-10 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Add Loan</h2>

            <Form name="addLoan" layout="vertical" onFinish={handleLoanForm}>
              <Form.Item
                label="Loan Amount"
                name="Loan_Amount"
                rules={[
                  { required: true, message: "Please enter loan amount" },
                ]}
              >
                <InputNumber className="w-full" min={1} />
              </Form.Item>

              <Form.Item
                label="Loan Deduction Per Month"
                name="Loan_Deduction_Per_Month"
                rules={[{ required: true, message: "Enter deduction amount" }]}
              >
                <InputNumber className="w-full" min={1} />
              </Form.Item>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label="Deduction Start Date"
                    name="Deduction_Start_Date"
                    rules={[{ required: true, message: "Select start date" }]}
                  >
                    <DatePicker className="w-full" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Deduction End Date"
                    name="Deduction_End_Date"
                  >
                    <DatePicker className="w-full" disabled />
                  </Form.Item>
                </Col>
              </Row>

              <Button
                color="default"
                variant="solid"
                className="py-3 px-4"
                type="primary"
                htmlType="submit"
              >
                Add Loan
              </Button>
            </Form>
            {isError && (
              <ErrorBlock
                title="Submission Failed"
                message={
                  error?.response?.data?.message ||
                  "Failed to add loan. Please try again."
                }
              />
            )}
            {isPending && (
              <Card>
                <Spin /> Loading ...
              </Card>
            )}
          </div>
        </Col>

        <Col span={12}>
          <div className="bg-white shadow-md p-6 mt-10 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Loan Monthly Deduction</h2>
            <Table dataSource={loanHistory} pagination={{ pageSize: 5 }}>
              <Column
                title="Loan Amount"
                dataIndex="Loan_Amount"
                key="Loan_Amount"
              />
              <Column
                title="Monthly Deduction"
                dataIndex="Loan_Deduction_Per_Month"
                key="Loan_Deduction_Per_Month"
              />
              <Column
                title="Start Date"
                dataIndex="Deduction_Start_Date"
                key="Deduction_Start_Date"
                render={(date) => moment(date).format("DD-MM-YYYY")}
              />
              <Column
                title="End Date"
                dataIndex="Deduction_End_Date"
                key="Deduction_End_Date"
                render={(date) => moment(date).format("DD-MM-YYYY")}
              />
            </Table>
          </div>
        </Col>
      </Row>
      {/* </div> */}
    </div>
  );
}

export default Payroll;
