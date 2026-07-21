"use client";

import { useMutation } from "@tanstack/react-query";
import { authService } from "../services/auth.service";

export const useRegister = () => {
  return useMutation({
    mutationFn: authService.register,

    onSuccess(data) {
      if (!data.status) {
        alert(data.message);
        return;
      }
      alert(data.message || "Registration completed successfully!");
      const segments = window.location.pathname.split("/");
      const locale = segments[1] || "vi";
      window.location.href = `/${locale}/login`;
    },

    onError(error) {
      console.error("REGISTER ERROR:", error);
      alert("Registration failed");
    },
  });
};
