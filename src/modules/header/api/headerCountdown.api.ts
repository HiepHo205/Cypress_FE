import graphqlClient from "@/src/lib/graphql";
import { GET_HEADER_COUNTDOWN } from "../graphql/headerCountdown.query";

export const getCountdown = async () => {
  const response = await graphqlClient.post("", {
    query: GET_HEADER_COUNTDOWN,
  });

  return response.data.data.headerCountdown;
};
