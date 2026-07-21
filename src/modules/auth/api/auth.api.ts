import graphqlClient from "@/src/lib/graphql";
import { LoginRequest, LoginResponse } from "../types/auth";
import { RegisterRequest, RegisterResponse } from "../types/auth";

const LOGIN_MUTATION = `
mutation Login($input: LoginInput!) {
  login(input: $input) {
    status
    message
    access_token
    user {
      id
      name
      email
      status
    }
  }
}
`;

export const loginApi = async (data: LoginRequest): Promise<LoginResponse> => {
  const res = await graphqlClient.post("", {
    query: LOGIN_MUTATION,
    variables: {
      input: data,
    },
  });

  return res.data?.data?.login || res.data?.login || res.data;
};

const REGISTER_MUTATION = `
mutation Register($input: RegisterInput!) {
  register(input: $input) {
    status
    message
    user {
      id
      name
      email
    }
  }
}
`;

export const registerApi = async (
  data: RegisterRequest,
): Promise<RegisterResponse> => {
  const res = await graphqlClient.post("", {
    query: REGISTER_MUTATION,
    variables: {
      input: data,
    },
  });

  return res.data?.data?.register || res.data?.register || res.data;
};
