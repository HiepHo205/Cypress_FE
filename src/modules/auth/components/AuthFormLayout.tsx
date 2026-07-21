"use client";

import React from "react";

interface AuthFormLayoutProps {
  children: React.ReactNode;
}

export default function AuthFormLayout({ children }: AuthFormLayoutProps) {
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
          </div>

          <div className="absolute w-[130px] h-[130px] border-8 border-white/80 rounded-full bottom-[-55px] right-[-45px]" />
          <div className="absolute w-[110px] h-[110px] rounded-full bg-gradient-to-br from-[#63E4FF] to-[#42BFFF] bottom-6 right-9" />
        </div>

        <div className="w-1/2 flex flex-col justify-center px-7 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
