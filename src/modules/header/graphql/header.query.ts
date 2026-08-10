export const GET_HEADER = `
query GetHeader {
  header {
    logo

    menus {
      id
      label
      children {
        id
        label
        url
      }
    }

    cta {
      label
      href
    }

    countdown {
      enabled
      target_date
      button {
        label
        href
      }
    }
  }
}
`;

export const GET_HEADER_COUNTDOWN = `
  query GetHeaderCountdown {
    header {
      countdown {
        enabled
        target_date
        button {
          label
          href
        }
      }
    }
  }
`;

export const GET_FAVICON = ` query GetFavicon { getFavicon { url public_id } } `;
export const GET_LOGO = `
  query GetLogo {
    getLogo {
      logo
    }
  }
`;
