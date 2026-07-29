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
          href
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
