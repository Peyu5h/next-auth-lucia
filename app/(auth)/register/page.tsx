"use client";

import React, { useState } from "react";
import Link from "next/link";
import InputField from "@/components/InputField";
import { registerSchema } from "@/lib/yupValidation";
import { register } from "./actions";
import { useFormik } from "formik";

const RegisterPage = () => {
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: registerSchema,
    onSubmit: async (values) => {
      const { error } = await register(values);
      if (error) {
        setError(error);
      }
    },
  });

  const { errors, touched, handleChange, handleBlur, handleSubmit, values } =
    formik;

  return (
    <div>
      <div>
        <div className="flex h-screen items-center justify-center">
          <div className="form my-auto w-[22rem] rounded-2xl bg-card p-6 py-10">
            <h1 className="mb-8 mt-4 text-center text-3xl font-bold">
              Register
            </h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-y-8">
              <InputField
                id="name"
                label="Username"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.name}
                touched={touched.name}
                placeholder="Enter your username"
              />
              <InputField
                id="email"
                label="Email"
                type="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.email}
                touched={touched.email}
                placeholder="Enter your email"
              />
              <InputField
                id="password"
                label="Password"
                type={showPass ? "text" : "password"}
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.password}
                touched={touched.password}
                placeholder="Enter your password"
                showPass={showPass}
                setShowPass={setShowPass}
              />
              <div className="btn">
                <div className="error mb-2 ml-3 text-xs text-red-500">
                  {error}
                </div>
                <button
                  className="flex w-full cursor-pointer justify-center rounded-full bg-emerald-500 p-4 text-lg font-semibold text-gray-100 shadow-lg transition duration-300 ease-in hover:bg-teal-600 focus:outline-none"
                  type="submit"
                >
                  Register
                </button>
                <div className="mt-4"></div>
              </div>
              <p className="dark:text-dark_text_1 mt-2 flex flex-row items-center justify-center gap-x-2 text-center text-sm">
                Already have an account?
                <Link href="/login">
                  <span className="cursor-pointer transition-all duration-200 ease-linear hover:underline">
                    Login
                  </span>
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
