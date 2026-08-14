import type {
  CaseStudyCategory,
  CaseStudyItem,
} from "../types/case-study.types";

export const filterCaseStudiesByCategory = (
  caseStudies: CaseStudyItem[],
  category: string,
): CaseStudyItem[] => {
  if (!category || category === "All") {
    return caseStudies;
  }

  return caseStudies.filter((item) => item.categories.includes(category));
};

export const getCaseStudyCategories = (
  categories: CaseStudyCategory[],
): string[] => {
  return categories.flatMap((category) =>
    category.children.map((child) => child.name),
  );
};
