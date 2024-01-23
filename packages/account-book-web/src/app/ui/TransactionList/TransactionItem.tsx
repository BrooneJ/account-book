import { memo } from "react";
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

type Props = {
  transaction: Transaction;
};

const TransactionItem = memo(({ transaction }: Props) => {
  return (
    <div
      key={transaction.id}
      className="flex justify-between bg-white h-[46px] px-3 rounded-xl items-center justify-center my-2"
    >
      <div className="flex">
        {transaction.type === "income" ? (
          <Image src="/images/income.svg" alt="income" width={35} height={35} />
        ) : (
          <Image
            src="/images/expense.svg"
            alt="expense"
            width={35}
            height={35}
          />
        )}
        <div className="flex flex-col ml-3">
          <span className="text-lg">{transaction.financialSource.name}</span>
          <span className="text-xs text-gray-2">
            {transaction.category.name}
          </span>
        </div>
      </div>
      <div
        className={`flex py-1 px-2 rounded-xl ${
          transaction.type === "income" ? "bg-incomeBg" : "bg-expenseBg"
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
});

export default TransactionItem;
