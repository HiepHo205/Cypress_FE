import { gql } from "graphql-tag";

export const GET_CASE_STUDY_PAGE = gql`
  query GetCaseStudyPage {
    caseStudyPage {
      banner
      categories
      caseStudyDetail

      caseStudies {
        id
        title
        description
        categories
        active
        date
        author
        seriesTags
        tableOfContents
        sections

        image {
          url
          public_id
        }

        logo {
          url
          public_id
        }
        social_media {
          name
          icon {
            url
            public_id
          }
          url
        }
      }
    }
  }
`;
