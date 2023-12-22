"use client";

import { useUser } from "@/app/contexts/UserContext";
import { useEffect } from "react";
import { redirect } from "next/navigation";

export function useProtectedRoute() {
  const user = useUser();
  useEffect(() => {
    if (!user) {
      redirect("/login");
    }
  }, [user]);
  return !!user;
}
