"use client";

import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { getTransactionsAll } from "@/app/lib/transaction";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import TransactionItem from "@/app/ui/TransactionList/TransactionItem";
import AmountsPerDay from "@/app/ui/TransactionList/AmountsPerDay";
import { calculateTotalAmountPerDay } from "@/app/lib/calculateTotalAmountPerDay";
import Link from "next/link";
import { Transaction } from "@/app/(afterLogin)/(afterSelect)/[accountId]/transactions/type";
import Spinner from "@/app/ui/Common/Spinner";

type PaginatedTransactions = {
  list: Transaction[];
  endCursor: number;
  endCursorDate: string;
  hasNextPage: boolean;
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
    [string | undefined, number | undefined]
  >({
    queryKey: ["transactions", accountId],
    queryFn: ({ pageParam }) => getTransactionsAll(accountId, pageParam),
    initialPageParam: ["", 0],
    getNextPageParam: (lastPage) => {
      return [
        lastPage?.list.at(-1)?.date.toString().split("T")[0],
        lastPage?.list.at(-1)?.id,
      ];
    },
  });

  const { ref, inView } = useInView({
    threshold: 0,
    delay: 0,
  });

  const [transactions, setTransactions] = useState({} as GroupedTransactions);
  const hasNextPage = data?.pages[data.pages.length - 1].hasNextPage;

  useEffect(() => {
    if (!data) return;
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

  if (!data || data.pages[0].list.length === 0) {
    return (
      <div className="flex grow justify-center items-center">
        履歴が存在していません。
      </div>
    );
  }

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
              {transactions[key].map((transaction) => (
                <Link
                  href={`/${accountId}/transactions/${transaction.id}/detail`}
                  key={transaction.id}
                >
                  <TransactionItem transaction={transaction} />
                </Link>
              ))}
            </div>
          </div>
        );
      })}
      {isFetching && (
        <div className="flex justify-center items-center pt-2">
          <Spinner />
        </div>
      )}
      <div ref={ref} style={{ height: 50 }} />
    </div>
  );
}
