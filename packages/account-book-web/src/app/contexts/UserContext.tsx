"use client";
import { createContext, useContext } from "react";
import { UserType } from "@/app/lib/getMyAccount";

export const UserContext = createContext<UserType | null | undefined>(
  undefined,
);

export function useUser() {
  const user = useContext(UserContext);
  if (user === undefined) {
    throw new Error("UserContext.Provider not used");
  }
  return user;
}

export function UserProvider({
  children,
  user,
}: {
  children: React.ReactNode;
  user: UserType;
}) {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}
