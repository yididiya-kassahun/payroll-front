import React, { useEffect } from "react";
import { Button, Col, Drawer, Form, Input, Row, message } from "antd";
import { useMutation } from "@tanstack/react-query";
import { updateRates } from "../../services/settingService";

const EditRate = ({ open, onClose, record, refetch }) => {
  const [form] = Form.useForm();

  const mutation = useMutation({
    mutationFn: updateRates,
    onSuccess: () => {
      message.success("Rate record updated successfully!");
      onClose();
      refetch(); 
    },
    onError: (error) => {
      message.error(`Failed to update rate: ${error.message}`);
    },
  });

  useEffect(() => {
    if (record) {
      form.setFieldsValue({
        Rate_Name: record.Rate_Name,
        Overtime_Rate: record.Overtime_Rate,
      });
    }
  }, [form, record]);

  const onFinish = (values) => {
    mutation.mutate({ id: record.id, ...values });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Drawer width={500} title="Edit Rate Record" onClose={onClose} open={open}>
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
              name="Rate_Name" 
              label="Rate Name"
              rules={[{ required: true, message: "Rate Name is required" }]}
            >
              <Input placeholder="Enter Rate Name" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="Overtime_Rate"
              label="Overtime Rate"
            >
              <Input placeholder="Enter Overtime Rate" />
            </Form.Item>
          </Col>
        </Row>

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
  );
};

export default EditRate;
