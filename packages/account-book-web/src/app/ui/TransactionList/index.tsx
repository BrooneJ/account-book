"use client";

import { useQuery } from "@tanstack/react-query";
import { getTransactionsAll } from "@/app/lib/transaction";
import Image from "next/image";

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

type Transactions = Transaction[];

type GroupedTransactions = {
  [key: string]: Transaction[];
};

type TotalAmountsPerDay = {
  [date: string]: number;
};

export default function TransactionList({ accountId }: { accountId: string }) {
  const { data, isLoading } = useQuery<Transactions>({
    queryKey: ["transactions", accountId],
    queryFn: () => getTransactionsAll(accountId),
  });

  if (isLoading)
    return (
      <div className="flex grow justify-center items-center">loading...</div>
    );

  if (!data || data.length === 0)
    return (
      <div className="flex grow justify-center items-center">
        履歴が存在していません。
      </div>
    );

  const transactions = data!.reduce(
    (groups: GroupedTransactions, transaction) => {
      const date = transaction.date.toString().split("T")[0];
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(transaction);

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
    </div>
  );
}
