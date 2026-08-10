"use client";

import Link from "next/link";
import { useHome } from "../hooks/useHome";
import { Loading } from "@/src/components/common";

export default function HomePricingBanner() {
  const { homepage, loading } = useHome();

  const pricingBanner = homepage?.pricing;

  if (loading) {
    return (
      <section className="relative min-h-[300px] w-full bg-[#232323]">
        <Loading show fullScreen={false} message="Loading pricing..." />
      </section>
    );
  }

  if (!pricingBanner) {
    return (
      <div className="py-20 text-center text-gray-500">
        No pricing banner data.
      </div>
    );
  }

  return (
    <section className="w-full bg-[#232323] px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
      <div
        className="
          mx-auto flex w-full max-w-[1200px]
          flex-col items-start justify-between
          gap-8
          lg:flex-row lg:items-center lg:gap-10
        "
      >
        <div className="w-full max-w-[750px]">
          <h2
            className="
              text-[32px]
              font-bold
              leading-[40px]
              text-white
              sm:text-[40px]
              sm:leading-[52px]
              lg:text-[48px]
              lg:leading-[64px]
            "
          >
            {pricingBanner.title}
          </h2>

          <p
            className="
              mt-3
              text-[16px]
              font-normal
              leading-[24px]
              text-[#EDEDED]
              sm:mt-4
              sm:text-[18px]
              sm:leading-[28px]
            "
          >
            {pricingBanner.description}
          </p>
        </div>

        <Link
          href={pricingBanner.button_link}
          className="
            flex
            h-[52px]
            w-full
            items-center
            justify-center
            rounded-xl
            bg-gradient-to-r
            from-[#6C9ADB]
            to-[#2B71D3]
            px-6
            text-[16px]
            font-bold
            leading-[24px]
            tracking-[-0.03em]
            text-white
            transition-all
            duration-300
            hover:scale-105
            sm:h-[56px]
            sm:w-auto
            sm:min-w-[190px]
            sm:px-8
            sm:text-[18px]
            sm:leading-[28px]
            lg:h-[60px]
            lg:min-w-[190px]
            lg:text-[20px]
          "
        >
          {pricingBanner.button_text}
        </Link>
      </div>
    </section>
  );
}
