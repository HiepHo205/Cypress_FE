import { loginApi, registerApi } from "../api/auth.api";
import { RegisterRequest } from "../types/auth";

export const authService = {
  login(data: { email: string; password: string }) {
    return loginApi(data);
  },
  register(data: RegisterRequest) {
    return registerApi(data);
  },
};
