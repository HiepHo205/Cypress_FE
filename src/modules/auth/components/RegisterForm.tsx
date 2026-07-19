"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterInputType } from "../schemas/register.schema";
import { useRegister } from "../hooks/useRegister";
import { Mail, Lock, User as UserIcon } from "lucide-react";
import AuthFormLayout from "./AuthFormLayout";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function RegisterForm() {
  const { mutate, isPending } = useRegister();
  const params = useParams();
  const locale = params?.locale || "vi";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInputType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
  });

  const onSubmit = (data: RegisterInputType) => {
    mutate(data);
  };

  return (
    <AuthFormLayout>
      <div className="flex justify-center mb-4">
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-[#5B73F3] text-2xl shadow-md">
          C
        </div>
      </div>

      <h2 className="text-xl text-center font-semibold text-gray-800">
        Create your Account
      </h2>
      <p className="text-center text-xs text-gray-500 mb-4">
        Join Cypress Hub Admin Portal
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <div>
          <label className="block text-xs text-gray-600 mb-1">Full Name</label>
          <div className="flex items-center h-10 rounded-xl bg-gray-50 border border-gray-200 px-3">
            <UserIcon size={16} className="text-[#5B73F3] mr-2" />
            <input
              type="text"
              {...register("name")}
              placeholder="John Doe"
              className="flex-1 outline-none bg-transparent text-xs"
            />
          </div>
          {errors.name && (
            <p className="mt-0.5 text-[10px] text-red-600">
              {errors.name.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-xs text-gray-600 mb-1">Email</label>
          <div className="flex items-center h-10 rounded-xl bg-gray-50 border border-gray-200 px-3">
            <Mail size={16} className="text-[#5B73F3] mr-2" />
            <input
              type="email"
              {...register("email")}
              placeholder="Enter your email"
              className="flex-1 outline-none bg-transparent text-xs"
            />
          </div>
          {errors.email && (
            <p className="mt-0.5 text-[10px] text-red-600">
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-xs text-gray-600 mb-1">Password</label>
          <div className="flex items-center h-10 rounded-xl bg-gray-50 border border-gray-200 px-3">
            <Lock size={16} className="text-[#5B73F3] mr-2" />
            <input
              type="password"
              {...register("password")}
              placeholder="••••••••"
              className="flex-1 outline-none bg-transparent text-xs"
            />
          </div>
          {errors.password && (
            <p className="mt-0.5 text-[10px] text-red-600">
              {errors.password.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-xs text-gray-600 mb-1">
            Confirm Password
          </label>
          <div className="flex items-center h-10 rounded-xl bg-gray-50 border border-gray-200 px-3">
            <Lock size={16} className="text-[#5B73F3] mr-2" />
            <input
              type="password"
              {...register("password_confirmation")}
              placeholder="••••••••"
              className="flex-1 outline-none bg-transparent text-xs"
            />
          </div>
          {errors.password_confirmation && (
            <p className="mt-0.5 text-[10px] text-red-600">
              {errors.password_confirmation.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full h-11 mt-2 rounded-xl text-white font-medium bg-gradient-to-r from-[#6785FF] to-[#5572F6] hover:-translate-y-1 transition disabled:opacity-50 text-sm"
        >
          {isPending ? "Registering..." : "Register"}
        </button>

        <p className="text-center text-xs text-gray-500 mt-2">
          Already have an account?{" "}
          <Link
            href={`/${locale}/login`}
            className="text-[#5B73F3] font-medium hover:underline"
          >
            Login here
          </Link>
        </p>
      </form>
    </AuthFormLayout>
  );
}
