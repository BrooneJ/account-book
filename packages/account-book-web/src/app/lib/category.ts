"use server";

import { cookies } from "next/headers";

type FormData = {
  type?: string;
  name: string;
};

export async function createCategory(data: FormData, accountId: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/category/${accountId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookies().toString(),
      },
      body: JSON.stringify(data),
      cache: "no-cache",
      credentials: "include",
    },
  );
  const result = await response.json();
  if (result.statusCode === 409) {
    throw new Error(result.message);
  }
  return result;
}

export async function getCategory(accountId: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/category/${accountId}`,
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

export async function deleteCategoryList(
  accountId: string,
  type: "income" | "expense" | undefined,
  id: string[],
) {
  await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/category/${accountId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookies().toString(),
      },
      body: JSON.stringify({ type, id }),
      cache: "no-cache",
      credentials: "include",
    },
  );
}
