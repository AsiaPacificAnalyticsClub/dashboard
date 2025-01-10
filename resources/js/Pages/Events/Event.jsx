import AdminLayout from "@/Layouts/AdminLayout";
import {
  Button,
  Alert,
  Input,
  Table,
  Space,
  Modal,
  Form,
  Input as AntInput,
  DatePicker,
} from "antd";
import {
  PlusOutlined,
  SearchOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { router, usePage } from "@inertiajs/react";
import { useState } from "react";
import moment from "moment";

export default function Event() {
  const { flash, events } = usePage().props;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [form] = Form.useForm();

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Start Date",
      dataIndex: "start_date",
      key: "start_date",
    },
    {
      title: "End Date",
      dataIndex: "end_date",
      key: "end_date",
    },
    {
      title: "Action",
      key: "action",
      fixed: "right",
      render: (text, record) => (
        <Space size="small">
          <Button
            type="link"
            onClick={() => {
              // Show the modal with prefilled data
              setCurrentEvent(record);
              form.setFieldsValue({
                title: record.title,
                description: record.description,
                start_date: moment(record.start_date),
                end_date: moment(record.end_date),
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
                title: "Are you sure you want to delete this event?",
                onOk: () => {
                  // Trigger deletion and update events locally or reload the page
                  router.delete(`/events/${record.key}`, {
                    onSuccess: () => {
                      Modal.success({
                        content: "Event deleted successfully",
                      });
                    },
                    onError: () => {
                      Modal.error({
                        content: "Event deletion failed",
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

  const data = events.map((event) => {
    return {
      key: event.id,
      title: event.title,
      description: event.description,
      start_date: event.start_date,
      end_date: event.end_date,
    };
  });

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        // Submit the form data to the server
        router.patch(
          `/events/${currentEvent.key}`,
          {
            title: values.title,
            description: values.description,
            start_date: values.start_date.format("YYYY-MM-DD"),
            end_date: values.end_date.format("YYYY-MM-DD"),
          },
          {
            onSuccess: () => {
              Modal.success({
                content: "Event updated successfully",
              });
            },
            onError: () => {
              Modal.error({
                content: "Event update failed",
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
          Add Event
          <PlusOutlined />
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        bordered
        scroll={{ x: "max-content" }}
      />
      {/* Edit Event Modal */}
      <Modal
        title="Edit Event"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical" name="edit_event">
          <Form.Item
            label="Event Title"
            name="title"
            rules={[
              { required: true, message: "Please input the event title!" },
            ]}
          >
            <AntInput />
          </Form.Item>
          <Form.Item
            label="Event Description"
            name="description"
            rules={[
              {
                required: true,
                message: "Please input the event description!",
              },
            ]}
          >
            <AntInput />
          </Form.Item>
          <Form.Item
            label="Event Start Date"
            name="start_date"
            rules={[
              { required: true, message: "Please select the start date!" },
            ]}
          >
            <DatePicker format="YYYY-MM-DD" />
          </Form.Item>
          <Form.Item
            label="Event End Date"
            name="end_date"
            rules={[{ required: true, message: "Please select the end date!" }]}
          >
            <DatePicker format="YYYY-MM-DD" />
          </Form.Item>
        </Form>
      </Modal>
    </AdminLayout>
  );
}
