import React, { useState } from "react";
import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  InputNumber,
  Row,
} from "antd";

const EditEmployee = ({ open, onClose }) => {
  const [form] = Form.useForm();
  const [loanAmount, setLoanAmount] = useState(0);

  return (
    <>
      <Drawer
        width={500}
        title="Edit Employee Record"
        onClose={onClose}
        open={open}
      >
        <Form form={form} layout="vertical" className="space-y-4">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="Employee_TIN"
                label="Employee TIN"
                rules={[{ required: true, message: "TIN is required" }]}
              >
                <Input placeholder="Enter unique Employee TIN" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="Employee_Name" label="Employee Name">
                <Input placeholder="Enter Employee Name" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="Basic_Salary"
                label="Basic Salary"
                rules={[
                  {
                    type: "number",
                    min: 1,
                    message: "Must be a positive number",
                  },
                ]}
              >
                <InputNumber
                  className="w-full"
                  placeholder="Enter Basic Salary"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="Food_Deduction"
                label="Food Deduction"
                initialValue={0}
              >
                <InputNumber
                  className="w-full"
                  min={0}
                  placeholder="Enter Food Deduction"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="Penalty" label="Penalty" initialValue={0}>
                <InputNumber
                  className="w-full"
                  min={0}
                  placeholder="Enter Penalty Amount"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="Loan_Amount"
                label="Loan Amount"
                initialValue={0}
              >
                <InputNumber
                  className="w-full"
                  min={0}
                  placeholder="Enter Loan Amount"
                  onChange={(value) => setLoanAmount(value)}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="Loan_Deduction_Per_Month"
                label="Loan Deduction Per Month"
                initialValue={0}
              >
                <InputNumber
                  className="w-full"
                  min={0}
                  disabled={loanAmount === 0}
                  placeholder="Enter Monthly Deduction"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="Deduction_Start_Date"
                label="Deduction Start Date"
              >
                <DatePicker className="w-full" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="Deduction_End_Date" label="Deduction End Date">
                <DatePicker className="w-full" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="Number_of_Working_Days"
                label="Number of Working Days"
                initialValue={30}
              >
                <InputNumber
                  className="w-full"
                  min={1}
                  placeholder="Enter Working Days"
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item name="Bank_Account" label="Bank Account">
            <Input placeholder="Enter Bank Account Number" />
          </Form.Item>

          <div className="flex justify-end gap-2 mt-10">
            <Button className="py-6 px-8">Cancel</Button>
            <Button
              color="default"
              variant="solid"
              className="py-6 px-8"
              htmlType="submit"
            >
              Update
            </Button>
          </div>
        </Form>
      </Drawer>
    </>
  );
};
export default EditEmployee;
