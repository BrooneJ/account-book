"use client";

import { useProtectedRoute } from "@/app/hooks/useProtectedRoute";

export default function writeAccountBookPage() {
  const hasPermission = useProtectedRoute();
  if (!hasPermission) return null;
  return <div>writeAccountBook</div>;
}
