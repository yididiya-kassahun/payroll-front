import React from "react";
import {
  UsergroupAddOutlined,
  BookOutlined,
  SwapRightOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import {
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
import { addLoan, fetchAllowance, fetchLoanHistory, fetchTaxes } from "../../../services/employeeService";
import { useMutation, useQuery } from "@tanstack/react-query";
import ErrorBlock from "../../../components/UI/ErrorBlock";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment/moment";
import { fetchPayroll } from "../../../services/payrollService";

const { Column } = Table;

function Payroll() {
  const navigate = useNavigate();
  const location = useLocation();
  // const { id } = useParams();
  const [form] = Form.useForm();

  const { record } = location.state || {};

  const { mutate, isError, isPending, error } = useMutation({
    mutationFn: addLoan,
    onSuccess: (data) => {
      message.success("Load added successfully!");
      form.resetFields();
    },
    onError: (error) => {
      message.error("Failed to add load data: " + error.message);
      console.log("Mutation error:", error.message);
    },
  });

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["payroll", record?.tinNumber],
    queryFn: () => fetchPayroll(record.tinNumber),
    keepPreviousData: true,
    staleTime: 5000,
    enabled: !!record?.tinNumber,
  });

   const { data: loanData } = useQuery({
     queryKey: ["loan", record?.tinNumber],
     queryFn: () => fetchLoanHistory(record.tinNumber),
     keepPreviousData: true,
     staleTime: 5000,
     enabled: !!record?.tinNumber,
   });

    const { data: taxData } = useQuery({
      queryKey: ["tax", record?.tinNumber],
      queryFn: () => fetchTaxes(record.tinNumber),
      keepPreviousData: true,
      staleTime: 5000,
      enabled: !!record?.tinNumber,
    });

  const payrollData = data?.payroll ? [data.payroll] : [];
  const loanHistory = loanData?.loan ? [loanData.loan] : [];
  const tax = taxData?.tax;

  console.log(loanData);

  const reportData = [
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

  function handleLoanForm(values) {
    const startDateFormatted = moment(values.Deduction_Start_Date).format(
      "YYY-MM-DD"
    );

    const payload = {
      tin_number: record.tinNumber,
      Loan_Amount: values.Loan_Amount,
      Loan_Deduction_Per_Month: values.Loan_Deduction_Per_Month,
      Deduction_Start_Date: startDateFormatted,
    };

    mutate(payload);
  }

  return (
    <div className="items-center justify-center bg-gray-100 p-2">
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

      <div className="bg-white shadow-md mt-10 p-4">
        <Table dataSource={payrollData}>
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
            <h2 className="text-xl font-bold mb-4">Loan Payment History</h2>
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
