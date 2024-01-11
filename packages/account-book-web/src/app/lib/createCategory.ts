"use server";

import { cookies } from "next/headers";

type FormData = {
  type: string;
  name: string;
};

export async function createCategory(data: FormData, accountId: string) {
  const response = await fetch(
    `http://localhost:4000/api/category/${accountId}`,
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
  if (result.statusCode === 500) {
    throw new Error(result.message);
  }
  return result;
}
