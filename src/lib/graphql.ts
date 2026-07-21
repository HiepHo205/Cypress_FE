import axios from "axios";

const graphqlClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
  method: "POST",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default graphqlClient;
