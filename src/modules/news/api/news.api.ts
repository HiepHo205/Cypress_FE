import graphqlClient from "@/src/lib/graphql";
import { GET_NEWS_PAGE } from "../graphql/news.query";
import type { NewsPage, NewsNewsletter } from "../types/news.types";

export const NewsApi = {
  async getNewsPage(): Promise<NewsPage> {
    const response = await graphqlClient.post("", {
      query: GET_NEWS_PAGE.loc?.source.body,
    });

    if (response.data?.errors?.length) {
      throw new Error(
        response.data.errors[0]?.message || "Failed to fetch news page",
      );
    }

    const newsPage = response.data?.data?.newsPage;

    if (!newsPage) {
      throw new Error("News page data is empty");
    }

    let newsletter: NewsNewsletter | null = null;

    if (typeof newsPage.newsletter === "string") {
      try {
        newsletter = JSON.parse(newsPage.newsletter);
      } catch (error) {
        console.error("Failed to parse newsletter:", error);
        newsletter = null;
      }
    } else {
      newsletter = newsPage.newsletter;
    }

    return {
      ...newsPage,
      newsletter,
    };
  },
};
