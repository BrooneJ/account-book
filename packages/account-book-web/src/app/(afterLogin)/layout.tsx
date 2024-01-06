import { getMyAccount } from "@/app/lib/getMyAccount";
import { redirect } from "next/navigation";
import { UserProvider } from "@/app/contexts/UserContext";
import Footer from "@/app/ui/Footer";
import RQProvider from "@/app/provider/RQProvider";

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
    <div className="px-5 pb-[20px] h-full">
      <RQProvider>
        <UserProvider user={me}>{children}</UserProvider>
        <Footer />
      </RQProvider>
    </div>
  );
}
