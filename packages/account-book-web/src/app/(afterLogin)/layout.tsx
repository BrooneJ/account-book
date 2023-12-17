import { cookies } from "next/headers";

export default function AfterLoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  console.log("cookie: ", cookieStore.get("accessToken"));
  return <div className="px-5 pb-[20px] h-full">{children}</div>;
}
