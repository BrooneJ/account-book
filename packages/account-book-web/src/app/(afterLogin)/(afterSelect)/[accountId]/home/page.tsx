import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getAccountBook } from "@/app/lib/getAccountBook";
import AccountTitle from "@/app/ui/Home/AccountTitle";
import { getThisMonthTransaction } from "@/app/lib/transaction";
import ThisMonthTransaction from "@/app/ui/Home/ThisMonthTransaction";
import Overlay from "@/app/ui/Common/Overlay";

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
  await queryClient.prefetchQuery({
    queryKey: ["accountbook", "thisMonthTransactions", id],
    queryFn: () => getThisMonthTransaction(id),
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <div className="pt-5">
      <HydrationBoundary state={dehydratedState}>
        <AccountTitle id={id} />
        <ThisMonthTransaction id={id} />
      </HydrationBoundary>
    </div>
  );
}
