import { loginApi } from "../api/auth.api";

export const authService = {
  login(data: { email: string; password: string }) {
    return loginApi(data);
  },
};
