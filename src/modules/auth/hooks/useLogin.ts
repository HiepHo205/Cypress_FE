"use client";

import { useMutation } from "@tanstack/react-query";

import { authService } from "../services/auth.service";

export const useLogin = () => {
  return useMutation({
    mutationFn: authService.login,

    onSuccess(data) {
      if (!data.status) {
        alert(data.message);
        return;
      }

      localStorage.setItem("token", data.access_token);

      localStorage.setItem("user", JSON.stringify(data.user));

      alert("Login successfully!");

      window.location.href = "/dashboard";
    },

    onError(error) {
      console.error("LOGIN ERROR:", error);

      alert("Login failed");
    },
  });
};
