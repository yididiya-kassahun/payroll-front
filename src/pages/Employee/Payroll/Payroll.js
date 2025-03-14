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
import { addLoan } from "../../../services/employeeService";
import { useMutation } from "@tanstack/react-query";
import ErrorBlock from "../../../components/UI/ErrorBlock";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment/moment";

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

  const reportData = [
    {
      label: "Taxable Income",
      value: "3882",
      icon: <UsergroupAddOutlined className="text-3xl text-blue-500" />,
      bgColor: "bg-blue-100",
      textColor: "text-blue-600",
    },
    {
      label: "Income Tax",
      value: "532",
      icon: <BookOutlined className="text-3xl text-yellow-500" />,
      bgColor: "bg-yellow-100",
      textColor: "text-yellow-600",
    },
    {
      label: "Employer Pension Contribution",
      value: "12.6%",
      icon: <SwapRightOutlined className="text-3xl text-green-500" />,
      bgColor: "bg-green-100",
      textColor: "text-green-600",
    },
    {
      label: "Employee Pension Contribution",
      value: "440",
      icon: <MessageOutlined className="text-3xl text-purple-500" />,
      bgColor: "bg-purple-100",
      textColor: "text-purple-600",
    },
  ];

  const payrollData = [
    {
      key: "1",
      Gross_Earning: "31231",
      Taxable_Income: "2300",
      Income_Tax: "3200",
      Employer_Pension_Contribution: "10",
      Employee_Pension_Contribution: "54",
      Loan_Deductions: "1200",
      Food_Deduction: "32",
      Penalty_Deductions: "12",
      Net_Pay: "2",
    },
    {
      key: "2",
      Gross_Earning: "31231",
      Taxable_Income: "2300",
      Income_Tax: "3200",
      Employer_Pension_Contribution: "10",
      Employee_Pension_Contribution: "54",
      Loan_Deductions: "1200",
      Food_Deduction: "32",
      Penalty_Deductions: "12",
      Net_Pay: "2",
    },
    {
      key: "3",
      Gross_Earning: "31231",
      Taxable_Income: "2300",
      Income_Tax: "3200",
      Employer_Pension_Contribution: "10",
      Employee_Pension_Contribution: "54",
      Loan_Deductions: "1200",
      Food_Deduction: "32",
      Penalty_Deductions: "12",
      Net_Pay: "2",
    },
  ];

  function handleLoanForm(values) {
    const startDateFormatted = moment(values.Deduction_Start_Date).format("YYY-MM-DD");

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

      <div className="bg-white shadow-md mt-10">
        <Table dataSource={payrollData}>
          <Column
            title="Gross Earning"
            dataIndex="Gross_Earning"
            key="Gross_Earning"
          />
          <Column
            title="Taxable Income"
            dataIndex="Taxable_Income"
            key="Taxable_Income"
          />

          <Column title="Income Tax" dataIndex="Income_Tax" key="Income_Tax" />
          <Column
            title="Employer Pension Contribution"
            dataIndex="Employer_Pension_Contribution"
            key="Employer_Pension_Contribution"
          />
          <Column
            title="Employee Pension Contribution"
            dataIndex="Employee_Pension_Contribution"
            key="Employee_Pension_Contribution"
          />
          <Column
            title="Loan Deductions"
            dataIndex="Loan_Deductions"
            key="Loan_Deductions"
          />
          <Column
            title="Food Deduction"
            dataIndex="Food_Deduction"
            key="Food_Deduction"
          />
          <Column
            title="Penalty Deductions"
            dataIndex="Penalty_Deductions"
            key="Penalty_Deductions"
          />
          <Column title="Net Pay" dataIndex="Net_Pay" key="Net_Pay" />
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
            <Table pagination={{ pageSize: 5 }}>
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
                render={(date) => date.toString()}
              />
              <Column
                title="End Date"
                dataIndex="Deduction_End_Date"
                key="Deduction_End_Date"
                render={(date) => date.toString()}
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
