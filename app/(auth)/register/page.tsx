'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import InputField from '@/components/InputField';
import { registerSchema } from '@/lib/yupValidation';
import { register } from './actions';
import { useFormik } from 'formik';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { Button } from '@/components/ui/button';

const RegisterPage = () => {
  const [error, setError] = useState('');
  const [showPass, setShowPass] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
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
    <div className="dark:bg-dark-background flex h-screen items-center justify-center bg-background">
      <div className="form dark:bg-dark-card my-auto w-[22rem] rounded-2xl bg-card p-6 py-10">
        <div className="mx-auto mb-8 flex flex-col items-center">
          <h1 className="dark:text-dark-foreground mt-4 text-center text-[28px] font-bold text-foreground">
            Welcome
          </h1>
          <h4 className="dark:text-dark-foreground font-light text-foreground">
            Create an account to continue
          </h4>
        </div>

        <div className="oauth flex w-full gap-x-6">
          <Link
            className="dark:border-dark-border dark:hover:bg-dark-accent mx-auto my-2 w-1/2 items-center justify-center rounded-lg border border-border p-3 px-4 duration-200 hover:bg-accent"
            href="/oauth/google"
          >
            <div className="flex gap-x-3">
              <FcGoogle className="text-2xl" />
              <h1 className="font-medium">Google</h1>
            </div>
          </Link>
          <Link
            className="dark:border-dark-border dark:hover:bg-dark-accent mx-auto my-2 w-1/2 items-center justify-center rounded-lg border border-border p-3 px-4 duration-200 hover:bg-accent"
            href="/oauth/github"
          >
            <div className="flex gap-x-3">
              <FaGithub className="text-2xl" />
              <h1 className="font-medium">Github</h1>
            </div>
          </Link>
        </div>

        <div className="relative my-4 flex w-full items-center text-xs">
          <div className="dark:bg-dark-border h-[0.5px] flex-grow bg-border"></div>
          <span className="dark:text-dark-foreground mx-4 text-foreground">
            OR
          </span>
          <div className="dark:bg-dark-border h-[0.5px] flex-grow bg-border"></div>
        </div>

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
            <div className="error mb-2 ml-3 text-xs text-red-500">{error}</div>
            <Button className="w-full py-4" type="submit">
              Sign up
            </Button>
          </div>

          <p className="dark:text-dark-text mt-2 flex flex-row items-center justify-center gap-x-2 text-center text-sm">
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
  );
};

export default RegisterPage;
