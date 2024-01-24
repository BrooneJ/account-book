"use client";

import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { getTransactionsAll } from "@/app/lib/transaction";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import TransactionItem from "@/app/ui/TransactionList/TransactionItem";
import AmountsPerDay from "@/app/ui/TransactionList/AmountsPerDay";
import { calculateTotalAmountPerDay } from "@/app/lib/calculateTotalAmountPerDay";
import Image from "next/image";

type PaginatedTransactions = {
  list: Transaction[];
  endCursor: number;
  endCursorDate: string;
  hasNextPage: boolean;
};

type Transaction = {
  id: number;
  type: "income" | "expense";
  amount: number;
  date: Date;
  category: {
    name: string;
  };
  financialSource: {
    name: string;
  };
};

export type GroupedTransactions = {
  [key: string]: Transaction[];
};

export default function TransactionList({ accountId }: { accountId: string }) {
  const { data, isFetching, fetchNextPage } = useInfiniteQuery<
    PaginatedTransactions,
    Object,
    InfiniteData<PaginatedTransactions>,
    [_1: string, _2: string],
    [string, number]
  >({
    queryKey: ["transactions", accountId],
    queryFn: ({ pageParam }) => getTransactionsAll(accountId, pageParam),
    initialPageParam: ["", 0],
    getNextPageParam: (lastPage) => {
      return [
        lastPage.list.at(-1)!.date.toString().split("T")[0],
        lastPage.list.at(-1)!.id,
      ];
    },
  });

  const { ref, inView } = useInView({
    threshold: 0,
    delay: 0,
  });

  const [transactions, setTransactions] = useState({} as GroupedTransactions);

  if (!data || data.pages.length === 0)
    return (
      <div className="flex grow justify-center items-center">
        履歴が存在していません。
      </div>
    );

  const hasNextPage = data.pages[data.pages.length - 1].hasNextPage;

  useEffect(() => {
    const groupedTransactions = data.pages.reduce(
      (groupedTransactions, page) => {
        const newGroupedTransactions = { ...groupedTransactions };

        page.list.forEach((transaction) => {
          const date = transaction.date.toString().split("T")[0];
          if (newGroupedTransactions[date]) {
            newGroupedTransactions[date] = [
              ...newGroupedTransactions[date],
              transaction,
            ];
          } else {
            newGroupedTransactions[date] = [transaction];
          }
        });

        return newGroupedTransactions;
      },
      {} as GroupedTransactions,
    );
    setTransactions(groupedTransactions);
  }, [data]);

  useEffect(() => {
    if (inView) {
      !isFetching && hasNextPage && fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  const totalAmountsPerDay = calculateTotalAmountPerDay(transactions);

  return (
    <div className="grow">
      {Object.keys(transactions).map((key) => {
        return (
          <div key={key} className="mb-2">
            <AmountsPerDay
              totalAmountsPerDay={totalAmountsPerDay}
              dataKey={key}
            />
            <div>
              {transactions[key].map((transaction, index) => (
                <TransactionItem key={index} transaction={transaction} />
              ))}
            </div>
          </div>
        );
      })}
      {isFetching && (
        <div className="flex justify-center items-center pt-2">
          <Image
            src="/images/loading.svg"
            alt=""
            width={24}
            height={24}
            className="animate-spin"
          />
        </div>
      )}
      <div ref={ref} style={{ height: 50 }} />
    </div>
  );
}
