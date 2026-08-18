"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";

import { Loading } from "@/src/components/common";
import type {
  CaseStudyGridComponentProps,
  CaseStudyItem,
} from "../types/case-study.types";

function CaseStudyCard({ item }: { item: CaseStudyItem }) {
  const params = useParams();

  const locale = typeof params?.locale === "string" ? params.locale : "vi";

  return (
    <Link
      href={`/${locale}/case-studies/${item.id}`}
      className="block h-full"
      aria-label={`View ${item.title}`}
    >
      <article
        className="
          flex h-full w-full
          cursor-pointer
          gap-4
          rounded-[16px]
          border border-[#e5ebf3]
          bg-white
          p-4
          shadow-[0px_0px_8px_0px_#2B71D31F]
          transition-all
          duration-200
          hover:-translate-y-[2px]
          hover:shadow-[0px_0px_12px_0px_#2B71D32B]

          max-[639px]:
            min-h-0
            flex-col
            gap-3
            rounded-[14px]
            p-3

          sm:min-h-[190px]
          sm:flex-row

          lg:min-h-[197px]
          lg:p-4
        "
      >
        {/* Image */}
        <div
          className="
            relative
            h-[72px]
            w-[72px]
            shrink-0
            overflow-hidden
            rounded-[8px]
            border
            border-[#dfe3e8]
            bg-white
            p-1

            max-[639px]:
              h-[80px]
              w-[80px]

            sm:h-[64px]
            sm:w-[64px]

            lg:h-[72px]
            lg:w-[72px]
          "
        >
          {item.image?.url ? (
            <img
              src={item.image.url}
              alt={item.title}
              className="h-full w-full object-contain"
            />
          ) : (
            <div
              className="
                flex
                h-full
                w-full
                items-center
                justify-center
                text-[9px]
                text-gray-400
              "
            >
              No image
            </div>
          )}
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <h3
            className="
              line-clamp-2
              font-['Inter']
              text-[18px]
              font-bold
              leading-[25px]
              text-[#222]

              sm:text-[18px]
              sm:leading-[26px]

              lg:text-[20px]
              lg:leading-[28px]
            "
          >
            {item.title}
          </h3>

          <p
            className="
              mt-1.5
              line-clamp-3
              font-['Inter']
              text-[13px]
              font-normal
              leading-[21px]
              text-[#737b87]

              sm:mt-2
              sm:line-clamp-2
              sm:text-[13px]
              sm:leading-[22px]

              lg:text-[14px]
              lg:leading-[24px]
            "
          >
            {item.description}
          </p>

          {/* Categories */}
          {item.categories?.length > 0 && (
            <div
              className="
                mt-3
                flex
                flex-wrap
                gap-1.5

                sm:gap-2
              "
            >
              {item.categories.map((category, index) => (
                <span
                  key={`${category}-${index}`}
                  className="
                      flex
                      min-h-[28px]
                      items-center
                      justify-center
                      rounded-[20px]
                      border
                      border-[#2B71D3]
                      bg-[#EAF1FB]
                      px-2.5
                      py-1
                      font-['Inter']
                      text-[11px]
                      font-semibold
                      leading-[18px]
                      text-[#2B71D3]

                      sm:min-h-[30px]
                      sm:px-3
                      sm:text-[12px]
                      sm:leading-[20px]

                      lg:min-h-[32px]
                      lg:text-[14px]
                      lg:leading-[24px]
                    "
                >
                  {category}
                </span>
              ))}
            </div>
          )}
        </div>
      </article>
    </Link>
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
    <div
      className={`
        mt-6
        flex
        items-center
        justify-center
        gap-1

        max-[639px]:mt-5
        ${className}
      `}
    >
      {/* Previous */}
      <button
        type="button"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        aria-label="Previous page"
        className="
          flex
          h-8
          w-8
          shrink-0
          items-center
          justify-center
          rounded-full
          bg-white
          text-gray-400
          transition
          hover:bg-gray-100
          disabled:cursor-not-allowed
          disabled:opacity-50
        "
      >
        <ChevronLeft size={14} />
      </button>

      {/* Pages */}
      <div
        className="
          flex
          max-w-[calc(100vw-100px)]
          items-center
          gap-1
          overflow-x-auto
          scrollbar-none
        "
      >
        {pages.map((page) => (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            aria-label={`Go to page ${page}`}
            aria-current={currentPage === page ? "page" : undefined}
            className={`
              flex
              h-8
              w-8
              shrink-0
              items-center
              justify-center
              rounded-full
              font-['Inter']
              text-[11px]
              transition

              ${
                currentPage === page
                  ? "bg-[#2874d0] font-semibold text-white"
                  : "bg-white text-gray-500 hover:bg-gray-100"
              }
            `}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Next */}
      <button
        type="button"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        aria-label="Next page"
        className="
          flex
          h-8
          w-8
          shrink-0
          items-center
          justify-center
          rounded-full
          bg-white
          text-gray-400
          transition
          hover:bg-gray-100
          disabled:cursor-not-allowed
          disabled:opacity-50
        "
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
    <section
      className="
        relative
        w-full
        shrink-0
        pr-0

        lg:pr-[30px]

        xl:pr-[70px]
      "
    >
      {/* Header */}
      <div
        className="
          mb-5
          flex
          w-full
          items-center
          justify-between
          gap-4

          max-[639px]:
            mb-4
            flex-col
            items-stretch
            gap-3

          sm:flex-row
          sm:items-center

          lg:mb-5
        "
      >
        {/* Results */}
        <p
          className="
            shrink-0
            font-['Inter']
            text-[13px]
            font-normal
            leading-[20px]
            text-[#737b87]

            sm:text-[14px]
          "
        >
          Showing {items.length} of {totalResults} results
        </p>

        {/* Search */}
        <div
          className="
            flex
            h-[44px]
            w-full
            items-center
            rounded-[6px]
            bg-[#f8fafc]
            px-4

            sm:w-[280px]

            lg:w-[318px]
          "
        >
          <input
            type="text"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search"
            aria-label="Search case studies"
            className="
              min-w-0
              flex-1
              bg-transparent
              font-['Inter']
              text-[14px]
              font-normal
              leading-[20px]
              text-[#333]
              outline-none
              placeholder:text-[#a4aab3]
            "
          />

          <Search
            size={18}
            strokeWidth={1.5}
            className="shrink-0 text-[#4b5563]"
          />
        </div>
      </div>
      <div
        className="
          relative
          min-h-[400px]
          w-full

          sm:min-h-[700px]

          lg:min-h-[1065px]
        "
      >
        {!loading && items.length === 0 ? (
          <div
            className="
              flex
              h-[400px]
              w-full
              flex-col
              items-center
              justify-center
              px-4

              sm:h-[500px]
            "
          >
            <div
              className="
                mb-4
                flex
                h-16
                w-16
                items-center
                justify-center
                rounded-full
                bg-[#f1f7ff]
              "
            >
              <Search size={28} strokeWidth={1.5} className="text-[#2874d0]" />
            </div>

            <h3
              className="
                text-center
                font-['Inter']
                text-[17px]
                font-semibold
                text-[#222]

                sm:text-[18px]
              "
            >
              No case studies found
            </h3>

            <p
              className="
                mt-2
                max-w-[400px]
                text-center
                font-['Inter']
                text-[13px]
                text-[#737b87]

                sm:text-[14px]
              "
            >
              {search
                ? `No results found for "${search}".`
                : "There are no case studies available."}
            </p>

            {search && (
              <button
                type="button"
                onClick={() => onSearchChange("")}
                className="
                  mt-4
                  rounded-[6px]
                  bg-[#2874d0]
                  px-4
                  py-2
                  font-['Inter']
                  text-[13px]
                  font-medium
                  text-white
                  transition
                  hover:bg-[#1f62b5]
                "
              >
                Clear search
              </button>
            )}
          </div>
        ) : (
          <div
            className="
              grid
              w-full
              grid-cols-1
              gap-4

              sm:grid-cols-2
              sm:gap-5

              lg:gap-6
            "
          >
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
