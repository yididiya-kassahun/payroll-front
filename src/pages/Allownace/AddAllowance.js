import {
  Modal,
  Form,
  Input,
  InputNumber,
  DatePicker,
  Button,
  Row,
  Col,
  Select,
} from "antd";

const { Option } = Select;

const AddAllowance = ({ isModalOpen, handleOk, handleCancel }) => {
  const [form] = Form.useForm();

  const handleFinish = (values) => {
    console.log("Form values:", values);
    form.resetFields();
  };

  return (
    <Modal
      title="Employee Allowance Form"
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
        <Form.Item name="tin_number" label="Select Tin Number">
          <Select>
            <Option>123231</Option>
            <Option>123231</Option>
            <Option>123231</Option>
            <Option>123231</Option>
          </Select>
        </Form.Item>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="Non_Taxable_Allowance"
              label="Non-Taxable Allowance"
              rules={[
                { type: "number", min: 0, message: "Must be zero or positive" },
              ]}
            >
              <InputNumber
                className="w-full"
                placeholder="Enter Non-Taxable Allowance"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="Taxable_Allowance"
              label="Taxable Allowance"
              rules={[
                { type: "number", min: 0, message: "Must be zero or positive" },
              ]}
            >
              <InputNumber
                className="w-full"
                placeholder="Enter Taxable Allowance"
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="Overtime_Hours"
              label="Overtime Hours"
              rules={[
                { type: "number", min: 0, message: "Must be zero or positive" },
              ]}
            >
              <InputNumber
                className="w-full"
                step={0.1}
                placeholder="Enter Overtime Hours"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="Sales_Commission_Allowance"
              label="Sales Commission Allowance"
              rules={[
                { type: "number", min: 0, message: "Must be zero or positive" },
              ]}
            >
              <InputNumber
                className="w-full"
                placeholder="Enter Sales Commission Allowance"
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="Night_Working_Hours"
              label="Night Working Hours"
              rules={[
                { type: "number", min: 0, message: "Must be zero or positive" },
              ]}
            >
              <InputNumber
                className="w-full"
                step={0.1}
                placeholder="Enter Night Working Hours"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="Sunday_Working_Hours"
              label="Sunday Working Hours"
              rules={[
                { type: "number", min: 0, message: "Must be zero or positive" },
              ]}
            >
              <InputNumber
                className="w-full"
                step={0.1}
                placeholder="Enter Sunday Working Hours"
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name="Holiday_Working_Hours"
          label="Holiday Working Hours"
          rules={[
            { type: "number", min: 0, message: "Must be zero or positive" },
          ]}
        >
          <InputNumber
            className="w-full"
            step={0.1}
            placeholder="Enter Holiday Working Hours"
          />
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

export default AddAllowance;
