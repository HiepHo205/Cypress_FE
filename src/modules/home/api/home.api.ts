import graphqlClient from "@/src/lib/graphql";
import { GET_HOMEPAGE } from "./home.query";
import { print } from "graphql";

export const HomeApi = {
  getHomepage() {
    return graphqlClient.post("", {
      query: print(GET_HOMEPAGE),
    });
  },
};
