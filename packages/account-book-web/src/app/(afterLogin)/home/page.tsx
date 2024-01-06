import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getAccount } from "@/app/lib/getAccount";
import { getMyAccount } from "@/app/lib/getMyAccount";

export default async function Page() {
  const me = await getMyAccount();

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["account", me?.id],
    queryFn: () => getAccount(me?.id!),
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <div>
      <HydrationBoundary state={dehydratedState}>home</HydrationBoundary>
    </div>
  );
}
