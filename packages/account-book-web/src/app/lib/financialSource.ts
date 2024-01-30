"use server";

import { cookies } from "next/headers";

type FormData = {
  type?: string;
  name: string;
};

export async function getSource(accountId: string) {
  const res = await fetch(
    `http://localhost:4000/api/financial-source/${accountId}`,
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

export async function createSource(data: FormData, accountId: string) {
  const response = await fetch(
    `http://localhost:4000/api/financial-source/${accountId}`,
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

export async function deleteSourceList(
  accountId: string,
  type: "income" | "expense",
  id: string[],
) {
  await fetch(`http://localhost:4000/api/financial-source/${accountId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookies().toString(),
    },
    body: JSON.stringify({ type, id }),
    cache: "no-cache",
    credentials: "include",
  });
}
