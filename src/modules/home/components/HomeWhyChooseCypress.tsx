"use client";

import Image from "next/image";
import { useHome } from "../hooks/useHome";
import { Loading } from "@/src/components/common";
import type { WhyChooseBenefit } from "../types/home.type";

export default function HomeWhyChooseCypress() {
  const { homepage, loading } = useHome();

  const whyChoose = homepage?.whyChooseCypress;

  if (loading) {
    return (
      <section className="relative min-h-[500px] w-full bg-[#F6F9FF] py-[100px]">
        <Loading show fullScreen={false} message="Loading..." />
      </section>
    );
  }

  if (!whyChoose) {
    return null;
  }

  return (
    <section className="w-full bg-[#F6F9FF] py-[100px]">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-[60px] px-6">
        <div className="flex flex-col items-center justify-center text-center">
          <span className="font-inter text-[16px] font-normal leading-[28px] text-[#5D8DFF]">
            Why Choose Us
          </span>

          <h2 className="mt-[12px] font-inter text-[36px] font-bold leading-[44px] text-[#202020]">
            Why Choose Cypress Hub?
          </h2>

          <p className="mt-[12px] max-w-[620px] font-inter text-[16px] font-normal leading-[28px] text-[#858585]">
            We offer more than just a seat. We offer the platform for success.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {whyChoose.benefits.map((item: WhyChooseBenefit) => (
            <div
              key={item.id}
              className="
                                    flex
                                    h-full
                                    flex-col
                                    items-start
                                    rounded-[12px]
                                    border
                                    border-[#EEF2F7]
                                    bg-white
                                    p-8
                                    shadow-[0_8px_24px_rgba(16,24,40,0.06)]
                                    transition-all
                                    duration-300
                                    hover:-translate-y-1
                                    hover:shadow-[0_16px_40px_rgba(16,24,40,0.10)]
                                "
            >
              <div
                className="
                                        relative
                                        mb-[18px]
                                        flex
                                        h-[56px]
                                        w-[78px]
                                        items-center
                                        justify-center
                                        bg-[#DCEAFF]
                                        after:absolute
                                        after:right-[-14px]
                                        after:top-0
                                        after:border-y-[28px]
                                        after:border-l-[14px]
                                        after:border-y-transparent
                                        after:border-l-[#DCEAFF]
                                    "
              >
                {item.icon?.url && (
                  <Image
                    src={item.icon.url}
                    alt={item.title}
                    width={28}
                    height={28}
                    className="object-contain"
                  />
                )}
              </div>

              <h3
                className="
                                        font-inter
                                        text-[20px]
                                        font-bold
                                        leading-[28px]
                                        tracking-[-0.03em]
                                        text-[#202020]
                                    "
              >
                {item.title}
              </h3>

              <p
                className="
                                        mt-3
                                        font-inter
                                        text-[16px]
                                        leading-[28px]
                                        text-[#858585]
                                    "
              >
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
