"use client";

import Link from "next/link";

import { useCaseStudy } from "@/src/modules/case-study/hooks/useCaseStudy";
import { Loading } from "@/src/components/common";
import type {
  CaseStudyItem,
  RelatedArticlesProps,
} from "../types/case-study.types";

function getImageUrl(image: unknown): string {
  if (!image) {
    return "";
  }

  if (typeof image === "string") {
    return image;
  }

  if (typeof image === "object" && image !== null && "url" in image) {
    const url = (image as { url?: unknown }).url;

    return typeof url === "string" ? url : "";
  }

  return "";
}

function getDescription(item: CaseStudyItem): string {
  if (typeof item.description === "string" && item.description.trim()) {
    return item.description.trim();
  }

  return "";
}

function getCategories(item: CaseStudyItem): string[] {
  if (!Array.isArray(item.categories)) {
    return [];
  }

  return item.categories.filter(
    (category): category is string => typeof category === "string",
  );
}

export default function RelatedArticles({ currentId }: RelatedArticlesProps) {
  const { caseStudy, loading, error } = useCaseStudy();

  if (loading) {
    return (
      <section className="w-full bg-[#F4F7FD] py-8">
        <div className="mx-auto flex min-h-[200px] w-full max-w-[1200px] items-center justify-center px-5">
          <Loading show />
        </div>
      </section>
    );
  }

  if (error || !caseStudy?.caseStudies?.length) {
    return null;
  }

  const relatedArticles = caseStudy.caseStudies
    .filter((article) => String(article.id) !== String(currentId))
    .slice(0, 4);

  if (relatedArticles.length === 0) {
    return null;
  }

  return (
    <section className="w-full bg-[#F4F7FD] py-8">
      <div className="mx-auto w-full max-w-[1200px] px-5">
        <div className="mb-7 flex items-center justify-between">
          <h2
            className="
                            text-[32px]
                            font-bold
                            leading-[1.2]
                            tracking-[-0.8px]
                            text-[#292929]
                        "
          >
            Related Articles
          </h2>

          <Link
            href="/case-studies"
            className="
                            inline-flex
                            h-[43px]
                            items-center
                            justify-center
                            rounded-[7px]
                            bg-[#3478D5]
                            px-5
                            text-[14px]
                            font-semibold
                            text-white
                            shadow-[0_2px_5px_rgba(52,120,213,0.2)]
                            transition
                            hover:bg-[#286BC6]
                        "
          >
            All case study
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {relatedArticles.map((article) => {
            const logo = getImageUrl(article.logo);
            const description = getDescription(article);
            const categories = getCategories(article);

            return (
              <Link
                key={article.id}
                href={`/case-studies/${article.id}`}
                className="
                                    group
                                    flex
                                    min-h-[153px]
                                    w-full
                                    rounded-[15px]
                                    border
                                    border-[#E4EBF5]
                                    bg-white
                                    p-[21px]
                                    shadow-[0_2px_8px_rgba(36,73,125,0.08)]
                                    transition
                                    hover:-translate-y-[1px]
                                    hover:shadow-[0_5px_15px_rgba(36,73,125,0.12)]
                                "
              >
                <div className="mr-[14px] shrink-0">
                  <div
                    className="
                                            flex
                                            h-[59px]
                                            w-[59px]
                                            items-center
                                            justify-center
                                            overflow-hidden
                                            rounded-[7px]
                                            border
                                            border-[#D9D9D9]
                                            bg-white
                                        "
                  >
                    {logo ? (
                      <img
                        src={logo}
                        alt={article.title}
                        className="
                                                    h-full
                                                    w-full
                                                    object-contain
                                                    p-2
                                                "
                      />
                    ) : (
                      <span
                        className="
                                                    text-[20px]
                                                    font-bold
                                                    tracking-[-1px]
                                                    text-[#C82333]
                                                "
                      >
                        QMS
                      </span>
                    )}
                  </div>
                </div>

                <div className="min-w-0 flex-1">
                  <h3
                    className="
                                            truncate
                                            text-[17px]
                                            font-bold
                                            leading-[1.4]
                                            text-[#292929]
                                            transition-colors
                                            group-hover:text-[#246BCE]
                                        "
                  >
                    {article.title}
                  </h3>

                  {description && (
                    <p
                      className="
                                                mt-[5px]
                                                line-clamp-2
                                                text-[13px]
                                                leading-[1.7]
                                                text-[#858585]
                                            "
                    >
                      {description}
                    </p>
                  )}

                  {categories.length > 0 && (
                    <div className="mt-[7px] flex flex-wrap gap-2">
                      {categories.slice(0, 2).map((category, index) => (
                        <span
                          key={`${category}-${index}`}
                          className="
                                                                inline-flex
                                                                h-[29px]
                                                                items-center
                                                                rounded-full
                                                                border
                                                                border-[#AFCBF3]
                                                                bg-[#F0F6FE]
                                                                px-[11px]
                                                                text-[12px]
                                                                font-medium
                                                                text-[#246BCE]
                                                            "
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
