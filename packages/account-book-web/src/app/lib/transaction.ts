"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

type FormData = {
  type?: string;
  userId: string;
  amount: number;
  category?: string;
  financialSource?: string;
  description: string;
  date: string;
};

export async function getThisMonthTransaction(accountId: string) {
  const response = await fetch(
    `http://localhost:4000/api/transaction/${accountId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookies().toString(),
      },
      cache: "no-cache",
      credentials: "include",
    },
  );
  const result = await response.json();

  return result;
}

export async function getTransactionsAll(
  accountId: string,
  pageParam: [string | undefined, number | undefined],
) {
  const [lastDate, lastId] = pageParam;

  const url = new URL(`http://localhost:4000/api/transaction/${accountId}/all`);
  // Add page parameters to the URL query
  if (lastDate) url.searchParams.append("date", lastDate);
  if (lastId) url.searchParams.append("cursor", lastId.toString());

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
  revalidatePath(`/${accountId}/transactions`);
  return result;
}

export async function getTransactionDetail(
  accountId: string,
  transactionId: string,
) {
  const response = await fetch(
    `http://localhost:4000/api/transaction/${accountId}/detail/${transactionId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookies().toString(),
      },
      cache: "no-cache",
      credentials: "include",
    },
  );
  const result = await response.json();

  return result;
}

export async function getTransactionByMonth(
  accountId: string,
  type: string,
  date?: string,
) {
  const url = new URL(
    `http://localhost:4000/api/transaction/${accountId}/statistics`,
  );

  if (type) url.searchParams.append("type", type);
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
  revalidatePath(`/${accountId}/statistics`);
  return result;
}

export async function getTransactionByCategory(
  accountId: string,
  categoryId: string,
  type: string,
  date: string,
) {
  const url = new URL(
    `http://localhost:4000/api/transaction/${accountId}/statistics/${categoryId}`,
  );

  if (type) url.searchParams.append("type", type);
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

export async function getTopTransactionByHalfYear(
  accountId: string,
  type: string,
  date: string,
) {
  const url = new URL(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/transaction/${accountId}/statistics/half-year`,
  );

  if (type) url.searchParams.append("type", type);
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

  revalidatePath(`/${accountId}/transactions`);
  return result;
}

export async function updateTransaction(
  data: FormData,
  accountId: string,
  transactionId: number,
) {
  const response = await fetch(
    `http://localhost:4000/api/transaction/${accountId}/${transactionId}`,
    {
      method: "PATCH",
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

  revalidatePath(`/${accountId}/transactions`);
  return result;
}

export async function deleteTransaction({
  accountId,
  transactionId,
}: {
  accountId: string;
  transactionId: number;
}) {
  const response = await fetch(
    `http://localhost:4000/api/transaction/${accountId}/${transactionId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookies().toString(),
      },
      cache: "no-cache",
      credentials: "include",
    },
  );
  const result = await response.json();

  revalidatePath(`/${accountId}/transactions`);
  return result;
}
