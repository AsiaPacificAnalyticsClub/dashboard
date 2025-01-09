import AdminLayout from "@/Layouts/AdminLayout";
import { Button, Table, Space, Modal, Form, Input, Alert } from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { router, usePage } from "@inertiajs/react";
import { useState } from "react";

export default function Index() {
  const { flash, users } = usePage().props;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [form] = Form.useForm();

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="small">
          <Button
            type="link"
            onClick={() => {
              // Show the modal with prefilled data
              setCurrentUser(record);
              form.setFieldsValue({
                name: record.name,
                email: record.email,
                password: record.password,
              });
              setIsModalVisible(true);
            }}
          >
            <EditOutlined />
          </Button>
          <Button
            type="link"
            danger
            onClick={() => {
              Modal.confirm({
                title: "Are you sure you want to delete this user?",
                onOk: () => {
                  // Trigger deletion and update users locally or reload the page
                  router.delete(`/auth/${record.key}`, {
                    onSuccess: () => {
                      Modal.success({
                        content: "User deleted successfully",
                      });
                    },
                    onError: () => {
                      Modal.error({
                        content: "User deletion failed",
                      });
                    },
                  });
                },
              });
            }}
          >
            <DeleteOutlined />
          </Button>
        </Space>
      ),
    },
  ];

  const data = users?.map((user) => {
    return {
      key: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
    };
  });
  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        // Submit the form data to the server
        router.patch(
          `/auth/${currentUser.key}`,
          {
            name: values.name,
            email: values.email,
            password: values.password,
          },
          {
            onSuccess: () => {
              Modal.success({
                content: "User updated successfully",
              });
            },
            onError: () => {
              Modal.error({
                content: "User update failed",
              });
            },
          },
        );
        setIsModalVisible(false);
      })
      .catch((errorInfo) => {
        console.log("Validate Failed:", errorInfo);
      });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <AdminLayout>
      {flash?.success && (
        <Alert
          message={flash.success}
          type="success"
          showIcon
          className="mb-4"
          closable
        />
      )}
      <div className="flex justify-between gap-10 mb-4">
        <Input
          placeholder="Search"
          prefix={<SearchOutlined />}
          style={{ width: "60%" }}
        />
        <Button
          color="default"
          variant="solid"
          onClick={() => {
            router.get(route("events.create"));
          }}
        >
          Add User
          <PlusOutlined />
        </Button>
      </div>
      <Table dataSource={data} columns={columns} bordered />
      <Modal
        title="Edit User"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical" name="edit_user">
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input the user name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please input the user email!" },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </AdminLayout>
  );
}
