export const GET_HEADER_COUNTDOWN = `
query {
  headerCountdown {
    target_date
    enabled
    button {
      label
      href
    }
  }
}
`;
