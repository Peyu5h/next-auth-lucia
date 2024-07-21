"use client";

import React, { useState } from "react";
import { useFormik } from "formik";
import Link from "next/link";
import { loginSchema } from "@/lib/yupValidation";
import InputField from "@/components/InputField";
import { login } from "./actions";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

const LoginPage = () => {
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      const { error } = await login(values);
      if (error) {
        setError(error);
      }
    },
  });

  const handleShowPassToggle = () => {
    setShowPass(prevState => !prevState);
  };

  const { errors, touched, handleChange, handleBlur, handleSubmit, values } =
    formik;

  return (
    <div>
      <div>
        <div className="flex h-screen items-center justify-center">
          <div className="form my-auto w-[22rem] rounded-2xl bg-gray-200 p-6 py-10 dark:bg-card">
            <div className="mx-auto flex items-center flex-col mb-8">
            <h1 className="mt-4 text-center text-[28px] font-bold">Welcome back</h1>
            <h4 className="font-light">Please sign in to continue</h4>
            </div>


          <div className="oauth w-full flex gap-x-6 ">
          <Link className="w-1/2 items-center justify-center mx-auto p-3 my-2 px-4 border duration-200 border-slate-400 hover:bg-slate-300 rounded-lg " href="/oauth/google">
          <div className="flex gap-x-3">
          <FcGoogle className="text-2xl" />
          <h1 className="font-medium">Google</h1>
            </div>
            </Link>
            <Link className="w-1/2 items-center justify-center mx-auto p-3 my-2 px-4 border duration-200 border-slate-400 hover:bg-slate-300 rounded-lg " href="/oauth/github">
          <div className="flex gap-x-3">
          <FaGithub className="text-2xl" />
          <h1 className="font-medium">Github</h1>
            </div>
            </Link>
          </div>

          <div className="relative flex items-center w-full text-xs my-4">
  <div className="flex-grow h-[0.5px] bg-slate-400"></div>
  <span className="mx-4 text-gray-500">OR</span>
  <div className="flex-grow h-[0.5px] bg-slate-400"></div>
</div>           
            <form onSubmit={handleSubmit} className="flex flex-col gap-y-8">
              <InputField
                id="email"
                label="Email"
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
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter your password"
              showPass={showPass}
              setShowPass={setShowPass}
              error={errors.password}
              touched={touched.password}
            />

           
              <div className="btn">
                <div className="error mb-2 ml-3 text-xs text-red-500">
                  {error}
                </div>
                <button
                  className="flex w-full cursor-pointer justify-center rounded-lg bg-emerald-500 p-4 text-[15px] font-semibold text-gray-100 shadow-lg transition duration-300 ease-in hover:bg-emerald-600 focus:outline-none"
                  type="submit"
                >
                  Sign in
                </button>
              </div>
              <p className="dark:text-dark_text_1 mt-2 flex flex-row items-center justify-center gap-x-2 text-center text-sm">
                Don&apos;t have an account?
                <Link href="/register">
                  <span className="cursor-pointer transition-all duration-200 ease-linear hover:underline">
                    Sign up
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

export default LoginPage;
