import React, { useEffect } from "react";
import {
  Button,
  Col,
  Drawer,
  Form,
  Input,
  InputNumber,
  Row,
  message,
} from "antd";
import { useMutation } from "@tanstack/react-query";
import { updateEmployee } from "../../../services/employeeService";  

const EditEmployee = ({ open, onClose, record }) => {
  const [form] = Form.useForm();
  console.log("record", record);

  const mutation = useMutation({
    mutationFn: updateEmployee,
    onSuccess: () => {
      message.success("Employee record updated successfully!");
      onClose(); 
    },
    onError: (error) => {
      message.error(`Failed to update employee: ${error.message}`);
    },
  });

  useEffect(() => {
    if (record) {
      form.setFieldsValue({
        Employee_TIN: record.tinNumber,
        Employee_Name: record.name,
        Basic_Salary: record.salary,
        Penality: record.Penality,
        Food_Deduction: record.Food_Deduction,
        Number_of_Working_Days: record.Number_of_Working_Days,
        Bank_Account: record.bankAccount,
      });
    }
  }, [form, record]);

  const onFinish = (values) => {
    mutation.mutate(values); 
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Drawer
        width={500}
        title="Edit Employee Record"
        onClose={onClose}
        open={open}
      >
        <Form
          form={form}
          layout="vertical"
          className="space-y-4"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
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
              <Form.Item name="Basic_Salary" label="Basic Salary">
                <InputNumber
                  className="w-full"
                  placeholder="Enter Basic Salary"
                  min={1}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="Food_Deduction" label="Food Deduction">
                <InputNumber
                  className="w-full"
                  placeholder="Enter Food Deduction"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="Penality" label="Penality">
                <InputNumber
                  className="w-full"
                  placeholder="Enter Penality Amount"
                />
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
            <Button onClick={onClose} className="py-6 px-8">
              Cancel
            </Button>
            <Button
              color="default"
              variant="solid"
              className="py-6 px-8"
              htmlType="submit"
              loading={mutation.isLoading}
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
