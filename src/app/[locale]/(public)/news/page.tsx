"use client";

import { useMemo, useState } from "react";

import {
  NewFeaturedBlogs,
  NewsHero,
  NewsletterSection,
  NewsList,
  NewsFilter,
} from "@/src/modules/news";

import { Loading } from "@/src/components/common";
import { useNews } from "@/src/modules/news/hooks/useNews";

export default function NewsPage() {
  const { news, loading, error } = useNews();

  const [selectedCategory, setSelectedCategory] = useState("All Posts");

  const [search, setSearch] = useState("");

  const categories = useMemo(() => {
    const apiCategories =
      news?.postCategories
        ?.map((category) => category.title?.trim())
        .filter((category): category is string => Boolean(category)) ?? [];

    return ["All Posts", ...Array.from(new Set(apiCategories))];
  }, [news]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category || "All Posts");
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
  };

  if (loading) {
    return <Loading show message="Loading news..." fullScreen />;
  }

  if (error) {
    return (
      <main className="flex min-h-[400px] items-center justify-center">
        <p className="text-red-500">{error}</p>
      </main>
    );
  }

  if (!news) {
    return null;
  }

  return (
    <main className="w-full">
      <NewsHero news={news} />

      <NewsFilter
        categories={categories}
        selectedCategory={selectedCategory}
        search={search}
        onCategoryChange={handleCategoryChange}
        onSearchChange={handleSearchChange}
      />

      <NewsList
        news={news}
        selectedCategory={selectedCategory}
        search={search}
      />

      <NewFeaturedBlogs
        news={news}
        selectedCategory={selectedCategory}
        search={search}
      />

      <NewsletterSection />
    </main>
  );
}
