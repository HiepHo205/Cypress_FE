"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useHome } from "../hooks/useHome";
import { Loading } from "@/src/components/common";
import HomeSectionNew from "../components/HomeSectionNew";

export default function HomeNews() {
  const { homepage, loading } = useHome();

  const homepageNews = homepage?.news?.news ?? [];
  const homepageSideNews = homepage?.sideNews?.sideNews ?? [];
  const homepageNewsSections = homepage?.newsSections?.sections ?? [];

  const featured = homepageNews[0];

  const startupSection = homepageNewsSections.find(
    (section) =>
      section.key === "startup_news" ||
      section.title?.toLowerCase() === "startup news",
  );

  const workspaceSection = homepageNewsSections.find(
    (section) =>
      section.key === "workspace_trends" ||
      section.title?.toLowerCase() === "workspace trends",
  );

  const startupNews = startupSection?.items ?? [];
  const workspaceNews = workspaceSection?.items ?? [];

  if (loading) {
    return (
      <section className="relative min-h-[581px] w-full bg-white">
        <Loading show fullScreen={false} message="Loading news..." />
      </section>
    );
  }

  if (!featured) {
    return <p className="py-20 text-center text-gray-500">No news found</p>;
  }

  return (
    <section className="w-full bg-white py-10 md:py-20">
      <div className="mx-auto w-full max-w-[1199px] px-4 sm:px-6 md:px-0">
        <HomeSectionNew
          label={homepage?.news?.label ?? ""}
          title={homepage?.news?.title ?? ""}
        />

        <div className="flex w-full flex-col gap-8 md:flex-row md:gap-6">
          <div className="order-2 flex w-full flex-col gap-5 md:order-1 md:w-[266px] md:gap-2">
            {homepageSideNews.map((item) => (
              <div key={item.id} className="w-full md:w-[266px]">
                <div className="relative aspect-[266/150] w-full overflow-hidden rounded-lg md:h-[150px] md:w-[266px]">
                  {item.image?.url && (
                    <Image
                      src={item.image.url}
                      alt={item.description}
                      fill
                      sizes="(max-width: 768px) 100vw, 266px"
                      className="object-cover"
                    />
                  )}
                </div>

                <div className="min-w-0">
                  <p className="mt-2 line-clamp-2 font-inter text-[15px] font-normal leading-6 text-[#757575] md:truncate md:text-[16px] md:leading-7">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="order-1 flex h-auto w-full flex-col gap-4 md:order-2 md:h-[581px] md:w-[555px]">
            <div className="relative aspect-[555/312] w-full overflow-hidden rounded-lg md:h-[312.1875px] md:w-[555px]">
              {featured.image?.url && (
                <Image
                  src={featured.image.url}
                  alt={featured.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 555px"
                  className="object-cover"
                />
              )}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="font-inter text-[14px] font-normal leading-6 text-[#757575] md:text-[16px] md:leading-7">
                {featured.date}
              </span>

              <span className="flex min-h-8 min-w-[80px] items-center justify-center rounded-[20px] border border-[#EAF1FB] bg-[#EAF1FB] px-3 py-1 font-inter text-[14px] font-normal leading-6 text-[#2563EB] md:text-[16px] md:leading-7">
                {featured.category}
              </span>
            </div>

            <h3 className="font-inter text-[18px] font-semibold leading-7 text-[#232323] md:text-[16px]">
              {featured.title}
            </h3>

            <p className="font-inter text-[15px] font-normal leading-6 text-[#757575] md:text-[16px] md:leading-7">
              {featured.description}
            </p>
          </div>

          <div className="order-3 flex h-auto w-full flex-col gap-8 md:h-[542px] md:w-[330px] md:gap-6">
            <div>
              {startupSection?.title && (
                <h3 className="mb-3 font-inter text-[20px] font-semibold leading-7 text-[#232323]">
                  {startupSection.title}
                </h3>
              )}

              <div className="flex flex-col">
                {startupNews.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-3 border-b border-[#E5E7EB] py-3"
                  >
                    <p className="line-clamp-2 flex-1 font-inter text-[14px] font-normal leading-5 text-[#757575]">
                      {item.title}
                    </p>

                    <ChevronRight
                      size={14}
                      className="flex-shrink-0 text-[#BDBDBD]"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div>
              {workspaceSection?.title && (
                <h3 className="mb-3 font-inter text-[20px] font-semibold leading-7 text-[#232323]">
                  {workspaceSection.title}
                </h3>
              )}

              <div className="flex flex-col">
                {workspaceNews.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-3 border-b border-[#E5E7EB] py-3 md:py-4"
                  >
                    <p className="line-clamp-2 flex-1 font-inter text-[14px] font-normal leading-5 text-[#757575] md:leading-6">
                      {item.title}
                    </p>

                    <ChevronRight
                      size={14}
                      className="ml-3 flex-shrink-0 text-[#BDBDBD]"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {startupSection?.buttonText && startupSection?.buttonUrl && (
          <div className="mt-10 flex justify-center">
            <Link
              href={startupSection.buttonUrl}
              className="inline-flex min-w-[120px] items-center justify-center rounded-full border border-[#2563EB] px-6 py-3 font-inter text-[14px] font-medium text-[#2563EB] transition hover:bg-[#2563EB] hover:text-white"
            >
              {startupSection.buttonText}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
