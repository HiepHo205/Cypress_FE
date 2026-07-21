import axios from "axios";

const graphqlClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_GRAPHQL_URL,

  headers: {
    "Content-Type": "application/json",
  },
});

export default graphqlClient;
