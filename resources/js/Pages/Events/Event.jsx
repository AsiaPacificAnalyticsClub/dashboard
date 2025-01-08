import AdminLayout from "@/Layouts/AdminLayout";
import { Button, Alert } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { router, usePage } from "@inertiajs/react";

export default function Event() {
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

      <div className="flex justify-end">
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
    </AdminLayout>
  );
}
