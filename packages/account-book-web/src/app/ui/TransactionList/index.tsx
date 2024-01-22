"use client";

import {
  InfiniteData,
  useInfiniteQuery,
  useQuery,
} from "@tanstack/react-query";
import { getTransactionsAll } from "@/app/lib/transaction";
import Image from "next/image";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

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

type GroupedTransactions = {
  [key: string]: Transaction[];
};

type TotalAmountsPerDay = {
  [date: string]: number;
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

  const hasNextPage = data?.pages[data.pages.length - 1].hasNextPage;

  const { ref, inView } = useInView({
    threshold: 0,
    delay: 0,
  });

  useEffect(() => {
    if (inView) {
      !isFetching && hasNextPage && fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  if (isFetching)
    return (
      <div className="flex grow justify-center items-center">loading...</div>
    );
  //
  if (!data || data.pages.length === 0)
    return (
      <div className="flex grow justify-center items-center">
        履歴が存在していません。
      </div>
    );

  const transactions = data.pages.reduce(
    (groups: GroupedTransactions, page) => {
      page.list.forEach((transaction) => {
        const date = transaction.date.toString().split("T")[0];
        if (!groups[date]) {
          groups[date] = [];
        }
        groups[date].push(transaction);
      });
      return groups;
    },
    {},
  );

  const calculateTotalAmountPerDay = (
    groupedTransactions: GroupedTransactions,
  ): TotalAmountsPerDay => {
    return Object.keys(groupedTransactions).reduce((totals, date) => {
      const totalAmount = groupedTransactions[date].reduce(
        (sum, transaction) => {
          if (transaction.type === "income") {
            return sum + transaction.amount;
          } else {
            return sum - transaction.amount;
          }
        },
        0,
      );
      totals[date] = totalAmount;
      return totals;
    }, {} as TotalAmountsPerDay);
  };

  const totalAmountsPerDay = calculateTotalAmountPerDay(transactions);

  return (
    <div className="grow">
      {Object.keys(transactions).map((key) => {
        return (
          <div key={key} className="mb-2">
            <div className="border-b border-b-gray-1 py-1 flex justify-between">
              <span>
                {Number(key.split("-")[1])}月{Number(key.split("-")[2])}日
              </span>
              <span
                className={`pr-3 text-sm ${
                  totalAmountsPerDay[key] >= 0
                    ? "text-incomeText"
                    : "text-expenseText"
                }`}
              >
                {totalAmountsPerDay[key].toLocaleString()}
              </span>
            </div>
            <div>
              {transactions[key].map((transaction) => {
                return (
                  <div
                    key={transaction.id}
                    className="flex justify-between bg-white h-[46px] px-3 rounded-xl items-center justify-center my-2"
                  >
                    <div className="flex">
                      {transaction.type === "income" ? (
                        <Image
                          src="/images/income.svg"
                          alt="income"
                          width={35}
                          height={35}
                        />
                      ) : (
                        <Image
                          src="/images/expense.svg"
                          alt="expense"
                          width={35}
                          height={35}
                        />
                      )}
                      <div className="flex flex-col ml-3">
                        <span className="text-lg">
                          {transaction.financialSource.name}
                        </span>
                        <span className="text-xs text-gray-2">
                          {transaction.category.name}
                        </span>
                      </div>
                    </div>
                    <div
                      className={`flex py-1 px-2 rounded-xl ${
                        transaction.type === "income"
                          ? "bg-incomeBg"
                          : "bg-expenseBg"
                      }`}
                    >
                      <span
                        className={`flex justify-center items-center text-xs ${
                          transaction.type === "income"
                            ? "text-incomeText"
                            : "text-expenseText"
                        }`}
                      >
                        {transaction.type === "income" ? "+" : "-"}￥
                        {transaction.amount.toLocaleString()}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
      <div ref={ref} style={{ height: 50 }} />
    </div>
  );
}
