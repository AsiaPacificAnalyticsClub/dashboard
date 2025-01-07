import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import AdminLayout from "@/Layouts/AdminLayout";
import { useForm } from "@inertiajs/react";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export default function Register() {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const submit = (e) => {
    e.preventDefault();

    post(route("register"), {
      onFinish: () => reset("password", "password_confirmation"),
    });
  };

  const [showPassword, setShowPassword] = useState({
    password: false,
    password_confirmation: false,
  });

  const togglePasswordVisibility = (field) => {
    setShowPassword((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  return (
    <AdminLayout>
      <div className="text-xl font-bold text-gray-800 mb-4">Add User</div>

      <form onSubmit={submit}>
        <div>
          <InputLabel htmlFor="name" value="Name" />

          <TextInput
            id="name"
            name="name"
            value={data.name}
            className="mt-1 block w-full"
            autoComplete="name"
            isFocused={true}
            onChange={(e) => setData("name", e.target.value)}
            required
          />

          <InputError message={errors.name} className="mt-2" />
        </div>

        <div className="mt-4">
          <InputLabel htmlFor="email" value="Email" />

          <TextInput
            id="email"
            type="email"
            name="email"
            value={data.email}
            className="mt-1 block w-full"
            autoComplete="username"
            onChange={(e) => setData("email", e.target.value)}
            required
          />

          <InputError message={errors.email} className="mt-2" />
        </div>

        <div className="mt-4">
          <InputLabel htmlFor="password" value="Password" />

          <div className="relative">
            <TextInput
              id="password"
              type={showPassword.password ? "text" : "password"}
              name="password"
              value={data.password}
              className="mt-1 block w-full pr-10"
              autoComplete="new-password"
              onChange={(e) => setData("password", e.target.value)}
              required
            />

            <button
              type="button"
              className="absolute inset-y-0 right-0 px-3 text-gray-600 hover:text-gray-800"
              onClick={() => togglePasswordVisibility("password")}
            >
              <FontAwesomeIcon
                icon={showPassword.password ? faEye : faEyeSlash}
              />
            </button>
          </div>
          <InputError message={errors.password} className="mt-2" />
        </div>

        <div className="mt-4">
          <InputLabel
            htmlFor="password_confirmation"
            value="Confirm Password"
          />

          <div className="relative">
            <TextInput
              id="password_confirmation"
              type={showPassword.password_confirmation ? "text" : "password"}
              name="password_confirmation"
              value={data.password_confirmation}
              className="mt-1 block w-full"
              autoComplete="new-password"
              onChange={(e) => setData("password_confirmation", e.target.value)}
              required
            />

            <button
              type="button"
              className="absolute inset-y-0 right-0 px-3 text-gray-600 hover:text-gray-800"
              onClick={() => togglePasswordVisibility("password_confirmation")}
            >
              <FontAwesomeIcon
                icon={showPassword.password_confirmation ? faEye : faEyeSlash}
              />
            </button>
          </div>
          <InputError message={errors.password_confirmation} className="mt-2" />
        </div>

        <div className="mt-4 flex items-center justify-end">
          <PrimaryButton className="ms-4" disabled={processing}>
            Register
          </PrimaryButton>
        </div>
      </form>
    </AdminLayout>
  );
}
