import React, { useState } from "react";
import {
  AuditOutlined,
  BarChartOutlined,
  DashboardOutlined,
  KeyOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import Logo from "../../assets/logo/logo.jpg"

const { Header, Sider, Content } = Layout;

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout className="min-h-screen flex">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <h2 className="text-2xl font-bold text-white flex items-center justify-between p-5">
          {/* <img src={Logo} width={30} height={30} alt="Logo" className="mr-2" /> */}
          Kerchanshe
        </h2>

        <Menu
          theme="dark"
          mode="inline"
          className="mt-10"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <DashboardOutlined />,
              label: "Dashboard",
              onClick: () => {
                navigate("/home");
              },
            },
            {
              key: "2",
              icon: <DashboardOutlined />,
              label: "Employee Management",
              onClick: () => {
                navigate("/employee");
              },
            },
            {
              key: "3",
              icon: <VideoCameraOutlined />,
              label: "Payroll Calculation",
              onClick: () => {
                navigate("/payroll");
              },
            },
            {
              key: "4",
              icon: <UserOutlined />,
              label: "Loan Management",
            },
            {
              key: "5",
              icon: <AuditOutlined />,
              label: "Taxation & Pension",
            },
            {
              key: "6",
              icon: <BarChartOutlined />,
              label: "Report",
            },
            {
              key: "7",
              icon: <KeyOutlined />,
              label: "Account",
              onClick: () => {
                navigate("/account");
              },
            },
            {
              key: "8",
              icon: <LogoutOutlined />,
              label: "Logout",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            // background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default Dashboard;
