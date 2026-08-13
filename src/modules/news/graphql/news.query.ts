import gql from "graphql-tag";

export const GET_NEWS_PAGE = gql`
  query GetNewsPage {
    newsPage {
      banner
      newsletter

      postCategories {
        id
        title
        description
      }

      latest {
        id
        title
        description
        category
        date
        featured
        image {
          url
          public_id
        }
      }

      featured {
        id
        title
        description
        category
        date
        featured
        image {
          url
          public_id
        }
      }
    }
  }
`;
