"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useMemo } from "react";
import { useNews } from "../hooks/useNews";

type ProjectItem = {
  id: string | number;
  date: string;
  title: string;
  type?: string;
};

export default function OurProjects() {
  const params = useParams();

  const locale = typeof params?.locale === "string" ? params.locale : "vi";

  const { news, loading, error } = useNews();

  const projects = useMemo(() => {
    if (!news) {
      return [];
    }

    const items = [
      ...(news.featured ?? []).map((item: ProjectItem) => ({
        ...item,
        category: "featured" as const,
      })),

      ...(news.latest ?? []).map((item: ProjectItem) => ({
        ...item,
        category: "latest" as const,
      })),
    ];

    return Array.from(
      new Map(items.map((item) => [String(item.id), item])).values(),
    ).slice(0, 5);
  }, [news]);

  if (loading) {
    return (
      <section className="our-projects">
        <h2 className="text-[16px] font-bold text-[#292929]">Our Projects</h2>

        <div className="project-list">
          {Array.from({ length: 5 }).map((_, index) => (
            <div className="project-item" key={index}>
              <div className="project-meta">
                <span className="skeleton skeleton-date" />
                <span className="skeleton skeleton-type" />
              </div>

              <span className="skeleton skeleton-title" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="our-projects">
        <h2 className="text-[16px] font-bold text-[#292929]">Our Projects</h2>

        <p className="mt-4 text-[12px] text-red-500">{error}</p>
      </section>
    );
  }

  if (!news || projects.length === 0) {
    return null;
  }

  return (
    <section className="our-projects">
      <h2 className="text-[16px] font-bold text-[#292929]">Our Projects</h2>

      <div className="project-list mt-2">
        {projects.map((project) => (
          <Link
            href={`/${locale}/news/${project.id}`}
            className="project-item block cursor-pointer border-b border-[#E5E5E5] py-3 transition-colors hover:bg-[#FAFAFA]"
            key={`${project.category}-${project.id}`}
          >
            <div className="project-meta flex items-center justify-between gap-2">
              <span className="project-date text-[11px] text-[#858585]">
                {project.date}
              </span>

              <span
                className="
                  project-type
                  rounded-full
                  border
                  border-[#BFD8FA]
                  bg-[#F2F7FD]
                  px-3
                  py-[3px]
                  text-[10px]
                  font-medium
                  text-[#246BCE]
                "
              >
                {project.category === "featured" ? "Featured" : "Latest"}
              </span>
            </div>

            <h3 className="mt-2 text-[12px] font-medium leading-[1.5] text-[#292929]">
              {project.title}
            </h3>
          </Link>
        ))}
      </div>
    </section>
  );
}
