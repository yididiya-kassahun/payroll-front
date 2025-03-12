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
} from "antd";
import farmImage from "../../../assets/logo/logo.jpg";

const { Title, Text } = Typography;

const onFinish = (values) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const Signin = () => (
  <Row
    justify="center"
    align="middle"
    style={{ minHeight: "100vh", backgroundColor: "#f0f2f5", padding: "20px" }}
  >
    <Col xs={24} sm={20} md={16} lg={12} xl={10}>
      <Card
        bordered={false}
        style={{ borderRadius: "12px", overflow: "hidden" }}
      >
        <Row gutter={[16, 16]}>
          {/* Left Side - Image */}
          <Col xs={0} md={10}>
            <Card
              bordered={false}
              style={{
                height: "100%",
                overflow: "hidden",
                boxShadow: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              cover={
                <img
                  src={farmImage}
                  alt="Signin Illustration"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover", // Ensures the image covers the card without distortion
                    borderRadius: "8px",
                  }}
                />
              }
            />
          </Col>

          {/* Right Side - Form */}
          <Col xs={24} md={14}>
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
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
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
                  { required: true, message: "Please input your password!" },
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
                  block
                >
                  Sign In
                </Button>
              </Form.Item>
            </Form>
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
);

export default Signin;
