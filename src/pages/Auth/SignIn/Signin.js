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
  Spin,
} from "antd";
import coverImg from "../../../assets/imgs/cover1.jpg";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { signin } from "../../../services/authService";
import ErrorBlock from "../../../components/UI/ErrorBlock";

const { Title, Text } = Typography;

function Signin() {
  const navigate = useNavigate();

  const { mutate, isError, error, isLoading, isPending } = useMutation({
    mutationFn: signin,
    onSuccess: async (data) => {
      const token = data?.token;

      if (token) {
        localStorage.setItem("authToken", token);
        navigate("/home");
      } else {
        console.error("Auth failed");
        //navigate(-1);
      }
    },
    onError: (err) => {
      console.error("Login failed:", err);
    },
  });

  const handleFinish = (values) => {
    mutate(values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
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
                    Sign In
                  </Title>
                  <Form
                    name="signin"
                    layout="vertical"
                    initialValues={{ remember: true }}
                    onFinish={handleFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    style={{width:"260px"}}
                  >
                    <Form.Item
                      label="Email"
                      name="email"
                      rules={[
                        { required: true, message: "Please input your email!" },
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
                    >
                      <Input.Password placeholder="Enter your password" />
                    </Form.Item>

                    <Form.Item name="remember" valuePropName="checked">
                      <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item>
                      <Button
                        type="primary"
                        color="default"
                        variant="solid"
                        className="py-5"
                        htmlType="submit"
                        loading={isLoading}
                        block
                      >
                        Sign In
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
                  Don't have an account? <a href="/signup">Sign up</a>
                </Text>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default Signin;
