"use client";

import { useQuery } from "@tanstack/react-query";
import { getTransactionDetail } from "@/app/lib/transaction";
import { TransactionDetail } from "@/app/(afterLogin)/(afterSelect)/[accountId]/transactions/type";
import MutationButton from "@/app/ui/TransactionList/MutationButton";
import LowHeader from "@/app/ui/Header/lowHeader";
import Image from "next/image";

export default function Page({
  params,
}: {
  params: { accountId: string; transactionId: string };
}) {
  const { accountId, transactionId } = params;
  const { data, isFetching } = useQuery<TransactionDetail>({
    queryKey: ["transaction", accountId, transactionId],
    queryFn: () => getTransactionDetail(accountId, transactionId),
  });

  if (isFetching) {
    return (
      <div className="flex h-full items-center justify-center">
        <Image
          src="/images/loading.svg"
          alt="loading"
          width={24}
          height={24}
          className="animate-spin"
        />
      </div>
    );
  }

  const date = data?.date.toString().split("T")[0].split("-");

  return (
    <div className="flex flex-col bg-background rounded-xl h-full pb-16">
      <LowHeader title="取引詳細" headerLeft />
      <div className="flex items-center justify-between py-2 border-b border-b-gray-1">
        <span
          className={`text-xl ${
            data?.type === "income" ? "text-incomeText" : "text-expenseText"
          }`}
        >
          {data?.type === "income" ? "+" : "-"}
          {data?.amount.toLocaleString()}
        </span>
        <div
          className={`px-4 rounded-2xl border border-gray-1 ${
            data?.type === "income" ? "bg-incomeBg" : "bg-expenseBg"
          }`}
        >
          <span
            className={`${
              data?.type === "income" ? "text-incomeText" : "text-expenseText"
            }`}
          >
            {data?.type === "income" ? "収入" : "支出"}
          </span>
        </div>
      </div>
      <div className="text-right text-sm text-gray-2 pt-[10px] pb-[14px]">
        {data?.date ? `${date![0]}年${date![1]}月${date![2]}日` : ""}
      </div>
      <div className="flex flex-col grow">
        <div className="flex border-b border-b-gray-1 pb-2 mb-2">
          <div className="flex flex-col grow">
            <span className="text-xs">
              {data?.type === "income" ? "収入源" : "支出先"}
            </span>
            <span className="text-[20px]">{data?.financialSource.name}</span>
          </div>
          <div className="flex flex-col grow">
            <span className="text-xs">カテゴリー</span>
            <span className="text-[20px]">{data?.category.name}</span>
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-xs pb-2">メモ</span>
          <div className="text-lg overflow-scroll">
            {data?.description === ""
              ? "作成したメモがありません。"
              : data?.description}
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <MutationButton layoutMode="page" mode="modify">
          修正
        </MutationButton>
        <MutationButton layoutMode="page" mode="delete">
          削除
        </MutationButton>
      </div>
    </div>
  );
}
