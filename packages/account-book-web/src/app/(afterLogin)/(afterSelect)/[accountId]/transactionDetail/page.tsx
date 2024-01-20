import LowHeader from "@/app/ui/Header/lowHeader";
import Image from "next/image";
import TransactionList from "@/app/ui/TransactionList";
import { QueryClient } from "@tanstack/react-query";
import { getTransactionsAll } from "@/app/lib/transaction";

export default async function Page({
  params,
}: {
  params: { accountId: string };
}) {
  const accountId = params.accountId;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["transactions"],
    queryFn: () => getTransactionsAll(accountId),
  });

  return (
    <div className="flex flex-col h-full">
      <LowHeader title="詳細" headerLeft />
      <div className="flex justify-end mb-2">
        <span>条件で探す</span>
        <Image src="/images/filter.svg" alt="filter" width={24} height={24} />
      </div>
      <div className="flex grow overflow-scroll">
        <TransactionList accountId={accountId} />
      </div>
      <div className="mb-14"></div>
    </div>
  );
}
