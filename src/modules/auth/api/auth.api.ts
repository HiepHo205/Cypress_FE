import graphqlClient from "@/src/lib/graphql";
import { LoginRequest, LoginResponse } from "../types/auth";

const LOGIN_MUTATION = `

mutation Login(
    $email:String!,
    $password:String!
){

login(
    email:$email,
    password:$password
){   status
        message
        access_token
        token_type
        expires_in
        user{
        id
        full_name
        email
        roles{
        id
        name
}}}}

`;

export const loginApi = async (data: LoginRequest): Promise<LoginResponse> => {
  const res = await graphqlClient.post("", {
    query: LOGIN_MUTATION,

    variables: data,
  });

  return res.data.data.login;
};
