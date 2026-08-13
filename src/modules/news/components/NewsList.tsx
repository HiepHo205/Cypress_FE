"use client";

import Image from "next/image";
import { useMemo } from "react";

import type { NewsPage, NewsPageItem } from "../types/news.types";

interface NewsListProps {
  news: NewsPage;
  selectedCategory?: string;
  search?: string;
}

const CategoryBadge = ({ category }: { category?: string }) => {
  return (
    <span className="inline-flex shrink-0 items-center rounded-full border border-[#b8d3f4] bg-[#f4f8fe] px-3 py-1 font-['Inter'] text-[12px] font-medium leading-4 text-[#4f8bd8]">
      {category || "Uncategorized"}
    </span>
  );
};

const NewsImage = ({
  item,
  sizes,
  className,
}: {
  item: NewsPageItem;
  sizes: string;
  className: string;
}) => {
  if (!item.image?.url) {
    return <div className={`${className} bg-[#eeeeee]`} />;
  }

  return (
    <div className={className}>
      <Image
        src={item.image.url}
        alt={item.title || "News"}
        fill
        sizes={sizes}
        className="object-cover transition-transform duration-300 hover:scale-105"
      />
    </div>
  );
};

export default function NewsList({
  news,
  selectedCategory = "All Posts",
  search = "",
}: NewsListProps) {
  const filteredNews = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    const category = selectedCategory.trim().toLowerCase();

    return (news?.latest ?? []).filter((item) => {
      const itemCategory = item.category?.trim().toLowerCase() ?? "";

      const matchCategory =
        category === "all posts" || itemCategory === category;

      const matchSearch =
        !keyword ||
        item.title?.toLowerCase().includes(keyword) ||
        item.description?.toLowerCase().includes(keyword) ||
        item.category?.toLowerCase().includes(keyword);

      return matchCategory && matchSearch;
    });
  }, [news, selectedCategory, search]);

  const [mainNews, ...restNews] = filteredNews;

  const middleNews = restNews.slice(0, 2);
  const sideNews = restNews.slice(2, 7);

  return (
    <section className="w-full bg-[#fffafa]">
      <div className="mx-auto w-full max-w-[1200px] px-6 pb-12 pt-6 sm:px-8 lg:px-0 lg:pb-16">
        <h2 className="mb-6 font-['Inter'] text-[32px] font-bold leading-[40px] tracking-[-0.5px] text-[#292929] sm:text-[36px] sm:leading-[44px]">
          {news?.newsletter?.title1}
        </h2>

        {!mainNews ? (
          <div className="py-20 text-center">
            <p className="font-['Inter'] text-[16px] text-[#777]">
              No news found.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 lg:h-[620px] lg:grid-cols-[1.45fr_0.9fr_1.15fr]">
            <article className="flex h-full min-w-0 flex-col overflow-hidden rounded-xl bg-white">
              <NewsImage
                item={mainNews}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="relative h-[300px] shrink-0 overflow-hidden sm:h-[340px] lg:h-[330px]"
              />

              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-center justify-between gap-4">
                  <span className="font-['Inter'] text-[14px] text-[#777]">
                    {mainNews.date}
                  </span>

                  <CategoryBadge category={mainNews.category} />
                </div>

                <h3 className="mt-3 line-clamp-3 font-['Inter'] text-[22px] font-bold leading-[30px] text-[#292929]">
                  {mainNews.title}
                </h3>

                {mainNews.description && (
                  <p className="mt-3 line-clamp-5 font-['Inter'] text-[15px] leading-6 text-[#666]">
                    {mainNews.description}
                  </p>
                )}
              </div>
            </article>

            <div className="grid h-full min-w-0 grid-rows-2 gap-6">
              {middleNews.map((item) => (
                <article
                  key={item.id}
                  className="flex h-full min-w-0 flex-col overflow-hidden rounded-xl bg-white"
                >
                  <NewsImage
                    item={item}
                    sizes="(max-width: 1024px) 100vw, 300px"
                    className="relative h-[170px] shrink-0 overflow-hidden"
                  />

                  <div className="flex flex-1 flex-col p-4">
                    <div className="flex items-center justify-between gap-3">
                      <span className="truncate font-['Inter'] text-[12px] text-[#888]">
                        {item.date}
                      </span>

                      <CategoryBadge category={item.category} />
                    </div>

                    <h3 className="mt-2 line-clamp-3 font-['Inter'] text-[15px] font-bold leading-5 text-[#292929]">
                      {item.title}
                    </h3>

                    {item.description && (
                      <p className="mt-2 line-clamp-3 font-['Inter'] text-[13px] leading-5 text-[#777]">
                        {item.description}
                      </p>
                    )}
                  </div>
                </article>
              ))}
            </div>

            <div className="flex h-full min-w-0 flex-col overflow-hidden rounded-xl bg-white px-5">
              {sideNews.map((item, index) => (
                <article
                  key={item.id}
                  className={`flex min-h-0 flex-1 flex-col justify-center py-4 ${
                    index < sideNews.length - 1
                      ? "border-b border-[#dedede]"
                      : ""
                  }`}
                >
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <span className="font-['Inter'] text-[12px] text-[#888]">
                      {item.date}
                    </span>

                    <CategoryBadge category={item.category} />
                  </div>

                  <h3 className="line-clamp-2 font-['Inter'] text-[14px] font-bold leading-5 text-[#292929]">
                    {item.title}
                  </h3>

                  {item.description && (
                    <p className="mt-1 line-clamp-2 font-['Inter'] text-[12px] leading-5 text-[#777]">
                      {item.description}
                    </p>
                  )}
                </article>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
