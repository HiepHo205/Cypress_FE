"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import HeaderCountdown from "./HeaderCountdown";
import Image from "next/image";

export default function HeaderMain() {
  return (
    <div className="border-b bg-white">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">
        <div className="flex items-center gap-8">
          <Link
            href="/company"
            className="flex items-center gap-1 text-sm font-medium hover:text-blue-600"
          >
            Company
            <ChevronDown size={16} />
          </Link>

          <Link
            href="/pricing"
            className="flex items-center gap-1 text-sm font-medium hover:text-blue-600"
          >
            Pricings
            <ChevronDown size={16} />
          </Link>

          <Link
            href="/contact"
            className="flex items-center gap-1 text-sm font-medium hover:text-blue-600"
          >
            Contact Us
            <ChevronDown size={16} />
          </Link>
          <button className="flex items-center gap-1 text-sm font-medium">
            VI
            <ChevronDown size={16} />
          </button>
        </div>

        <Link href="/">
          <Image
            src="/images/logo_cypress.png"
            alt="Logo"
            width={70}
            height={70}
          />
        </Link>
        <HeaderCountdown />

        <button className="rounded-md bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700">
          Book now
        </button>
      </div>
    </div>
  );
}
