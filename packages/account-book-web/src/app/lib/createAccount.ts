"use server";

import { cookies } from "next/headers";

type FormData = {
  type: string;
  name: string;
};

export async function createAccount(data: FormData) {
  const response = await fetch(`http://localhost:4000/api/account-book/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookies().toString(),
    },
    body: JSON.stringify(data),
    cache: "no-cache",
    credentials: "include",
  });
  const result = await response.json();
  return result;
}
