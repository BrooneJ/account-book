"use server";

import { cookies } from "next/headers";

export async function getAccountBook(accountbookId: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/account-book/${accountbookId}`,
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

  return data;
}
