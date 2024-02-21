"use server";

import { cookies } from "next/headers";

export async function getThisMonthData(accountId: string, date: string) {
  const url = new URL(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/calendar/${accountId}`,
  );

  if (date) url.searchParams.append("date", date);

  const response = await fetch(url.toString(), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookies().toString(),
    },
    cache: "no-cache",
    credentials: "include",
  });
  const result = await response.json();

  return result;
}
