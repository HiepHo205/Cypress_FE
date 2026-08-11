"use client";

import { useState } from "react";
import Image from "next/image";
import type { FooterNewsletter as FooterNewsletterType } from "@/src/modules/footer/types/footer.type";

interface FooterNewsletterProps {
  newsletter: FooterNewsletterType;
}

export default function FooterNewsletter({
  newsletter,
}: FooterNewsletterProps) {
  const [email, setEmail] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <div>
      <h3 className="text-sm font-semibold text-white">{newsletter.title}</h3>

      <p className="mt-5 max-w-[270px] text-sm leading-6 text-white/80">
        {newsletter.description}
      </p>

      <form onSubmit={handleSubmit} className="mt-4 flex items-center gap-2">
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder={newsletter.placeholder}
          className="h-10 min-w-0 flex-1 rounded-md border border-gray-300 bg-white px-3 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-blue-500"
          required
        />

        <button
          type="submit"
          aria-label="Subscribe"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[#2875d8] text-white transition-colors hover:bg-[#1f64bd]"
        >
          {newsletter.button_icon ? (
            <Image
              src={newsletter.button_icon}
              alt="Subscribe"
              width={18}
              height={18}
              className="h-[18px] w-[18px] object-contain"
            />
          ) : (
            <span>→</span>
          )}
        </button>
      </form>
    </div>
  );
}
