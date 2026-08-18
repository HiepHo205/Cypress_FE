import graphqlClient from "@/src/lib/graphql";
import { GET_CASE_STUDY_PAGE } from "../graphql/case-study.query";
import {
  CaseStudyBanner,
  CaseStudyCategory,
  CaseStudyItem,
  CaseStudyPage,
} from "../types/case-study.types";

function parseJson<T>(value: unknown, fallback: T): T {
  if (value === null || value === undefined) {
    return fallback;
  }

  if (typeof value !== "string") {
    return value as T;
  }

  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

export const CaseStudyApi = {
  async getCaseStudyPage(): Promise<CaseStudyPage> {
    const response = await graphqlClient.post("", {
      query: GET_CASE_STUDY_PAGE.loc?.source.body,
    });

    if (response.data?.errors?.length) {
      console.error("CASE STUDY GRAPHQL ERRORS:", response.data.errors);

      throw new Error(
        response.data.errors[0]?.message || "Failed to fetch case study page",
      );
    }

    const caseStudyPage = response.data?.data?.caseStudyPage;

    console.log("CASE STUDY PAGE RAW:", caseStudyPage);

    console.log("CASE STUDY DETAIL RAW:", caseStudyPage?.caseStudyDetail);

    console.log("CASE STUDIES RAW:", caseStudyPage?.caseStudies);

    if (!caseStudyPage) {
      throw new Error("Case study page data is empty");
    }

    const banner = parseJson<CaseStudyBanner | null>(
      caseStudyPage.banner,
      null,
    );

    const categories = parseJson<CaseStudyCategory[]>(
      caseStudyPage.categories,
      [],
    );

    const caseStudyDetail = parseJson<CaseStudyItem | null>(
      caseStudyPage.caseStudyDetail,
      null,
    );

    const caseStudies: CaseStudyItem[] = Array.isArray(
      caseStudyPage.caseStudies,
    )
      ? caseStudyPage.caseStudies.map((item: CaseStudyItem) => {
          const normalizedItem: CaseStudyItem = {
            ...item,
            categories: parseJson(item.categories, []),
            seriesTags: parseJson(item.seriesTags, []),
            tableOfContents: parseJson(item.tableOfContents, []),
            sections: parseJson(item.sections, []),
          };

          if (
            caseStudyDetail &&
            String(caseStudyDetail.id) === String(normalizedItem.id)
          ) {
            return {
              ...normalizedItem,
              ...caseStudyDetail,
              tableOfContents: parseJson(caseStudyDetail.tableOfContents, []),
              sections: parseJson(caseStudyDetail.sections, []),
            };
          }

          return normalizedItem;
        })
      : [];

    console.log("CASE STUDY DETAIL PARSED:", caseStudyDetail);

    console.log("CASE STUDIES FINAL:", caseStudies);

    return {
      banner,
      categories,
      caseStudyDetail,
      caseStudies,
    };
  },
};
