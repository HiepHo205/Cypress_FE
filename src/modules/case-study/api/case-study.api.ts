import graphqlClient from "@/src/lib/graphql";
import { GET_CASE_STUDY_PAGE } from "../graphql/case-study.query";
import type {
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

    const errors = response.data?.errors;

    if (errors?.length) {
      console.error("CASE STUDY GRAPHQL ERRORS:", errors);

      throw new Error(errors[0]?.message || "Failed to fetch case study page");
    }

    const page = response.data?.data?.caseStudyPage;

    if (!page) {
      throw new Error("Case study page data is empty");
    }

    const banner = parseJson<CaseStudyBanner | null>(page.banner, null);

    const categories = parseJson<CaseStudyCategory[]>(page.categories, []);

    const caseStudyDetail = parseJson<CaseStudyItem | null>(
      page.caseStudyDetail,
      null,
    );

    const caseStudies: CaseStudyItem[] = Array.isArray(page.caseStudies)
      ? page.caseStudies.map((item: CaseStudyItem) => {
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

    return {
      banner,
      categories,
      caseStudyDetail,
      caseStudies,
    };
  },
};
