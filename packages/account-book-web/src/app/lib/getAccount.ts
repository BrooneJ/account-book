"use server";

import { cookies } from "next/headers";

export async function getAccount(userId: string) {
  const res = await fetch(
    `http://localhost:4000/api/account-book?userId=${userId}`,
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
