import gql from "graphql-tag";

export const GET_FOOTER = gql`
  query GetFooter {
    getLogo {
      logo
    }

    footerBranding {
      company_name
      description
    }

    footerSocials {
      id
      name
      url
      icon
    }

    footerNavigation {
      id
      navigations {
        id
        group
        title
        link
        type
      }
    }

    footerNewsletter {
      id
      title
      description
      placeholder
      button_icon
    }

    footerBottomBar {
      id
      copyright
      legal_links {
        text
        url
      }
    }
  }
`;
