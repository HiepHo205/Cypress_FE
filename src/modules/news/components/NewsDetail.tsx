"use client";

import Image from "next/image";
import { useMemo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { useNews } from "@/src/modules/news/hooks/useNews";
import { Loading } from "@/src/components/common";

import RelatedArticles from "./RelatedArticles";

import type {
  NewsBanner,
  NewsDetailProps,
  NewsDetailSection,
  NewsPageItem,
  NewsTableOfContentsChild,
  NewsTableOfContentsItem,
} from "../types/news.types";

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

function getContent(section: NewsDetailSection): string {
  if (typeof section.content === "string" && section.content.trim()) {
    return section.content.trim();
  }

  if (typeof section.description === "string" && section.description.trim()) {
    return section.description.trim();
  }

  return "";
}

function getMainSectionNumber(section: NewsDetailSection): number | null {
  if (!section?.id) {
    return null;
  }

  const match = section.id.match(/content-(\d+)(?:-\d+)?$/);

  if (!match) {
    return null;
  }

  return Number(match[1]);
}

function getSectionNumber(section: NewsDetailSection): string | null {
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

function isSubSection(section: NewsDetailSection): boolean {
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

export default function NewsDetail({ id }: NewsDetailProps) {
  const params = useParams();

  const locale = typeof params?.locale === "string" ? params.locale : "vi";

  const { news, loading, error } = useNews();

  const allNews = useMemo<NewsPageItem[]>(() => {
    if (!news) {
      return [];
    }

    const items = [...(news.latest ?? []), ...(news.featured ?? [])];

    return Array.from(
      new Map(items.map((item) => [String(item.id), item])).values(),
    );
  }, [news]);

  const currentNews = useMemo(() => {
    if (!news) {
      return undefined;
    }

    return allNews.find((newsItem) => String(newsItem.id) === String(id));
  }, [news, allNews, id]);

  const banner = useMemo<Partial<NewsBanner>>(() => {
    return parseObject<NewsBanner>(news?.banner) ?? {};
  }, [news]);

  const currentIndex = useMemo(() => {
    if (!allNews.length) {
      return -1;
    }

    return allNews.findIndex((item) => String(item.id) === String(id));
  }, [allNews, id]);

  const previousNews = useMemo(() => {
    if (!allNews.length || currentIndex === -1) {
      return null;
    }

    return allNews[(currentIndex - 1 + allNews.length) % allNews.length];
  }, [allNews, currentIndex]);

  const nextNews = useMemo(() => {
    if (!allNews.length || currentIndex === -1) {
      return null;
    }

    return allNews[(currentIndex + 1) % allNews.length];
  }, [allNews, currentIndex]);

  const sections = useMemo<NewsDetailSection[]>(() => {
    if (!currentNews) {
      return [];
    }

    const parsedSections = parseArray<NewsDetailSection>(currentNews.sections);

    return [...parsedSections].sort(
      (a, b) => Number(a?.order ?? 0) - Number(b?.order ?? 0),
    );
  }, [currentNews]);

  const mainSections = useMemo(() => {
    return sections
      .filter((section) => !isSubSection(section))
      .sort((a, b) => {
        const aNumber = getMainSectionNumber(a) ?? 0;

        const bNumber = getMainSectionNumber(b) ?? 0;

        return aNumber - bNumber;
      });
  }, [sections]);

  const tableOfContents = useMemo<NewsTableOfContentsItem[]>(() => {
    if (!currentNews) {
      return [];
    }

    const parsedToc = parseArray<NewsTableOfContentsItem>(
      currentNews.tableOfContents,
    );

    return [...parsedToc].sort(
      (a, b) => Number(a?.order ?? 0) - Number(b?.order ?? 0),
    );
  }, [currentNews]);

  const category = useMemo(() => {
    if (!currentNews || typeof currentNews.category !== "string") {
      return "";
    }

    return currentNews.category.trim();
  }, [currentNews]);

  const socialMedia = useMemo(() => {
    if (!currentNews) {
      return [];
    }

    return parseArray<{
      name?: string;
      icon?: unknown;
      url?: string;
    }>(currentNews.social_media).filter(
      (item) =>
        item &&
        typeof item.name === "string" &&
        typeof item.url === "string" &&
        item.url.trim() !== "",
    );
  }, [currentNews]);

  const author =
    typeof currentNews?.author === "string" ? currentNews.author : "";

  const authorLogo = useMemo(() => {
    return getImageUrl(currentNews?.authorLogo ?? currentNews?.logo);
  }, [currentNews]);

  const topContentImage = useMemo(() => {
    const section = sections.find((item) => getSectionNumber(item) === "1.2");

    return getImageUrl(section?.image);
  }, [sections]);

  const getTocChildren = (
    tocItem: NewsTableOfContentsItem | undefined,
  ): Array<NewsTableOfContentsChild | string> => {
    if (!tocItem) {
      return [];
    }

    return parseArray<NewsTableOfContentsChild | string>(
      tocItem.children ??
        tocItem.subItems ??
        tocItem.subsections ??
        tocItem.items,
    );
  };

  const getSubSections = (
    mainSection: NewsDetailSection,
  ): NewsDetailSection[] => {
    const mainNumber = getMainSectionNumber(mainSection);

    if (mainNumber === null) {
      return [];
    }

    return sections
      .filter((section) => {
        if (!isSubSection(section)) {
          return false;
        }

        const sectionNumber = getMainSectionNumber(section);

        return sectionNumber === mainNumber;
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

  if (!news) {
    return (
      <main className="flex min-h-[500px] flex-col items-center justify-center gap-4 px-5">
        <p className="text-sm text-gray-500">News data is unavailable.</p>

        <Link
          href={`/${locale}/news`}
          className="text-sm underline underline-offset-4"
        >
          Back to News
        </Link>
      </main>
    );
  }

  if (!currentNews) {
    return (
      <main className="flex min-h-[500px] flex-col items-center justify-center gap-4 px-5">
        <p className="text-sm text-gray-500">News not found.</p>

        <Link
          href={`/${locale}/news`}
          className="text-sm underline underline-offset-4"
        >
          Back to News
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
              href={banner.breadcrumb_second_url || `/${locale}/news`}
              className="transition-colors hover:text-[#292929]"
            >
              {banner.breadcrumb_second || ""}
            </Link>

            <span>/</span>

            <span className="truncate text-[#9B9B9B]">{currentNews.title}</span>
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
            {currentNews.title}
          </h1>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              {currentNews.date && (
                <span className="mr-1 text-[12px] text-[#858585]">
                  {formatDate(currentNews.date)}
                </span>
              )}

              {category && (
                <span
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
              )}
            </div>

            {socialMedia.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="mr-1 text-[12px] text-[#858585]">Share</span>

                {socialMedia.map((social, index) => {
                  const iconUrl = getImageUrl(social.icon);

                  return (
                    <a
                      key={`${social.name}-${index}`}
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
              <div
                className="
                                    flex
                                    h-9
                                    w-9
                                    shrink-0
                                    items-center
                                    justify-center
                                    overflow-hidden
                                    rounded-[5px]
                                    border
                                    border-[#E0E0E0]
                                    bg-white
                                "
              >
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
                    NEWS
                  </span>
                )}
              </div>

              <span className="text-[13px] font-semibold text-[#292929]">
                {author}
              </span>
            </div>
          </div>
        </div>
      </section>

      {topContentImage && (
        <section className="px-5 pb-8">
          <div className="mx-auto w-full max-w-[791px] overflow-hidden rounded-[16px]">
            <Image
              src={topContentImage}
              alt="News content"
              width={1200}
              height={800}
              className="block h-auto w-full object-cover"
            />
          </div>
        </section>
      )}

      {tableOfContents.length > 0 && (
        <section className="px-5 pb-8 pt-2">
          <div className="mx-auto flex justify-center">
            <div
              className="
                                w-full
                                max-w-[636px]
                                overflow-hidden
                                rounded-[16px]
                                border
                                border-[#D6D6D6]
                                px-6
                                py-4
                            "
            >
              <div className="mb-2 text-[11px] font-medium uppercase tracking-[0.2px] text-[#246BCE]">
                Table of Content
              </div>

              <div className="space-y-0.5 overflow-hidden">
                {tableOfContents.map((item, index) => {
                  const sectionNumber = index + 1;

                  const sectionTitle = getTitle(item);

                  const mainSection = mainSections.find(
                    (section) =>
                      getMainSectionNumber(section) === sectionNumber,
                  );

                  const sectionId =
                    mainSection?.id ?? `content-${sectionNumber}`;

                  const children = getTocChildren(item);

                  return (
                    <div key={item.id ?? sectionId}>
                      <a
                        href={`#${sectionId}`}
                        className="
                                                        block
                                                        truncate
                                                        text-[13px]
                                                        font-medium
                                                        leading-6
                                                        text-[#292929]
                                                        transition-colors
                                                        hover:text-[#246BCE]
                                                    "
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

                            const mainNumber = sectionNumber;

                            const childNumber = childIndex + 1;

                            const childSection = sections.find((section) => {
                              const sectionNumberValue =
                                getSectionNumber(section);

                              return (
                                sectionNumberValue ===
                                `${mainNumber}.${childNumber}`
                              );
                            });

                            const childId =
                              childSection?.id ??
                              `content-${sectionNumber}-${childNumber}`;

                            return (
                              <a
                                key={childId}
                                href={`#${childId}`}
                                className="
                                                                            block
                                                                            truncate
                                                                            text-[12px]
                                                                            leading-6
                                                                            text-[#858585]
                                                                            transition-colors
                                                                            hover:text-[#246BCE]
                                                                        "
                              >
                                {sectionNumber}.{childNumber} {childTitle}
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
        <article
          className="
                        mx-auto
                        w-full
                        max-w-[791px]
                        overflow-hidden
                        rounded-[16px]
                        bg-white
                        px-6
                        py-4
                    "
        >
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
                        className="
                                                        text-[12px]
                                                        leading-[1.75]
                                                        text-[#747474]
                                                        [&_p]:mb-4
                                                        [&_p:last-child]:mb-0
                                                        [&_strong]:font-semibold
                                                        [&_strong]:text-[#292929]
                                                        [&_ul]:mb-4
                                                        [&_ul]:list-disc
                                                        [&_ul]:pl-5
                                                        [&_ol]:mb-4
                                                        [&_ol]:list-decimal
                                                        [&_ol]:pl-5
                                                        [&_li]:mb-1
                                                    "
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
                                  className="
                                                                                text-[12px]
                                                                                leading-[1.75]
                                                                                text-[#747474]
                                                                                [&_p]:mb-4
                                                                                [&_p:last-child]:mb-0
                                                                                [&_strong]:font-semibold
                                                                                [&_strong]:text-[#292929]
                                                                                [&_ul]:mb-4
                                                                                [&_ul]:list-disc
                                                                                [&_ul]:pl-5
                                                                                [&_ol]:mb-4
                                                                                [&_ol]:list-decimal
                                                                                [&_ol]:pl-5
                                                                                [&_li]:mb-1
                                                                            "
                                  dangerouslySetInnerHTML={{
                                    __html: childContent,
                                  }}
                                />
                              )}
                            </div>
                          );
                        })}
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
              {previousNews ? (
                <Link
                  href={`/${locale}/news/${previousNews.id}`}
                  className="group flex min-w-0 items-center gap-2"
                >
                  <ArrowLeft
                    size={20}
                    strokeWidth={1.5}
                    className="
                                            shrink-0
                                            text-[#858585]
                                            transition-transform
                                            group-hover:-translate-x-1
                                        "
                  />

                  <div className="min-w-0 truncate text-[13px] leading-5">
                    <span className="mr-2 text-[#858585]">Previous:</span>

                    <span className="font-medium text-[#292929]">
                      {previousNews.title}
                    </span>
                  </div>
                </Link>
              ) : (
                <span className="invisible">Previous</span>
              )}
            </div>

            <div className="min-w-0 flex-1">
              {nextNews ? (
                <Link
                  href={`/${locale}/news/${nextNews.id}`}
                  className="
                                        group
                                        flex
                                        min-w-0
                                        items-center
                                        justify-end
                                        gap-2
                                        text-right
                                    "
                >
                  <div className="min-w-0 truncate text-[13px] leading-5">
                    <span className="mr-2 text-[#858585]">Next:</span>

                    <span className="font-medium text-[#292929]">
                      {nextNews.title}
                    </span>
                  </div>

                  <ArrowRight
                    size={20}
                    strokeWidth={1.5}
                    className="
                                            shrink-0
                                            text-[#858585]
                                            transition-transform
                                            group-hover:translate-x-1
                                        "
                  />
                </Link>
              ) : (
                <span className="invisible">Next</span>
              )}
            </div>
          </div>
        </div>
      </section>

      <RelatedArticles currentId={id} />
    </main>
  );
}
