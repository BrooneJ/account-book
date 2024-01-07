import { getMyAccount } from "@/app/lib/getMyAccount";
import { redirect } from "next/navigation";
import Footer from "@/app/ui/Footer";

export default async function AfterLoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const me = await getMyAccount();
  if (me.statusCode) {
    return redirect("/login");
  }

  return (
    <>
      {children}
      <Footer />
    </>
  );
}
