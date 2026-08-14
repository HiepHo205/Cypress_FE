import graphqlClient from "@/src/lib/graphql";
import { GET_CASE_STUDY_PAGE } from "../graphql/case-study.query";
import {
  CaseStudyBanner,
  CaseStudyCategory,
  CaseStudyPage,
} from "../types/case-study.types";

export const CaseStudyApi = {
  async getCaseStudyPage(): Promise<CaseStudyPage> {
    const response = await graphqlClient.post("", {
      query: GET_CASE_STUDY_PAGE.loc?.source.body,
    });

    if (response.data?.errors?.length) {
      throw new Error(
        response.data.errors[0]?.message || "Failed to fetch case study page",
      );
    }

    const caseStudyPage = response.data?.data?.caseStudyPage;

    if (!caseStudyPage) {
      throw new Error("Case study page data is empty");
    }

    let banner: CaseStudyBanner | null = null;
    let categories: CaseStudyCategory[] = [];

    if (typeof caseStudyPage.banner === "string") {
      try {
        banner = JSON.parse(caseStudyPage.banner);
      } catch (error) {
        console.error("Failed to parse banner:", error);
        banner = null;
      }
    } else {
      banner = caseStudyPage.banner;
    }

    if (typeof caseStudyPage.categories === "string") {
      try {
        categories = JSON.parse(caseStudyPage.categories);
      } catch (error) {
        console.error("Failed to parse categories:", error);
        categories = [];
      }
    } else {
      categories = caseStudyPage.categories || [];
    }

    return {
      ...caseStudyPage,
      banner,
      categories,
    };
  },
};
