import { CaseStudyApi } from "../api/case-study.api";
import type { CaseStudyPage } from "../types/case-study.types";

export const CaseStudyService = {
  async getCaseStudyPage(): Promise<CaseStudyPage> {
    try {
      const caseStudyPage = await CaseStudyApi.getCaseStudyPage();

      if (!caseStudyPage) {
        throw new Error("Case study page data is empty");
      }

      return caseStudyPage;
    } catch (error) {
      console.error("CaseStudyService.getCaseStudyPage error:", error);

      throw error;
    }
  },
};
