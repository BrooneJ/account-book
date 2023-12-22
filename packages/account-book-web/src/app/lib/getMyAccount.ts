"use server";

import { cookies } from "next/headers";
import { z } from "zod";

export async function getMyAccount() {
  const response = await fetch("http://localhost:4000/api/me", {
    method: "GET",
    headers: {
      Cookie: cookies().toString(),
    },
    cache: "no-cache",
    credentials: "include",
  });
  const result = await response.json();
  const validatedResult = responseSchema.safeParse(result);

  if (validatedResult.success) {
    return validatedResult.data;
  } else {
    return result;
  }
}

const responseSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  username: z.string(),
});

export type UserType = z.infer<typeof responseSchema>;
