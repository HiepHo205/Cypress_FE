"use client";

import { Loading } from "@/src/components/common";
import type {
  CaseStudyBannerProps,
  CaseStudyBanner as CaseStudyBannerType,
} from "../types/case-study.types";
export default function CaseStudyBanner({ banner }: CaseStudyBannerProps) {
  if (!banner) {
    return (
      <section className="relative min-h-[220px] w-full bg-[#f1f5fb]">
        <Loading show={true} message="Loading..." fullScreen={false} />
      </section>
    );
  }

  return (
    <section className="w-full bg-[#f1f5fb]">
      <div className="mx-auto flex min-h-[220px] w-full max-w-[1440px] flex-col items-center justify-center px-6 py-8">
        <div className="flex items-center gap-2 font-['Inter'] text-[16px] font-medium leading-[16px] text-[#757575]">
          <a
            href={banner.breadcrumb_first_url || "/"}
            className="transition hover:text-[#4f88d6]"
          >
            {banner.breadcrumb_first}
          </a>

          <span>/</span>

          <a
            href={banner.breadcrumb_second_url || "/case-studies"}
            className="transition hover:text-[#4f88d6]"
          >
            {banner.breadcrumb_second}
          </a>
        </div>

        <h1 className="mt-4 h-[40px] w-full max-w-[948px] text-center font-['Inter'] text-[26px] font-bold leading-[40px] tracking-normal text-[#232323]">
          {banner.title}
        </h1>

        <p className="mt-4 w-full max-w-[948px] text-center font-['Inter'] text-[16px] font-normal leading-[28px] text-[#757575]">
          {banner.description}
        </p>
      </div>
    </section>
  );
}
