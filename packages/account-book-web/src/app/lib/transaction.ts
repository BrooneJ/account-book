"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

type FormData = {
  type: string;
  userId: string;
  amount: number;
  category: string;
  financialSource: string;
  description: string;
  date: string;
};

export async function createTransaction(data: FormData, accountId: string) {
  const response = await fetch(
    `http://localhost:4000/api/transaction/${accountId}`,
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

  revalidatePath(`/${accountId}/home`);
  return result;
}
