"use client";

import { useRouter } from "next/navigation";

export function useGoBack() {
  const router = useRouter();
  const goBack = () => router.back();
  return goBack;
}
