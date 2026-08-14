import { gql } from "graphql-tag";

export const GET_CASE_STUDY_PAGE = gql`
  query GetCaseStudyPage {
    caseStudyPage {
      banner
      categories
      caseStudies {
        id
        title
        description
        categories
        active
        image {
          url
          public_id
        }
      }
    }
  }
`;
