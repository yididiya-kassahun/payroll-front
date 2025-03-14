import React from "react";
import {
  Button,
  Checkbox,
  Form,
  Input,
  Card,
  Row,
  Col,
  Typography,
  message,
  Spin,
} from "antd";
import { useNavigate } from "react-router-dom";
import farmImage from "../../../assets/logo/logo.jpg";
import { signup } from "../../../services/authService";
import { useMutation } from "@tanstack/react-query";
import ErrorBlock from "../../../components/UI/ErrorBlock";
import coverImg from "../../../assets/imgs/cover1.jpg";

const { Title, Text } = Typography;

function Signup() {
  const navigate = useNavigate();

  const { mutate, isError, isPending, error } = useMutation({
    mutationFn: signup,
    onSuccess: (data) => {
      message.success("Signup success!");
      navigate("/signin");
    },
    onError: (error) => {
      message.error("Failed to signup: " + error.message); 
      console.log("Mutation error:", error.message);
    },
  });

  const handleFinish = (values) => {
    const { username, email, password } = values;
    mutate({ username, email, password }); 
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const validateConfirmPassword = ({ getFieldValue }) => ({
    validator({ field }, value) {
      if (!value || getFieldValue("password") === value) {
        return Promise.resolve();
      }
      return Promise.reject(
        new Error("The two passwords that you entered do not match!")
      );
    },
  });

  return (
    <Row
      justify="center"
      align="middle"
      className="min-h-screen bg-gray-100 p-2"
    >
      <Col xs={24} sm={20} md={16} lg={12} xl={10}>
        <Card
          className="rounded-lg overflow-hidden shadow-md"
          bordered={false}
          bodyStyle={{ padding: 0 }}
        >
          <Row gutter={0}>
            {/* Left Side - Image */}
            <Col
              xs={0}
              md={12}
              className="hidden sm:flex items-center justify-center bg-gray-200"
              style={{
                height: "100%",
                overflow: "hidden",
                borderTopLeftRadius: "12px",
                borderBottomLeftRadius: "12px",
              }}
            >
              <img
                src={coverImg}
                alt="Signin Illustration"
                className="w-full h-full object-cover"
              />
            </Col>

            {/* Right Side - Form */}
            <Col xs={24} md={12} className="p-6">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  minHeight: "550px",
                  width: "100%",
                  // maxWidth: "500px",
                }}
              >
                <Title
                  level={3}
                  style={{ textAlign: "center", marginBottom: "16px" }}
                >
                  Sign Up
                </Title>

                <Form
                  name="signup"
                  layout="vertical"
                  initialValues={{ remember: true }}
                  onFinish={handleFinish}
                  onFinishFailed={onFinishFailed}
                  autoComplete="off"
                  style={{ width: "260px" }}
                >
                  <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                      {
                        required: true,
                        message: "Please input your username!",
                      },
                    ]}
                  >
                    <Input placeholder="Enter your username" />
                  </Form.Item>
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      { required: true, message: "Please input your email!" },
                      { type: "email", message: "Please enter a valid email!" },
                    ]}
                  >
                    <Input placeholder="Enter your email" />
                  </Form.Item>

                  <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                    ]}
                    hasFeedback
                  >
                    <Input.Password placeholder="Enter your password" />
                  </Form.Item>

                  <Form.Item
                    label="Confirm Password"
                    name="confirmPassword"
                    dependencies={["password"]}
                    rules={[
                      {
                        required: true,
                        message: "Please confirm your password!",
                      },
                      validateConfirmPassword,
                    ]}
                    hasFeedback
                  >
                    <Input.Password placeholder="Confirm your password" />
                  </Form.Item>

                  <Form.Item>
                    <Button
                      type="primary"
                      color="default"
                      variant="solid"
                      className="py-5"
                      htmlType="submit"
                      block
                      disabled={isPending}
                    >
                      Sign Up
                    </Button>
                  </Form.Item>
                </Form>
              </div>
              {isError && (
                <ErrorBlock
                  title="Unauthorized"
                  message={
                    error?.response?.data?.message ||
                    "Failed to login. Please check your credentials."
                  }
                />
              )}
              {isPending && (
                <Card>
                  <Spin /> Loading ...
                </Card>
              )}
              <Text
                type="secondary"
                style={{ display: "block", textAlign: "center" }}
              >
                Do you have an account? <a href="/signin">Sign in</a>
              </Text>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
}

export default Signup;
