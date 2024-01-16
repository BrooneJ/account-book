import { getMyAccount } from "@/app/lib/getMyAccount";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getAccount } from "@/app/lib/getAccount";
import HomeComponent from "@/app/ui/Home/HomeComponent";
import { redirect } from "next/navigation";

export default async function Page() {
  const me = await getMyAccount();
  if (me.statusCode) {
    return redirect("/login");
  }

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["account", me?.id],
    queryFn: () => getAccount(me?.id!),
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <HomeComponent />
    </HydrationBoundary>
  );
}
