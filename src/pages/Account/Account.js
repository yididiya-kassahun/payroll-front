import React from "react";
import { useMutation } from "@tanstack/react-query";
import { Form, Input, Button, message } from "antd";
import { changePassword } from "../../services/authService";

const Account = () => {
  const [form] = Form.useForm();

  const mutation = useMutation({
    mutationFn: changePassword,
    onSuccess: (data) => {
      message.success("Password changed successfully");
      form.resetFields();
      console.log(data);
    },
    onError: (error) => {
      message.error(
        error.response?.data?.message || "Failed to change password"
      );
      console.log(error);
    },
  });

  const handleFinish = (values) => {
    const { confirmNewPassword, ...data } = values;
    mutation.mutate(data);
  };

  return (
    <div className="justify-start min-h-screen p-2">
      <div className="w-full bg-white max-w-md p-6 rounded-lg shadow-md ">
        <h2 className="text-xl font-semibold text-center mb-4">
          Change Password
        </h2>
        <Form form={form} layout="vertical" onFinish={handleFinish}>
          <Form.Item
            label="Old Password"
            name="old_password"
            rules={[
              { required: true, message: "Please enter your old password" },
            ]}
          >
            <Input.Password className="py-2 w-full" />
          </Form.Item>

          <Form.Item
            label="New Password"
            name="new_password"
            rules={[
              { required: true, message: "Please enter a new password" },
              { min: 8, message: "Password must be at least 8 characters" },
              {
                pattern: /[!@#$%^&*(),.?":{}|<>]/,
                message: "Password must include at least one special character",
              },
            ]}
          >
            <Input.Password className="py-2 w-full" />
          </Form.Item>

          <Form.Item
            label="Confirm New Password"
            name="confirmNewPassword"
            dependencies={["new_password"]}
            rules={[
              { required: true, message: "Please confirm your new password" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("new_password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords do not match"));
                },
              }),
            ]}
          >
            <Input.Password className="py-2 w-full" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={mutation.isLoading}
              color="default"
              variant="solid"
              className="w-full py-5 mt-2"
            >
              Change Password
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Account;
