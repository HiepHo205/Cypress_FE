"use client";

import { Zap } from "lucide-react";

export default function HeaderCountdown() {
  return (
    <div className=" bg-white">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-end px-8">
        <div className="flex items-center gap-3 rounded-lg border border-blue-200 bg-blue-50 px-5 py-2">
          <Zap size={18} className="text-blue-600" />

          <span className="text-sm font-medium">01 d</span>

          <span>:</span>

          <span className="text-sm font-medium">03 h</span>

          <span>:</span>

          <span className="text-sm font-medium">40 m</span>

          <span>:</span>

          <span className="text-sm font-medium">26 s</span>
        </div>
      </div>
    </div>
  );
}
