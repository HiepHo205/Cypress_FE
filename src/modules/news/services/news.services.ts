import { NewsApi } from "../api/news.api";
import type { NewsPage } from "../types/news.types";

export const NewsService = {
  async getNewsPage(): Promise<NewsPage> {
    try {
      const newsPage = await NewsApi.getNewsPage();

      if (!newsPage) {
        throw new Error("News page data is empty");
      }

      return newsPage;
    } catch (error) {
      console.error("NewsService.getNewsPage error:", error);

      throw error;
    }
  },
};
