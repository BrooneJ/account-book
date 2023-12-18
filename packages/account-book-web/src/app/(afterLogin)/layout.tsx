import { getMyAccount } from "@/app/lib/getMyAccount";
import { redirect } from "next/navigation";

export default async function AfterLoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const me = await getMyAccount();
  if (me.statusCode) {
    return redirect("/login");
  }

  return <div className="px-5 pb-[20px] h-full">{children}</div>;
}
