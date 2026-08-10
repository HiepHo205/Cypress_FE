"use client";

import Image from "next/image";
import { useHome } from "../hooks/useHome";
import { Loading } from "@/src/components/common";

export default function HomeSuccessStories() {
  const { homepage, loading } = useHome();

  const successStories = homepage?.successStories?.successStories ?? [];

  if (loading) {
    return (
      <section className="relative min-h-[560px] w-full bg-[#F8F9FB] py-20">
        <Loading show fullScreen={false} message="Loading success stories..." />
      </section>
    );
  }

  return (
    <section className="w-full bg-[#F8F9FB] py-20">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="mb-12 text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-[#2563EB]">
            Our Partners
          </p>

          <h2 className="mt-3 text-[36px] font-bold text-[#111827]">
            Ecosystem Success Stories
          </h2>

          <p className="mt-3 text-[#6B7280]">
            See how startups are thriving with us
          </p>
        </div>

        {successStories.length === 0 ? (
          <div className="py-20 text-center text-gray-500">
            No success stories available.
          </div>
        ) : (
          <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
            {successStories.slice(0, 6).map((item) => (
              <div
                key={item.id}
                className="group relative h-[560px] w-full overflow-hidden rounded-2xl"
              >
                {item.avatar?.url ? (
                  <div className="absolute inset-0 overflow-hidden">
                    <Image
                      src={item.avatar.url}
                      alt={item.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover object-center transition-transform duration-500 ease-in-out group-hover:scale-110"
                    />
                  </div>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-300">
                    No Image
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-[20px] font-bold leading-7">
                    {item.name}
                  </h3>

                  <p className="mt-1 text-sm text-gray-200">
                    {item.role} - {item.company}
                  </p>

                  <div className="my-4 h-px bg-white/30" />

                  <p className="line-clamp-4 text-[16px] italic leading-7">
                    {item.quote}
                  </p>

                  <p className="mt-4 text-xs text-gray-200">
                    {item.categories?.join(" | ")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
