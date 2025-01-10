import React, { useState, useEffect } from "react";
import Dropdown from "@/Components/Dropdown";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Drawer, Layout, Menu, theme } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarPlus,
  faUserPlus,
  faUser,
  faStore,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { router, usePage } from "@inertiajs/react";

const { Header, Content, Sider } = Layout;

export default function AdminLayout({ children }) {
  const user = usePage().props.auth.user;
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileProfileOpen, setMobileProfileOpen] = useState(false);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const navItems = [
    {
      key: "1",
      icon: <FontAwesomeIcon icon={faCalendarPlus} />,
      label: "Event",
      route: "events.index",
      routeGroup: "events",
    },
    ...(user.email === "asiapacificanalyticsclubapu@gmail.com"
      ? [
          {
            key: "2",
            icon: <FontAwesomeIcon icon={faUserPlus} />,
            label: "User",
            route: "auth.index",
            routeGroup: "auth",
          },
        ]
      : []),
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
      return (
        currentRoute?.startsWith(item.routeGroup) ||
        (item.routeGroup === "auth" && currentRoute === "register")
      );
    })?.key || "1";

  const MobileMenu = () => (
    <Drawer
      title="Menu"
      placement="left"
      onClose={() => setMobileMenuOpen(false)}
      open={mobileMenuOpen}
      width={200}
    >
      <Menu
        theme="light"
        mode="vertical"
        selectedKeys={[selectedKey]}
        items={navItems.map((item) => ({
          ...item,
          onClick: () => {
            router.get(route(item.route));
            setMobileMenuOpen(false);
          },
        }))}
      />
    </Drawer>
  );

  const MobileProfile = () => (
    <Drawer
      title="Profile"
      placement="right"
      onClose={() => setMobileProfileOpen(false)}
      open={mobileProfileOpen}
      width={180}
    >
      <div className="flex flex-col space-y-4">
        <Button
          onClick={() => {
            router.get(route("profile.edit"));
            setMobileProfileOpen(false);
          }}
        >
          Edit Profile
        </Button>
        <Button
          onClick={() => {
            router.get(route("logout"));
            setMobileProfileOpen(false);
          }}
        >
          Log Out
        </Button>
      </div>
    </Drawer>
  );

  return (
    <Layout>
      {!isMobile && (
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
      )}
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
          className="flex justify-between items-center"
        >
          {isMobile ? (
            <>
              <Button
                type="text"
                icon={<FontAwesomeIcon icon={faBars} />}
                onClick={() => setMobileMenuOpen(true)}
                className="px-4"
              />
              <div className="flex items-center">
                <Button
                  type="text"
                  icon={<FontAwesomeIcon icon={faUser} />}
                  onClick={() => setMobileProfileOpen(true)}
                  className="px-4"
                />
              </div>
            </>
          ) : (
            <>
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
            </>
          )}
        </Header>
        <Content
          style={{
            margin: isMobile ? "12px" : "24px 16px",
            padding: isMobile ? 16 : 24,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            minHeight: isMobile ? "calc(100dvh - 96px)" : "100dvh",
            overflowY: "auto",
          }}
        >
          {children}
        </Content>
      </Layout>
      {isMobile && <MobileMenu />}
      {isMobile && <MobileProfile />}
    </Layout>
  );
}
