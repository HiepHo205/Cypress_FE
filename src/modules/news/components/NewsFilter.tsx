"use client";

import type { NewsFilterProps } from "../types/news.types";

const CategoryButton = ({
  category,
  active,
  onClick,
}: {
  category: string;
  active: boolean;
  onClick: () => void;
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-4 py-2 font-['Inter'] text-[14px] font-medium leading-5 transition-all ${
        active
          ? "bg-[#4f8bd8] text-white"
          : "bg-[#f1f1f1] text-[#555] hover:bg-[#e5e5e5]"
      }`}
    >
      {category}
    </button>
  );
};

export default function NewsFilter({
  categories,
  selectedCategory,
  search,
  onCategoryChange,
  onSearchChange,
}: NewsFilterProps) {
  return (
    <section className="w-full bg-[#fffafa]">
      <div className="mx-auto w-full max-w-[1200px] px-6 pt-10 sm:px-8 lg:px-0">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            {categories.map((category) => (
              <CategoryButton
                key={category}
                category={category}
                active={selectedCategory === category}
                onClick={() => onCategoryChange(category)}
              />
            ))}
          </div>

          <div className="relative w-full shrink-0 lg:w-[280px]">
            <svg
              className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#999]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="7" />

              <path d="m20 20-4-4" />
            </svg>

            <input
              type="text"
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search articles..."
              className="h-11 w-full rounded-lg bg-[#f1f1f1] pl-11 pr-4 font-['Inter'] text-[14px] font-medium text-[#333] outline-none placeholder:text-[#999] focus:border-[#c7d9ef] focus:ring-1 focus:ring-[#c7d9ef]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
