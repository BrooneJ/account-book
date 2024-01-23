import { GroupedTransactions } from "@/app/ui/TransactionList";

type TotalAmountsPerDay = {
  [date: string]: number;
};

export const calculateTotalAmountPerDay = (
  groupedTransactions: GroupedTransactions,
): TotalAmountsPerDay => {
  return Object.keys(groupedTransactions).reduce((totals, date) => {
    const totalAmount = groupedTransactions[date].reduce((sum, transaction) => {
      if (transaction.type === "income") {
        return sum + transaction.amount;
      } else {
        return sum - transaction.amount;
      }
    }, 0);
    totals[date] = totalAmount;
    return totals;
  }, {} as TotalAmountsPerDay);
};
