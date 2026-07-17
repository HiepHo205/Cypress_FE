"use client";

import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { Mail, Lock } from "lucide-react";

export default function LoginForm() {
  const { mutate, isPending } = useLogin();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({ email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#eef2fb] px-4">
      <div className="w-[700px] h-[550px] flex overflow-hidden rounded-[22px] bg-white shadow-[0_20px_45px_rgba(0,0,0,0.15)]">
        <div className="w-1/2 relative flex flex-col justify-center px-10 text-white overflow-hidden bg-gradient-to-br from-[#5B73F3] to-[#6887FF]">
          <div className="absolute top-8 left-8 flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-[#5B73F3] text-2xl font-bold">
              C
            </div>
            <h2 className="text-lg font-semibold">Cypress Hub</h2>
          </div>

          <div>
            <h1 className="text-[42px] leading-tight font-semibold mb-6">
              Adventure <br />
              starts here
            </h1>

            <p className="text-sm leading-7 opacity-95">
              Manage your CMS platform, content and administration in one place.
            </p>
          </div>

          <div className="absolute w-[130px] h-[130px] border-8 border-white/80 rounded-full bottom-[-55px] right-[-45px]" />

          <div className="absolute w-[110px] h-[110px] rounded-full bg-gradient-to-br from-[#63E4FF] to-[#42BFFF] bottom-6 right-9" />
        </div>

        <div className="w-1/2 flex flex-col justify-center px-7">
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
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-2">
                Password
              </label>

              <div className="flex items-center h-12 rounded-xl bg-gray-50 border border-gray-200 px-4">
                <Lock size={18} className="text-[#5B73F3] mr-3" />

                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="flex-1 outline-none bg-transparent text-sm"
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
          </form>
        </div>
      </div>
    </div>
  );
}
