"use server";

import { z } from "zod";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type FormData = {
  email: string;
  password: string;
};

export async function actions(endpoint: string, data: FormData) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/${endpoint}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      cache: "no-cache",
      credentials: "include",
    },
  );
  const result = await response.json();
  const validatedResult = responseSchema.safeParse(result);

  if (validatedResult.success) {
    createCookieHeaders(validatedResult.data.tokens);
    return redirect("/select");
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
    if (key === "accessToken") {
      cookies().set("access_token", value, {
        httpOnly: true,
        path: "/",
        expires: new Date(Date.now() + 1000 * 60 * 60),
      });
      return;
    }
    if (key === "refreshToken") {
      cookies().set("refresh_token", value, {
        httpOnly: true,
        path: "/",
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
      });
      return;
    }
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
