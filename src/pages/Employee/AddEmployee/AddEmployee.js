import {
  Modal,
  Form,
  Input,
  InputNumber,
  Button,
  Row,
  Col,
  message,
} from "antd";
import { addEmployee } from "../../../services/employeeService";
import { useMutation } from "@tanstack/react-query";

const AddEmployee = ({ isModalOpen, handleOk, handleCancel }) => {
  const [form] = Form.useForm();

  const { mutate } = useMutation({
    mutationFn: addEmployee,
    onSuccess: (data) => {
      message.success("Employee record added!");
      form.resetFields();
      handleOk();
      window.location.reload();
    },
    onError: (error) => {
      message.error("Employee already exist");
      console.log("Mutation error:", error.message);
      handleCancel();
    },
  });

  const handleFinish = (values) => {
    console.log("Form values:", values);
    mutate(values);
  };

  return (
    <Modal
      title="Employee Record"
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
      className="rounded-lg"
    >
      <hr />
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        className="space-y-4 mt-10"
      >
        <Form.Item
          name="Employee_Email"
          label="Employee Email"
          rules={[{ required: true, message: "Email is required" }]}
        >
          <Input placeholder="Enter Employee Email Address" />
        </Form.Item>
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

        <div className="flex justify-end gap-2">
          <Button onClick={handleCancel}>Cancel</Button>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default AddEmployee;
