"use client";

import { useState } from "react";
import { Mail, Lock, User } from "lucide-react";
import Link from "next/link";

export default function RegisterForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPending, setIsPending] = useState(false); // Đặt tạm pending khi chưa gắn Hook Register

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);
    // TODO: mutateRegister({ fullName, email, password })
    console.log("Registering...", { fullName, email, password });
  };

  return (
    <>
      <div className="flex justify-center mb-4">
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-[#5B73F3] text-2xl shadow-md">
          C
        </div>
      </div>

      <h2 className="text-2xl text-center font-semibold text-gray-800">
        Create Account
      </h2>

      <p className="text-center text-sm text-gray-500 mb-4">
        Join our CMS platform today
      </p>

      <form onSubmit={submit} className="space-y-3">
        <div>
          <label className="block text-xs text-gray-600 mb-1">Full Name</label>
          <div className="flex items-center h-11 rounded-xl bg-gray-50 border border-gray-200 px-4">
            <User size={16} className="text-[#5B73F3] mr-3" />
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Your full name"
              className="flex-1 outline-none bg-transparent text-xs"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-xs text-gray-600 mb-1">Email</label>
          <div className="flex items-center h-11 rounded-xl bg-gray-50 border border-gray-200 px-4">
            <Mail size={16} className="text-[#5B73F3] mr-3" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="flex-1 outline-none bg-transparent text-xs"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-xs text-gray-600 mb-1">Password</label>
          <div className="flex items-center h-11 rounded-xl bg-gray-50 border border-gray-200 px-4">
            <Lock size={16} className="text-[#5B73F3] mr-3" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Min 6 characters"
              className="flex-1 outline-none bg-transparent text-xs"
              required
            />
          </div>
        </div>

        <button
          disabled={isPending}
          className="w-full h-11 mt-2 rounded-xl text-white font-medium bg-gradient-to-r from-[#6785FF] to-[#5572F6] hover:-translate-y-0.5 transition disabled:opacity-50 text-sm"
        >
          {isPending ? "Registering..." : "Register"}
        </button>
      </form>

      <p className="text-center text-xs text-gray-500 mt-4">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-[#5B73F3] font-semibold hover:underline"
        >
          Login here
        </Link>
      </p>
    </>
  );
}
