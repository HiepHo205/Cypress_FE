import graphqlClient from "@/src/lib/graphql";
import { GET_FOOTER } from "../graphql/footer.query";

export const fetchFooter = async () => {
  const response = await graphqlClient.post("", {
    query: GET_FOOTER.loc?.source.body,
  });

  if (response.data?.errors?.length) {
    throw new Error(response.data.errors[0].message);
  }

  return response.data?.data;
};
