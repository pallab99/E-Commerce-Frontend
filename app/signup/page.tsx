/* eslint-disable @next/next/no-img-element */
'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import { message } from 'antd';
import signUpUser from '@/Api/signUpUser';

export default function Page() {
  const router = useRouter();
  const [userDetails,setUserDetails]=useState([]) as any
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  console.log(errors);
  const handleSignUpUser = async (data:any) => {
    try {
      const response = await signUpUser(data);      
      setUserDetails(response.data);
      message.success("Sign Up Successfully!");
      router.push("/signin")
    } catch (error:any) {
      const errorMessage=error.response.data.message
      message.error(errorMessage);
    }
  };
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      {/* {userDetails.email} */}
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Create your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          className="space-y-6"
          noValidate
          onSubmit={handleSubmit((data: any) => {
            handleSignUpUser(data);
          })}
        >
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Full Name
            </label>

            <div className="mt-2">
              <input
                id="name"
                {...register('name', {
                  required: 'Name is required',
                })}
                type="text"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />

              {errors.name ? (
                //@ts-ignore
                <p className="text-red-600">{errors.name.message}</p>
              ) : null}
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>

            <div className="mt-2">
              <input
                id="email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                    message: 'Email is not valid',
                  },
                })}
                type="email"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />

              {errors.email ? (
                //@ts-ignore
                <p className="text-red-600">{errors.email.message}</p>
              ) : null}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                {...register('password', { required: 'Password is required' })}
                type="password"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {errors.password ? (
                //@ts-ignore
                <p className="text-red-600">{errors.password.message}</p>
              ) : null}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Confirm Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="confirm-password"
                {...register('confirmPassword', {
                  required: 'Confirm Password is required',
                  validate: (value, formValues) =>
                    value === formValues.password || 'password not matching',
                })}
                type="password"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {errors.confirmPassword ? (
                //@ts-ignore
                <p className="text-red-600">{errors.confirmPassword.message}</p>
              ) : null}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign Up
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Already a member?{' '}
          <a
            onClick={() => {
              router.push('/signin');
            }}
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 hover:cursor-pointer"
          >
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
}
