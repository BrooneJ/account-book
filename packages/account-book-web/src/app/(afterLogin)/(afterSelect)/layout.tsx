import { getMyAccount } from "@/app/lib/getMyAccount";
import { redirect } from "next/navigation";
import Footer from "@/app/ui/Footer";

export default async function AfterLoginLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  const me = await getMyAccount();
  if (me.statusCode) {
    return redirect("/login");
  }

  return (
    <>
      {children}
      {modal}
      <Footer />
    </>
  );
}
