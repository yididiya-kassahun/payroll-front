import React, { useState } from "react";
import {
  AuditOutlined,
  DashboardOutlined,
  FormOutlined,
  KeyOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
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
              icon: <FormOutlined />,
              label: "Employee Allowance",
              onClick: () => {
                navigate("/allowance");
              },
            },
            {
              key: "4",
              icon: <SettingOutlined />,
              label: "Setting",
              onClick: () => {
                navigate("/setting");
              },
            },
            {
              key: "5",
              icon: <KeyOutlined />,
              label: "Account",
              onClick: () => {
                navigate("/account");
              },
            },
            {
              key: "6",
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
