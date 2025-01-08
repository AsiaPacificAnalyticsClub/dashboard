import React, { useState } from "react";
import Dropdown from "@/Components/Dropdown";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarPlus,
  faUserPlus,
  faStore,
} from "@fortawesome/free-solid-svg-icons";
import { router, usePage } from "@inertiajs/react";

const { Header, Content, Sider } = Layout;

export default function AdminLayout({ children }) {
  const user = usePage().props.auth.user;

  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const navItems = [
    {
      key: "1",
      icon: <FontAwesomeIcon icon={faCalendarPlus} />,
      label: "Event",
      route: "events.index",
      routeGroup: "events",
    },
    {
      key: "2",
      icon: <FontAwesomeIcon icon={faUserPlus} />,
      label: "User",
      route: "register",
      routeGroup: "register",
    },
    {
      key: "3",
      icon: <FontAwesomeIcon icon={faStore} />,
      label: "Merch",
      route: "merch.index",
      routeGroup: "merch",
    },
  ];

  const selectedKey =
    navItems.find((item) => {
      const currentRoute = route().current();
      return currentRoute.startsWith(item.routeGroup);
    })?.key || "1";

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
          className="flex justify-between items-center"
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
          <div className="hidden sm:ms-6 sm:flex sm:items-center right-0">
            <div className="ms-3">
              <Dropdown>
                <Dropdown.Trigger>
                  <span className="inline-flex rounded-md">
                    <button
                      type="button"
                      className="inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none"
                    >
                      {user.name}

                      <svg
                        className="-me-0.5 ms-2 h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </span>
                </Dropdown.Trigger>

                <Dropdown.Content>
                  <Dropdown.Link href={route("profile.edit")}>
                    Profile
                  </Dropdown.Link>
                  <Dropdown.Link
                    href={route("logout")}
                    method="post"
                    as="button"
                  >
                    Log Out
                  </Dropdown.Link>
                </Dropdown.Content>
              </Dropdown>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            minHeight: "100vh",
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
