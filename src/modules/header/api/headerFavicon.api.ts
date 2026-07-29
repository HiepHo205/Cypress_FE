import graphqlClient from "@/src/lib/graphql";

export const GET_FAVICON = `
query GetFavicon {
  getFavicon {
    url
    public_id
  }
}
`;

export async function getFavicon() {
  const response = await graphqlClient.post("", {
    query: GET_FAVICON,
  });

  console.log("FAVICON API:", response.data);

  return response.data.data.getFavicon;
}
