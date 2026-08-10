"use client";

import Image from "next/image";
import Link from "next/link";
import { useHome } from "../hooks/useHome";
import { Loading } from "@/src/components/common";

export default function HeroSection() {
  const { homepage, loading } = useHome();

  const hero = homepage?.banner;

  if (loading) {
    return (
      <section className="relative min-h-[574px]">
        <Loading show message="Loading banner..." fullScreen={false} />
      </section>
    );
  }

  if (!hero) return null;

  return (
    <section className="relative min-h-[574px] overflow-hidden">
      {hero.image?.url && (
        <Image
          src={hero.image.url}
          fill
          alt={hero.title || "Homepage banner"}
          className="object-cover"
          priority
        />
      )}

      <div className="absolute inset-0 bg-black/40" />

      <div className="absolute inset-0 overflow-y-auto">
        <div className="mx-auto flex min-h-[574px] w-full max-w-[1210px] items-center px-6 py-16 text-white">
          <div className="max-w-[789px]">
            <h1 className="text-[64px] font-bold leading-[90px]">
              {hero.title}
            </h1>

            <p className="mt-4 text-[16px] font-medium leading-[30px]">
              {hero.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              {hero.primary_button_text && hero.primary_button_url && (
                <Link
                  href={hero.primary_button_url}
                  className="flex h-16 w-[194px] items-center justify-center rounded-lg bg-[#6C9ADB] text-[18px] font-semibold text-white transition hover:bg-[#2B71D3]"
                >
                  {hero.primary_button_text}
                </Link>
              )}

              {hero.secondary_button_text && hero.secondary_button_url && (
                <Link
                  href={hero.secondary_button_url}
                  className="flex h-16 w-[194px] items-center justify-center rounded-lg bg-[#D6D6D6] text-[18px] font-semibold text-[#232323] transition hover:bg-[#F5F5F5]"
                >
                  {hero.secondary_button_text}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
