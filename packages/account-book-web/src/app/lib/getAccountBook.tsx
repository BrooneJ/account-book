"use server";

import { cookies } from "next/headers";

export async function getAccountBook(accountbookId: string) {
  const res = await fetch(
    `http://localhost:4000/api/account-book/${accountbookId}`,
    {
      method: "GET",
      headers: {
        Cookie: cookies().toString(),
      },
      cache: "no-cache",
      credentials: "include",
    },
  );

  const data = await res.json();
  console.log("data:", data);
  return data;
}
