import { gql } from "@apollo/client";

export const GET_FAVICON = gql`
  query GetFavicon {
    getFavicon {
      url
      public_id
    }
  }
`;
