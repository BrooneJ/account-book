"use server";

import { cookies } from "next/headers";

export async function getMyAccount() {
  const response = await fetch("http://localhost:4000/api/me", {
    method: "GET",
    headers: {
      Cookie: cookies().toString(),
    },
    cache: "no-cache",
    credentials: "include",
  });
  const result = await response.json();
  return result;
}
