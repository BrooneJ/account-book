"use client";

import { useModalVisibleStore } from "@/app/store/modalVisibleStore";
import Modal from "@/app/ui/Common/Modal";
import { useStatisticsStore } from "@/app/store/statisticsStore";
import { getTransactionByCategory } from "@/app/lib/transaction";
import { useQuery } from "@tanstack/react-query";
import { Transaction } from "@/app/(afterLogin)/(afterSelect)/[accountId]/transactions/type";
import { useEffect, useState } from "react";
import { calculateTotalAmountPerDay } from "@/app/lib/calculateTotalAmountPerDay";
import AmountsPerDay from "@/app/ui/TransactionList/AmountsPerDay";
import Link from "next/link";
import TransactionItem from "@/app/ui/TransactionList/TransactionItem";
import ListModalSkeleton from "@/app/ui/Statistics/SingleMonthStatsView/StatisticsRank/ListModalSkeleton";

export type GroupedTransactions = {
  [key: string]: Transaction[];
};

export default function Page({
  params,
}: {
  params: { categoryId: string; accountId: string };
}) {
  const { categoryId, accountId } = params;
  const visible = useModalVisibleStore((store) => store.visible);
  const { type, date } = useStatisticsStore((state) => state);

  const { data, isFetching } = useQuery<Transaction[]>({
    queryKey: ["statistics", categoryId, accountId],
    queryFn: () => getTransactionByCategory(accountId, categoryId, type, date),
  });

  const [transactions, setTransactions] = useState({} as GroupedTransactions);

  useEffect(() => {
    if (!data) return;
    const groupedTransactions = data.reduce(
      (groupedTransactions, transaction) => {
        const newGroupedTransactions = { ...groupedTransactions };
        const date = transaction.date.toString().split("T")[0];
        if (newGroupedTransactions[date]) {
          newGroupedTransactions[date] = [
            ...newGroupedTransactions[date],
            transaction,
          ];
        } else {
          newGroupedTransactions[date] = [transaction];
        }
        return newGroupedTransactions;
      },
      {} as GroupedTransactions,
    );
    setTransactions(groupedTransactions);
  }, [data]);

  const totalAmountsPerDay = calculateTotalAmountPerDay(transactions);

  return (
    <>
      <Modal visible={visible}>
        {isFetching ? (
          <ListModalSkeleton />
        ) : (
          <div className="p-[10px] flex flex-col h-full">
            <span className="flex justify-center font-semibold">利用履歴</span>
            <div className="grow overflow-scroll">
              {Object.keys(transactions).map((key) => {
                return (
                  <div key={key} className="mb-3">
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
                          <TransactionItem transaction={transaction} modal />
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
