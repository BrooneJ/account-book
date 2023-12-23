"use client";

import { useUser } from "@/app/contexts/UserContext";

export default function Page() {
  const user = useUser();
  return <div>home</div>;
}
