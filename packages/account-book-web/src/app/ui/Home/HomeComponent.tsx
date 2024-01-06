"use client";
import { useUser } from "@/app/contexts/UserContext";
import { useQuery } from "@tanstack/react-query";
import { getAccount } from "@/app/lib/getAccount";
import AccountSelect from "@/app/ui/Home/AccountSelect";
import NoneAccountHome from "@/app/ui/Home/NoneAccountHome";

export default function HomeComponent() {
  const user = useUser();
  const { data } = useQuery({
    queryKey: ["account", user?.id],
    queryFn: () => getAccount(user?.id!),
  });
  console.log("component data: ", data);

  return data.length > 0 ? <AccountSelect /> : <NoneAccountHome />;
}
