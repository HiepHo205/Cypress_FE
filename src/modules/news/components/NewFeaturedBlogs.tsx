"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

import type { NewsPage, NewsPageItem } from "../types/news.types";

import Pagination from "@/src/components/common/Pagination";

const ITEMS_PER_PAGE = 9;

interface NewFeaturedBlogsProps {
  news: NewsPage;
  selectedCategory?: string;
  search?: string;
}

export default function NewFeaturedBlogs({
  news,
  selectedCategory = "All Posts",
  search = "",
}: NewFeaturedBlogsProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const safeCategory = selectedCategory || "All Posts";

  const safeSearch = search || "";

  const filteredBlogs = useMemo(() => {
    const keyword = safeSearch.trim().toLowerCase();

    const category = safeCategory.trim().toLowerCase();

    return (news?.featured ?? []).filter((blog) => {
      const blogCategory = blog.category?.trim().toLowerCase() ?? "";

      const matchCategory =
        category === "all posts" || blogCategory === category;

      const matchSearch =
        !keyword ||
        blog.title?.toLowerCase().includes(keyword) ||
        blog.description?.toLowerCase().includes(keyword) ||
        blog.category?.toLowerCase().includes(keyword);

      return matchCategory && matchSearch;
    });
  }, [news, safeCategory, safeSearch]);

  const totalPages = Math.ceil(filteredBlogs.length / ITEMS_PER_PAGE);

  const currentBlogs = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

    return filteredBlogs.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredBlogs, currentPage]);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) {
      return;
    }

    setCurrentPage(page);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <section className="w-full bg-[#f5f8fc]">
      <div className="mx-auto w-full max-w-[1200px]">
        <div className="px-6 py-12 sm:px-8 lg:px-0 lg:py-16">
          <h2 className="mb-8 font-['Inter'] text-[32px] font-bold leading-[40px] tracking-[-0.5px] text-[#242424] sm:text-[36px] sm:leading-[44px]">
            {news?.newsletter?.title2}
          </h2>

          {filteredBlogs.length === 0 ? (
            <div className="py-20 text-center">
              <p className="font-['Inter'] text-[16px] text-[#777]">
                No featured blogs found.
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
                {currentBlogs.map((blog) => (
                  <BlogCard key={blog.id} blog={blog} />
                ))}
              </div>

              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}

function BlogCard({ blog }: { blog: NewsPageItem }) {
  return (
    <article className="group min-w-0">
      <div className="relative h-[220px] w-full overflow-hidden rounded-xl bg-[#eeeeee] sm:h-[230px] lg:h-[240px]">
        {blog.image?.url ? (
          <Image
            src={blog.image.url}
            alt={blog.title || "Featured blog"}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="h-full w-full bg-[#eeeeee]" />
        )}
      </div>

      <div className="mt-4 flex items-center justify-between gap-3">
        <span className="font-['Inter'] text-[14px] font-medium leading-5 text-[#888]">
          {blog.date}
        </span>

        <span className="shrink-0 rounded-full border border-[#b8d5f5] bg-[#f5f9ff] px-3 py-1 font-['Inter'] text-[12px] font-medium leading-4 text-[#4c8bd9]">
          {blog.category || "Uncategorized"}
        </span>
      </div>

      <h3 className="mt-3 line-clamp-2 font-['Inter'] text-[18px] font-bold leading-6 tracking-[-0.1px] text-[#222]">
        {blog.title}
      </h3>

      {blog.description && (
        <p className="mt-2 line-clamp-2 font-['Inter'] text-[14px] font-medium leading-5 text-[#777]">
          {blog.description}
        </p>
      )}
    </article>
  );
}
