import { memo } from "react";
import { Transaction } from "@/app/(afterLogin)/(afterSelect)/[accountId]/transactions/type";
import TransactionTypeIcon from "@/app/ui/TransactionList/TransactionTypeIcon";
import TransactionAmountBadge from "@/app/ui/TransactionList/TransactionAmountBadge";
import CategorySourceName from "@/app/ui/TransactionList/CategorySourceName";

type Props = {
  transaction: Transaction;
  modal?: boolean;
};

const TransactionItem = memo(({ transaction, modal }: Props) => {
  return (
    <div
      key={transaction.id}
      className={`
        flex justify-between bg-white h-[46px] rounded-xl items-center justify-center my-2 ${
          modal ? "px-2" : "px-3"
        }
      `}
    >
      <div className="flex">
        <TransactionTypeIcon type={transaction.type} modal={modal} />
        <CategorySourceName
          categoryName={transaction.category.name}
          sourceName={transaction.financialSource.name}
          modal={modal}
        />
      </div>
      <TransactionAmountBadge
        type={transaction.type}
        amount={transaction.amount}
      />
    </div>
  );
});

export default TransactionItem;
