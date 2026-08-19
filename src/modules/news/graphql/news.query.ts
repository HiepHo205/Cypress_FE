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
        author
        status
        featured

        image {
          url
          public_id
        }

        logo {
          url
          public_id
        }

        tableOfContents
        sections

        social_media {
          name
          icon {
            url
            public_id
          }
          url
        }
      }

      featured {
        id
        title
        description
        category
        date
        author
        status
        featured

        image {
          url
          public_id
        }

        logo {
          url
          public_id
        }

        tableOfContents
        sections

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
