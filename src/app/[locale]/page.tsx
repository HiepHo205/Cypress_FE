"use client";

import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

export default function RootPage() {
  const router = useRouter();
  const params = useParams();
  const locale = params?.locale || "vi";

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.replace(`/${locale}/dashboard`);
    } else {
      router.replace(`/${locale}`);
    }
  }, [router, locale]);
}
