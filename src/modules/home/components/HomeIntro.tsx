"use client";

import Image from "next/image";
import { useHome } from "../hooks/useHome";
import { Loading } from "@/src/components/common";

export default function HomeIntro() {
  const { homepage, loading } = useHome();

  const intro = homepage?.introduction;

  if (loading) {
    return (
      <section className="relative flex min-h-[300px] w-full items-center justify-center bg-white">
        <Loading show fullScreen={false} message="Loading introduction..." />
      </section>
    );
  }

  if (!intro) {
    return (
      <section className="w-full bg-white py-20 text-center text-gray-500">
        No introduction data
      </section>
    );
  }

  return (
    <section className="relative w-full bg-white">
      <div className="relative h-[538px] w-full overflow-hidden">
        {intro.image?.url ? (
          <Image
            src={intro.image.url}
            alt={intro.title || "Introduction"}
            fill
            sizes="100vw"
            priority
            className="object-cover object-center"
          />
        ) : (
          <div className="h-full w-full bg-gray-200" />
        )}
      </div>

      <div className="relative z-10 mx-auto -mt-[163px] w-full max-w-[1200px] px-6">
        <div className="rounded-[8px] bg-white p-[40px] shadow-2xl">
          {intro.title && (
            <p
              className="
            whitespace-pre-line
            text-[17px]
            leading-[64px]
            text-[#232323]
            first-letter:float-left
            first-letter:mr-2
            first-letter:text-[52px]
            first-letter:font-bold
            first-letter:leading-none
        "
            >
              {intro.title}
            </p>
          )}

          {intro.description && (
            <p className="whitespace-pre-line text-[16px] leading-[30px] text-[#232323]">
              {intro.description}
            </p>
          )}

          {intro.author && (
            <div className="mt-4 flex justify-end italic text-[#232323]">
              — {intro.author}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
