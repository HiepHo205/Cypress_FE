import graphqlClient from "@/src/lib/graphql";
import { GET_HEADER } from "../graphql/header.query";

export const HeaderService = {
  async getHeader() {
    const response = await graphqlClient.post("", {
      query: GET_HEADER,
    });

    return response.data.data.header;
  },
};
