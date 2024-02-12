"use server";

import { cookies } from "next/headers";

export async function getAccount(userId: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/account-book?userId=${userId}`,
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
