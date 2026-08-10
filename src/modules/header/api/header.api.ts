import graphqlClient from "@/src/lib/graphql";

import { GET_HEADER, GET_FAVICON, GET_LOGO } from "../graphql/header.query";

export const getHeader = async () => {
  const response = await graphqlClient.post("", {
    query: GET_HEADER,
  });

  return response.data.data.header;
};

export const getFavicon = async () => {
  const response = await graphqlClient.post("", {
    query: GET_FAVICON,
  });

  return response.data.data.getFavicon;
};

export const getLogo = async () => {
  const response = await graphqlClient.post("", {
    query: GET_LOGO,
  });

  return response.data.data.getLogo;
};
