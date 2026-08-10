"use client";

import Image from "next/image";
import { useHome } from "../hooks/useHome";
import { Loading } from "@/src/components/common";

export default function HomeCaseStudy() {
  const { homepage, loading } = useHome();

  const caseStudies = homepage?.caseStudies?.caseStudies ?? [];

  if (loading) {
    return (
      <section className="relative min-h-[560px] bg-white">
        <Loading show fullScreen={false} message="Loading case studies..." />
      </section>
    );
  }

  return (
    <section className="bg-white py-20">
      <div
        className="
          mx-auto
          h-[560px]
          max-w-[996px]
          space-y-10
          overflow-y-auto
          bg-white
          scrollbar-hide
        "
      >
        {caseStudies.map((item) => (
          <div
            key={item.id}
            className="
              rounded-[12px]
              border
              border-[#EEEEEE]
              bg-white
              px-8
              py-8
              shadow-[0_8px_24px_rgba(0,0,0,0.06)]
            "
          >
            <div className="flex items-start gap-6">
              <div
                className="
                  flex
                  h-16
                  w-16
                  shrink-0
                  items-center
                  justify-center
                  overflow-hidden
                  rounded-lg
                  border
                  border-[#E5E5E5]
                  bg-white
                "
              >
                {item.logo?.url && (
                  <Image
                    src={item.logo.url}
                    alt={item.title}
                    width={64}
                    height={64}
                    className="h-full w-full object-contain"
                  />
                )}
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span
                    className="
                      text-[20px]
                      font-bold
                      uppercase
                      text-[#757575]
                    "
                  >
                    {item.label}:
                  </span>

                  <span className="text-[16px] text-[#232323]">
                    {item.title}
                  </span>
                </div>

                <p
                  className="
                    mt-3
                    text-[16px]
                    leading-7
                    text-[#757575]
                  "
                >
                  {item.summary}

                  {item.learnMoreUrl && (
                    <a
                      href={item.learnMoreUrl}
                      className="
                        ml-1
                        font-medium
                        text-[#4B8EF7]
                        hover:underline
                      "
                    >
                      {item.learnMoreText} →
                    </a>
                  )}
                </p>

                <div
                  className="
                    mt-4
                    flex
                    flex-wrap
                    items-center
                    gap-2
                    text-[14px]
                    text-[#757575]
                  "
                >
                  <span className="font-semibold uppercase">
                    {item.planTitle}:
                  </span>

                  {item.seriesTags?.split(",").map((tag, index, arr) => (
                    <span key={index}>
                      {tag.trim()}
                      {index < arr.length - 1 && " | "}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {item.image?.url && (
              <div className="mt-8">
                <Image
                  src={item.image.url}
                  alt={item.title}
                  width={932}
                  height={392}
                  className="
                    h-[392px]
                    w-full
                    rounded-[8px]
                    object-cover
                  "
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
