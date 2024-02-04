import { memo } from "react";
import { Transaction } from "@/app/(afterLogin)/(afterSelect)/[accountId]/transactions/type";
import TransactionTypeIcon from "@/app/ui/TransactionList/TransactionTypeIcon";

type Props = {
  transaction: Transaction;
  modal?: boolean;
};

const TransactionItem = memo(({ transaction, modal }: Props) => {
  return (
    <div
      key={transaction.id}
      className="flex justify-between bg-white h-[46px] px-3 rounded-xl items-center justify-center my-2"
    >
      <div className="flex">
        <TransactionTypeIcon type={transaction.type} modal={modal} />
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
