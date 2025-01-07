import Image from "antd/lib/image";

export default function GuestLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col items-center bg-gray-100 pt-6 sm:justify-center sm:pt-0">
      <div className="mt-6 w-full overflow-hidden bg-white px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg flex flex-col items-center justify-center md:rounded-xl">
        <Image
          src="/images/logo.png"
          width={200}
          height={200}
          alt="logo"
          preview={false}
        />
        {children}
      </div>
    </div>
  );
}
