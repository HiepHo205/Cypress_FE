"use client";

import Image from "next/image";
import { useMemo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { useCaseStudy } from "@/src/modules/case-study/hooks/useCaseStudy";
import { Loading } from "@/src/components/common";
import {
  CaseStudyBanner,
  CaseStudyDetailProps,
  CaseStudySection,
  CaseStudyTableOfContentsChild,
  CaseStudyTableOfContentsItem,
} from "../types/case-study.types";
import RelatedArticles from "./RelatedArticles";

function parseObject<T>(value: unknown): T | null {
  if (!value) {
    return null;
  }

  if (typeof value === "object") {
    return value as T;
  }

  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);

      if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
        return parsed as T;
      }

      return null;
    } catch {
      return null;
    }
  }

  return null;
}

function parseArray<T>(value: unknown): T[] {
  if (Array.isArray(value)) {
    return value as T[];
  }

  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);

      return Array.isArray(parsed) ? (parsed as T[]) : [];
    } catch {
      return [];
    }
  }

  return [];
}

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

function getTitle(
  value:
    | {
        title?: string;
        label?: string;
        heading?: string;
      }
    | null
    | undefined,
): string {
  if (typeof value?.title === "string" && value.title.trim()) {
    return value.title.trim();
  }

  if (typeof value?.heading === "string" && value.heading.trim()) {
    return value.heading.trim();
  }

  if (typeof value?.label === "string" && value.label.trim()) {
    return value.label.trim();
  }

  return "";
}

function getContent(section: CaseStudySection): string {
  if (typeof section.content === "string" && section.content.trim()) {
    return section.content.trim();
  }

  if (typeof section.description === "string" && section.description.trim()) {
    return section.description.trim();
  }

  return "";
}

function getMainSectionNumber(section: CaseStudySection): number | null {
  if (!section?.id) {
    return null;
  }

  const match = section.id.match(/content-(\d+)(?:-\d+)?$/);

  if (!match) {
    return null;
  }

  return Number(match[1]);
}

function getSectionNumber(section: CaseStudySection): string | null {
  if (!section?.id) {
    return null;
  }

  const match = section.id.match(/content-(\d+)(?:-(\d+))?$/);

  if (!match) {
    return null;
  }

  const mainNumber = match[1];
  const childNumber = match[2];

  if (childNumber) {
    return `${mainNumber}.${childNumber}`;
  }

  return mainNumber;
}

function isSubSection(section: CaseStudySection): boolean {
  if (!section?.id) {
    return false;
  }

  return /content-\d+-\d+$/.test(section.id);
}

function formatDate(date: string | null): string {
  if (!date) {
    return "";
  }

  const parsedDate = new Date(`${date}T00:00:00`);

  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(parsedDate);
}

