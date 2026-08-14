"use client";

import { useEffect, useMemo, useState } from "react";
import CaseStudyBanner from "@/src/modules/case-study/components/CaseStudyBanner";
import CaseStudyGrid from "@/src/modules/case-study/components/CaseStudyGrid";
import CaseStudySidebar from "@/src/modules/case-study/components/CaseStudySidebar";
import { useCaseStudy } from "@/src/modules/case-study/hooks/useCaseStudy";
import { Loading } from "@/src/components/common";

const ITEMS_PER_PAGE = 10;

export default function CaseStudiesPage() {
  const { caseStudy, loading, error } = useCaseStudy();

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredCaseStudies = useMemo(() => {
    const caseStudies = caseStudy?.caseStudies ?? [];
    const categories = caseStudy?.categories ?? [];
    const keyword = search.trim().toLowerCase();

    const selectedGroup = categories.find(
      (category) =>
        category.title.toLowerCase() === selectedCategory.toLowerCase(),
    );

    return caseStudies.filter((item) => {
      let matchesCategory = true;

      if (selectedCategory !== "All") {
        if (selectedGroup) {
          matchesCategory = selectedGroup.children.some((child) =>
            item.categories.some(
              (category) => category.toLowerCase() === child.name.toLowerCase(),
            ),
          );
        } else {
          matchesCategory = item.categories.some(
            (category) =>
              category.toLowerCase() === selectedCategory.toLowerCase(),
          );
        }
      }

      const matchesSearch =
        !keyword ||
        item.title.toLowerCase().includes(keyword) ||
        item.description.toLowerCase().includes(keyword) ||
        item.categories.some((category) =>
          category.toLowerCase().includes(keyword),
        );

      return matchesCategory && matchesSearch;
    });
  }, [caseStudy, search, selectedCategory]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredCaseStudies.length / ITEMS_PER_PAGE),
  );

  const currentItems = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

    return filteredCaseStudies.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredCaseStudies, currentPage]);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) {
      return;
    }

    setCurrentPage(page);
  };

  if (loading) {
    return <Loading show fullScreen />;
  }

  if (error) {
    return (
      <main className="flex min-h-[400px] items-center justify-center">
        <p className="text-sm text-red-500">{error}</p>
      </main>
    );
  }

  if (!caseStudy) {
    return (
      <main className="flex min-h-[400px] items-center justify-center">
        <p className="text-sm text-gray-400">Case study data is unavailable.</p>
      </main>
    );
  }

  return (
    <main>
      <CaseStudyBanner banner={caseStudy.banner} />

      <div className="mx-auto mt-10 flex w-full items-start gap-5 px-4 sm:px-8 lg:px-[100px]">
        <CaseStudySidebar
          categories={caseStudy.categories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />

        <CaseStudyGrid
          items={currentItems}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          search={search}
          onSearchChange={handleSearchChange}
          totalResults={filteredCaseStudies.length}
        />
      </div>
    </main>
  );
}
