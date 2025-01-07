import React, { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarPlus,
  faUserPlus,
  faStore,
} from "@fortawesome/free-solid-svg-icons";
import { router } from "@inertiajs/react";

const { Header, Content, Sider } = Layout;

export default function AdminLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const navItems = [
    {
      key: "1",
      icon: <FontAwesomeIcon icon={faCalendarPlus} />,
      label: "Event",
      route: "event",
    },
    {
      key: "2",
      icon: <FontAwesomeIcon icon={faUserPlus} />,
      label: "User",
      route: "register",
    },
    {
      key: "3",
      icon: <FontAwesomeIcon icon={faStore} />,
      label: "Merch",
      route: "dashboard",
    },
  ];

  const selectedKey = navItems.find((item) => route().current(item.route))?.key;

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedKey]}
          items={navItems.map((item) => ({
            ...item,
            onClick: () => router.get(route(item.route)),
          }))}
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
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            minHeight: 564,
          }}
          className="min-h-full"
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