export default function CaseStudyDetail({ id }: CaseStudyDetailProps) {
  const params = useParams();

  const locale = typeof params?.locale === "string" ? params.locale : "vi";

  const { caseStudy, loading, error } = useCaseStudy();

  const currentCaseStudy = useMemo(() => {
    if (!caseStudy) {
      return undefined;
    }

    const item = caseStudy.caseStudies?.find(
      (caseStudyItem) => String(caseStudyItem.id) === String(id),
    );

    const detail = caseStudy.caseStudyDetail;

    if (detail && item && String(detail.id) === String(item.id)) {
      return {
        ...item,
        ...detail,
      };
    }

    return item;
  }, [caseStudy, id]);

  const banner = useMemo<Partial<CaseStudyBanner>>(() => {
    return parseObject<CaseStudyBanner>(caseStudy?.banner) ?? {};
  }, [caseStudy]);

  const currentIndex = useMemo(() => {
    if (!caseStudy?.caseStudies) {
      return -1;
    }

    return caseStudy.caseStudies.findIndex(
      (item) => String(item.id) === String(id),
    );
  }, [caseStudy, id]);

  const previousCaseStudy = useMemo(() => {
    if (!caseStudy?.caseStudies?.length || currentIndex === -1) {
      return null;
    }

    const items = caseStudy.caseStudies;

    return items[(currentIndex - 1 + items.length) % items.length];
  }, [caseStudy, currentIndex]);

  const nextCaseStudy = useMemo(() => {
    if (!caseStudy?.caseStudies?.length || currentIndex === -1) {
      return null;
    }

    const items = caseStudy.caseStudies;

    return items[(currentIndex + 1) % items.length];
  }, [caseStudy, currentIndex]);

  const sections = useMemo<CaseStudySection[]>(() => {
    if (!currentCaseStudy) {
      return [];
    }

    const parsedSections = parseArray<CaseStudySection>(
      currentCaseStudy.sections,
    );

    return [...parsedSections].sort(
      (a, b) => Number(a?.order ?? 0) - Number(b?.order ?? 0),
    );
  }, [currentCaseStudy]);

  const mainSections = useMemo(() => {
    return sections
      .filter((section) => !isSubSection(section))
      .sort((a, b) => {
        const aNumber = getMainSectionNumber(a) ?? 0;

        const bNumber = getMainSectionNumber(b) ?? 0;

        return aNumber - bNumber;
      });
  }, [sections]);

  const tableOfContents = useMemo<CaseStudyTableOfContentsItem[]>(() => {
    if (!currentCaseStudy) {
      return [];
    }

    const parsedToc = parseArray<CaseStudyTableOfContentsItem>(
      currentCaseStudy.tableOfContents,
    );

    return [...parsedToc].sort(
      (a, b) => Number(a?.order ?? 0) - Number(b?.order ?? 0),
    );
  }, [currentCaseStudy]);

  const categories = useMemo<string[]>(() => {
    if (!currentCaseStudy || !Array.isArray(currentCaseStudy.categories)) {
      return [];
    }

    return currentCaseStudy.categories.filter(
      (item): item is string => typeof item === "string",
    );
  }, [currentCaseStudy]);

  const seriesTags = useMemo<string[]>(() => {
    if (!currentCaseStudy || !Array.isArray(currentCaseStudy.seriesTags)) {
      return [];
    }

    return currentCaseStudy.seriesTags.filter(
      (item): item is string => typeof item === "string",
    );
  }, [currentCaseStudy]);

  const socialMedia = useMemo(() => {
    if (!currentCaseStudy) {
      return [];
    }

    return parseArray<{
      name?: string;
      icon?: unknown;
      url?: string;
    }>(currentCaseStudy.social_media).filter(
      (item) =>
        item &&
        typeof item.name === "string" &&
        typeof item.url === "string" &&
        item.url.trim() !== "",
    );
  }, [currentCaseStudy]);

  const author =
    typeof currentCaseStudy?.author === "string" ? currentCaseStudy.author : "";

  const authorLogo = useMemo(() => {
    return getImageUrl(currentCaseStudy?.logo);
  }, [currentCaseStudy]);

  const getTocChildren = (
    tocItem: CaseStudyTableOfContentsItem | undefined,
  ): Array<CaseStudyTableOfContentsChild | string> => {
    if (!tocItem) {
      return [];
    }

    return parseArray<CaseStudyTableOfContentsChild | string>(
      tocItem.children ??
        tocItem.subItems ??
        tocItem.subsections ??
        tocItem.items,
    );
  };

  const getSubSections = (
    mainSection: CaseStudySection,
  ): CaseStudySection[] => {
    const mainNumber = getMainSectionNumber(mainSection);

    if (mainNumber === null) {
      return [];
    }

    return sections
      .filter((section) => {
        if (!isSubSection(section)) {
          return false;
        }

        return getMainSectionNumber(section) === mainNumber;
      })
      .sort((a, b) => Number(a?.order ?? 0) - Number(b?.order ?? 0));
  };

  if (loading) {
    return <Loading show fullScreen />;
  }

  if (error) {
    return (
      <main className="flex min-h-[400px] items-center justify-center px-5">
        <p className="text-sm text-red-500">{error}</p>
      </main>
    );
  }

  if (!caseStudy) {
    return (
      <main className="flex min-h-[500px] flex-col items-center justify-center gap-4 px-5">
        <p className="text-sm text-gray-500">Case study data is unavailable.</p>

        <Link
          href={`/${locale}/case-studies`}
          className="text-sm underline underline-offset-4"
        >
          Back to Case Studies
        </Link>
      </main>
    );
  }

  if (!currentCaseStudy) {
    return (
      <main className="flex min-h-[500px] flex-col items-center justify-center gap-4 px-5">
        <p className="text-sm text-gray-500">Case study not found.</p>

        <Link
          href={`/${locale}/case-studies`}
          className="text-sm underline underline-offset-4"
        >
          Back to Case Studies
        </Link>
      </main>
    );
  }

  return (
    <main className="bg-white text-[#292929]">
      <section className="px-5 pt-5">
        <div className="mx-auto w-full max-w-[791px]">
          <div className="flex flex-wrap items-center gap-x-2 text-[12px] leading-5 text-[#858585]">
            <Link
              href={banner.breadcrumb_first_url || "/"}
              className="transition-colors hover:text-[#292929]"
            >
              {banner.breadcrumb_first || ""}
            </Link>

            <span>/</span>

            <Link
              href={banner.breadcrumb_second_url || `/${locale}/case-studies`}
              className="transition-colors hover:text-[#292929]"
            >
              {banner.breadcrumb_second || ""}
            </Link>

            <span>/</span>

            <span className="truncate text-[#9B9B9B]">
              {currentCaseStudy.title}
            </span>
          </div>

          <h1
            className="
                            mt-3
                            max-w-[791px]
                            text-[30px]
                            font-bold
                            leading-[1.12]
                            tracking-[-0.8px]
                            text-[#292929]
                            sm:text-[38px]
                            lg:text-[40px]
                        "
          >
            {currentCaseStudy.title}
          </h1>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              {currentCaseStudy.date && (
                <span className="mr-1 text-[12px] text-[#858585]">
                  {formatDate(currentCaseStudy.date)}
                </span>
              )}

              {categories.map((category, categoryIndex) => (
                <span
                  key={`${category}-${categoryIndex}`}
                  className="
                                            rounded-full
                                            border
                                            border-[#BFD8FA]
                                            bg-[#F2F7FD]
                                            px-3
                                            py-[4px]
                                            text-[11px]
                                            font-medium
                                            text-[#246BCE]
                                        "
                >
                  {category}
                </span>
              ))}
            </div>

            {socialMedia.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="mr-1 text-[12px] text-[#858585]">Share</span>

                {socialMedia.map((social, socialIndex) => {
                  const iconUrl = getImageUrl(social.icon);

                  return (
                    <a
                      key={`${social.name}-${socialIndex}`}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Share on ${social.name}`}
                      className="
                                                    flex
                                                    h-7
                                                    w-7
                                                    items-center
                                                    justify-center
                                                    rounded-full
                                                    border
                                                    border-[#E2E2E2]
                                                    text-[12px]
                                                    font-semibold
                                                    text-[#666]
                                                    transition
                                                    hover:border-[#292929]
                                                    hover:text-[#292929]
                                                "
                    >
                      {iconUrl ? (
                        <img
                          src={iconUrl}
                          alt={social.name || "Social media"}
                          width={16}
                          height={16}
                          className="h-4 w-4 object-contain"
                        />
                      ) : (
                        <span>{social.name?.charAt(0).toUpperCase()}</span>
                      )}
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          <div className="mt-5 h-px bg-[#E5E5E5]" />

          <div className="flex min-h-[68px] flex-wrap items-center justify-between gap-5">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-[5px] border border-[#E0E0E0] bg-white">
                {authorLogo ? (
                  <Image
                    src={authorLogo}
                    alt={author || "Author"}
                    width={36}
                    height={36}
                    className="h-full w-full object-contain p-1"
                  />
                ) : (
                  <span className="text-[10px] font-bold text-[#D12B36]">
                    QMS
                  </span>
                )}
              </div>

              <span className="text-[13px] font-semibold text-[#292929]">
                {author}
              </span>
            </div>

            {seriesTags.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 text-[11px] text-[#858585]">
                <span className="font-semibold uppercase">SERIES A PLAN:</span>

                {seriesTags.map((tag, tagIndex) => (
                  <span
                    key={`${tag}-${tagIndex}`}
                    className="flex items-center gap-2"
                  >
                    {tagIndex > 0 && <span className="text-[#C7C7C7]">|</span>}

                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {tableOfContents.length > 0 && (
        <section className="px-5 pb-8 pt-2">
          <div className="mx-auto flex justify-center">
            <div className="w-full max-w-[636px] overflow-hidden rounded-[16px] border border-[#D6D6D6] px-6 py-4">
              <div className="mb-2 text-[11px] font-medium uppercase tracking-[0.2px] text-[#246BCE]">
                Table of Content
              </div>

              <div className="space-y-0.5 overflow-hidden">
                {tableOfContents.map((item, index) => {
                  const sectionNumber = index + 1;

                  const sectionTitle = getTitle(item);

                  const sectionId = `content-${sectionNumber}`;

                  const children = getTocChildren(item);

                  return (
                    <div key={item.id ?? sectionId}>
                      <a
                        href={`#${sectionId}`}
                        className="block truncate text-[13px] font-medium leading-6 text-[#292929] transition-colors hover:text-[#246BCE]"
                      >
                        {sectionNumber} {sectionTitle}
                      </a>

                      {children.length > 0 && (
                        <div className="ml-5">
                          {children.map((child, childIndex) => {
                            const childTitle =
                              typeof child === "string"
                                ? child
                                : getTitle(child);

                            const childId = `content-${sectionNumber}-${childIndex + 1}`;

                            return (
                              <a
                                key={childId}
                                href={`#${childId}`}
                                className="block truncate text-[12px] leading-6 text-[#858585] transition-colors hover:text-[#246BCE]"
                              >
                                {sectionNumber}.{childIndex + 1} {childTitle}
                              </a>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="px-5 pb-12">
        <article className="mx-auto w-full max-w-[791px] overflow-hidden rounded-[16px] bg-white px-6 py-4">
          {mainSections.length > 0 ? (
            <div className="space-y-8">
              {mainSections.map((section) => {
                const actualSectionNumber = getMainSectionNumber(section);

                const sectionNumber = actualSectionNumber ?? 0;

                const sectionId = section.id ?? `content-${sectionNumber}`;

                const tocItem =
                  tableOfContents.find(
                    (item) => Number(item.order ?? 0) === sectionNumber,
                  ) ?? tableOfContents[sectionNumber - 1];

                const titleFromSection = getTitle(section);

                const titleFromToc = getTitle(tocItem);

                const title = titleFromSection || titleFromToc;

                const content = getContent(section);

                const image = getImageUrl(section.image);

                const subSections = getSubSections(section);

                return (
                  <section
                    key={sectionId}
                    id={sectionId}
                    className="scroll-mt-10"
                  >
                    {title && (
                      <h2 className="mb-1 text-[15px] font-semibold leading-6 text-[#292929]">
                        {sectionNumber}. {title}
                      </h2>
                    )}

                    {content && (
                      <div
                        className="text-[12px] leading-[1.75] text-[#747474] [&_p]:mb-4 [&_p:last-child]:mb-0 [&_strong]:font-semibold [&_strong]:text-[#292929] [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:mb-4 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:mb-1"
                        dangerouslySetInnerHTML={{
                          __html: content,
                        }}
                      />
                    )}

                    {subSections.length > 0 && (
                      <div className="mt-5 space-y-5">
                        {subSections.map((child) => {
                          const childNumber = getSectionNumber(child) ?? "";

                          const childTitle = getTitle(child);

                          const childContent = getContent(child);

                          const childImage = getImageUrl(child.image);

                          const childId =
                            child.id ??
                            `content-${childNumber.replace(".", "-")}`;

                          return (
                            <div
                              key={childId}
                              id={childId}
                              className="scroll-mt-10"
                            >
                              {childTitle && (
                                <h3 className="mb-1 text-[13px] font-semibold leading-6 text-[#292929]">
                                  {childNumber} {childTitle}
                                </h3>
                              )}

                              {childContent && (
                                <div
                                  className="text-[12px] leading-[1.75] text-[#747474] [&_p]:mb-4 [&_p:last-child]:mb-0 [&_strong]:font-semibold [&_strong]:text-[#292929] [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:mb-4 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:mb-1"
                                  dangerouslySetInnerHTML={{
                                    __html: childContent,
                                  }}
                                />
                              )}

                              {childImage && (
                                <div className="mt-4 overflow-hidden rounded-[8px]">
                                  <Image
                                    src={childImage}
                                    alt={childTitle || `Content ${childNumber}`}
                                    width={1200}
                                    height={800}
                                    className="block h-auto w-full object-cover"
                                  />
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {image && (
                      <div className="mt-5 overflow-hidden rounded-[8px]">
                        <Image
                          src={image}
                          alt={title || `Content ${sectionNumber}`}
                          width={1200}
                          height={800}
                          className="block h-auto w-full object-cover"
                        />
                      </div>
                    )}
                  </section>
                );
              })}
            </div>
          ) : (
            <div className="py-10 text-center text-[12px] text-[#858585]">
              No content available.
            </div>
          )}
        </article>
      </section>

      <section className="px-5 pb-10">
        <div className="mx-auto w-full max-w-[791px] border-t border-[#E5E5E5] pt-5">
          <div className="flex items-center justify-between gap-8">
            <div className="min-w-0 flex-1">
              {previousCaseStudy ? (
                <Link
                  href={`/${locale}/case-studies/${previousCaseStudy.id}`}
                  className="group flex min-w-0 items-center gap-2"
                >
                  <ArrowLeft
                    size={20}
                    strokeWidth={1.5}
                    className="shrink-0 text-[#858585] transition-transform group-hover:-translate-x-1"
                  />

                  <div className="min-w-0 truncate text-[13px] leading-5">
                    <span className="mr-2 text-[#858585]">Previous:</span>

                    <span className="font-medium text-[#292929]">
                      {previousCaseStudy.title}
                    </span>
                  </div>
                </Link>
              ) : (
                <span className="invisible">Previous</span>
              )}
            </div>

            <div className="min-w-0 flex-1">
              {nextCaseStudy ? (
                <Link
                  href={`/${locale}/case-studies/${nextCaseStudy.id}`}
                  className="group flex min-w-0 items-center justify-end gap-2 text-right"
                >
                  <div className="min-w-0 truncate text-[13px] leading-5">
                    <span className="mr-2 text-[#858585]">Next:</span>

                    <span className="font-medium text-[#292929]">
                      {nextCaseStudy.title}
                    </span>
                  </div>

                  <ArrowRight
                    size={20}
                    strokeWidth={1.5}
                    className="shrink-0 text-[#858585] transition-transform group-hover:translate-x-1"
                  />
                </Link>
              ) : (
                <span className="invisible">Next</span>
              )}
            </div>
          </div>
        </div>
      </section>

      <RelatedArticles />
    </main>
  );
}
