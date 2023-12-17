"use server";

import { z } from "zod";
import { cookies } from "next/headers";

type FormData = {
  email: string;
  password: string;
};

export async function actions(data: FormData) {
  const response = await fetch("http://localhost:4000/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include",
  });
  const result = await response.json();
  const validatedResult = responseSchema.safeParse(result);

  if (validatedResult.success) {
    createCookieHeaders(validatedResult.data.tokens);
    return { user: validatedResult.data.user };
  } else {
    return { error: result };
  }
}

function createCookieHeaders(setCookieHeader: ResponseType["tokens"]) {
  if (
    !setCookieHeader ||
    !setCookieHeader.accessToken ||
    !setCookieHeader.refreshToken
  ) {
    throw new Error("No cookies");
  }
  Object.entries(setCookieHeader).forEach(([key, value]) => {
    cookies().set(key, value, {
      httpOnly: true,
      path: "/",
    });
  });
}

const responseSchema = z.object({
  tokens: z.object({
    accessToken: z.string(),
    refreshToken: z.string(),
  }),
  user: z.object({
    id: z.string(),
    email: z.string(),
    username: z.string(),
  }),
});

type ResponseType = z.infer<typeof responseSchema>;
