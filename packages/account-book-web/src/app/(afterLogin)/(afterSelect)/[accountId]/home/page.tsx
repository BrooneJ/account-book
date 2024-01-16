import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getAccountBook } from "@/app/lib/getAccountBook";
import AccountTitle from "@/app/ui/Home/AccountTitle";

export default async function Page({
  params,
}: {
  params: { accountId: string };
}) {
  const id = params.accountId;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["accountbook", id],
    queryFn: () => getAccountBook(id),
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <div className="pt-5">
      <HydrationBoundary state={dehydratedState}>
        <AccountTitle id={id} />
      </HydrationBoundary>
    </div>
  );
}
