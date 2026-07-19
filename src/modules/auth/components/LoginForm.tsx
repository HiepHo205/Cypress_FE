"use client";

import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { Mail, Lock } from "lucide-react";
import AuthFormLayout from "./AuthFormLayout";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function LoginForm() {
  const { mutate, isPending } = useLogin();
  const params = useParams();
  const locale = params?.locale || "vi";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({ email, password });
  };

  return (
    <AuthFormLayout>
      <div className="flex justify-center mb-5">
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-[#5B73F3] text-3xl shadow-md">
          C
        </div>
      </div>

      <h2 className="text-2xl text-center font-semibold text-gray-800">
        Hello! Welcome back
      </h2>

      <p className="text-center text-sm text-gray-500 mb-6">
        Login to access Admin Portal
      </p>

      <form onSubmit={submit} className="space-y-4">
        <div>
          <label className="block text-sm text-gray-600 mb-2">Email</label>
          <div className="flex items-center h-12 rounded-xl bg-gray-50 border border-gray-200 px-4">
            <Mail size={18} className="text-[#5B73F3] mr-3" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 outline-none bg-transparent text-sm"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-2">Password</label>
          <div className="flex items-center h-12 rounded-xl bg-gray-50 border border-gray-200 px-4">
            <Lock size={18} className="text-[#5B73F3] mr-3" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="flex-1 outline-none bg-transparent text-sm"
              required
            />
          </div>
        </div>

        <div className="flex justify-between text-xs text-gray-500">
          <label className="flex items-center gap-2">
            <input type="checkbox" />
            Remember me
          </label>
          <a className="text-[#5B73F3] cursor-pointer">Forgot Password?</a>
        </div>

        <button
          disabled={isPending}
          className="w-full h-12 rounded-xl text-white font-medium bg-gradient-to-r from-[#6785FF] to-[#5572F6] hover:-translate-y-1 transition disabled:opacity-50"
        >
          {isPending ? "Loading..." : "Login"}
        </button>

        <p className="text-center text-xs text-gray-500 mt-2">
          {"Don't have an account? "}
          <Link
            href={`/${locale}/register`}
            className="text-[#5B73F3] font-medium hover:underline"
          >
            Register here
          </Link>
        </p>
      </form>
    </AuthFormLayout>
  );
}
