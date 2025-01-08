import AdminLayout from "@/Layouts/AdminLayout";
import { Button, DatePicker, Form, Input, Upload, Alert } from "antd";
import { PlusOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { router, usePage } from "@inertiajs/react";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const onFinish = (values) => {
  router.post(route("events.store"), values);
};

export default function Create() {
  const [form] = Form.useForm();
  const { flash } = usePage().props;

  return (
    <AdminLayout>
      {flash.success && (
        <Alert
          message={flash.success}
          type="success"
          showIcon
          className="mb-4"
          closable
        />
      )}
      <Button
        color="default"
        variant="outlined"
        onClick={() => {
          router.get(route("events.index"));
        }}
        className="mb-4 h-10"
      >
        <ArrowLeftOutlined />
      </Button>
      <h2 className="text-xl font-semibold leading-tight text-gray-800 mb-4">
        Create Event
      </h2>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Please input the title" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Please input the description" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Link"
          name="link"
          rules={[{ required: true, message: "Please insert the link" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Date"
          name="start_date"
          rules={[{ required: true, message: "Please choose the date" }]}
        >
          <RangePicker
            showTime={false}
            format="YYYY-MM-DD"
            onChange={(dates, dateStrings) => {
              form.setFieldValue({
                "start_date.0": dayjs(dateStrings[0]).startOf("day"),
                "start_date.1": dayjs(dateStrings[1]).startOf("day"),
              });
            }}
          />
        </Form.Item>
        {/*
        <Form.Item
          label="Image"
          name="image"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          rules={[{ required: true, message: "Please upload an image" }]}
        >
          <Upload action="/upload.do" listType="picture-card">
            <button style={{ background: "none", border: 0 }}>
              <PlusOutlined />
              <div className="ant-upload-text">Upload</div>
            </button>
          </Upload>
        </Form.Item>
*/}
        <Form.Item className="flex justify-end">
          <Button
            color="default"
            variant="solid"
            type="primary"
            className="uppercase font-semibold"
            htmlType="submit"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </AdminLayout>
  );
}
