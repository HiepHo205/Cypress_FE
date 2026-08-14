"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { Loading } from "@/src/components/common";
import type {
  CaseStudyGridProps,
  CaseStudyItem,
} from "../types/case-study.types";

interface CaseStudyGridComponentProps extends CaseStudyGridProps {
  search: string;
  onSearchChange: (value: string) => void;
  totalResults: number;
  loading?: boolean;
}

function CaseStudyCard({ item }: { item: CaseStudyItem }) {
  return (
    <article className="flex h-[197px] w-full gap-4 rounded-[16px] border border-[#e5ebf3] bg-white p-4 shadow-[0px_0px_8px_0px_#2B71D31F] transition hover:shadow-[0px_0px_12px_0px_#2B71D32B]">
      <div className="relative h-[64px] w-[64px] shrink-0 overflow-hidden rounded-[8px] border border-[#dfe3e8] bg-white p-1">
        {item.image?.url ? (
          <Image
            src={item.image.url}
            alt={item.title}
            fill
            sizes="64px"
            className="object-contain"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-[9px] text-gray-400">
            No image
          </div>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="h-[56px] w-[311px] max-w-full line-clamp-2 font-['Inter'] text-[20px] font-bold leading-[28px] text-[#222]">
          {item.title}
        </h3>

        <p className="mt-2 h-[56px] w-[311px] max-w-full line-clamp-2 font-['Inter'] text-[14px] font-normal leading-[24px] text-[#737b87]">
          {item.description}
        </p>

        <div className="mt-3 flex flex-wrap gap-2">
          {item.categories.map((category) => (
            <span
              key={category}
              className="flex h-[32px] w-[110px] items-center justify-center rounded-[20px] border border-[#2B71D3] bg-[#EAF1FB] px-3 py-1 font-['Inter'] text-[14px] font-semibold leading-[24px] text-[#2B71D3]"
            >
              {category}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className = "",
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}) {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className={`mt-5 flex items-center justify-center gap-1 ${className}`}>
      <button
        type="button"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-gray-400 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <ChevronLeft size={14} />
      </button>

      {pages.map((page) => (
        <button
          key={page}
          type="button"
          onClick={() => onPageChange(page)}
          className={`flex h-7 w-7 items-center justify-center rounded-full font-['Inter'] text-[11px] transition ${
            currentPage === page
              ? "bg-[#2874d0] font-semibold text-white"
              : "bg-white text-gray-500 hover:bg-gray-100"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        type="button"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-gray-400 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <ChevronRight size={14} />
      </button>
    </div>
  );
}

export default function CaseStudyGrid({
  items,
  currentPage,
  totalPages,
  onPageChange,
  search,
  onSearchChange,
  totalResults,
  loading = false,
}: CaseStudyGridComponentProps) {
  return (
    <section className="relative w-full shrink-0 pr-[70px]">
      <div className="mb-5 flex h-[44px] w-full items-center justify-between">
        <p className="font-['Inter'] text-[14px] font-normal leading-[20px] text-[#737b87]">
          Showing {items.length} of {totalResults} results
        </p>

        <div className="flex h-[44px] w-[318px] shrink-0 items-center rounded-[6px] bg-[#f8fafc] px-4">
          <input
            type="text"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search"
            className="min-w-0 flex-1 bg-transparent font-['Inter'] text-[14px] font-normal leading-[20px] text-[#333] outline-none placeholder:text-[#a4aab3]"
          />

          <Search
            size={18}
            strokeWidth={1.5}
            className="shrink-0 text-[#4b5563]"
          />
        </div>
      </div>

      <div className="relative min-h-[1065px] w-full">
        {!loading && items.length === 0 ? (
          <div className="flex h-[400px] w-full flex-col items-center justify-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#f1f7ff]">
              <Search size={28} strokeWidth={1.5} className="text-[#2874d0]" />
            </div>

            <h3 className="font-['Inter'] text-[18px] font-semibold text-[#222]">
              No case studies found
            </h3>

            <p className="mt-2 text-center font-['Inter'] text-[14px] text-[#737b87]">
              {search
                ? `No results found for "${search}".`
                : "There are no case studies available."}
            </p>

            {search && (
              <button
                type="button"
                onClick={() => onSearchChange("")}
                className="mt-4 rounded-[6px] bg-[#2874d0] px-4 py-2 font-['Inter'] text-[13px] font-medium text-white transition hover:bg-[#1f62b5]"
              >
                Clear search
              </button>
            )}
          </div>
        ) : (
          <div className="grid w-full grid-cols-2 gap-5">
            {items.map((item) => (
              <CaseStudyCard key={item.id} item={item} />
            ))}
          </div>
        )}

        {loading && (
          <Loading show fullScreen={false} message="Loading case studies..." />
        )}
      </div>

      {!loading && totalPages > 1 && (
        <Pagination
          className="mb-5"
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}
    </section>
  );
}
