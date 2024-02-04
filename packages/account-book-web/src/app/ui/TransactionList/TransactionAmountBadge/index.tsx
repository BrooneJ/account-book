type Props = {
  type: "income" | "expense";
  amount: number;
};

export default function TransactionAmountBadge({ type, amount }: Props) {
  return (
    <div
      className={`flex py-1 px-2 rounded-xl ${
        type === "income" ? "bg-incomeBg" : "bg-expenseBg"
      }`}
    >
      <span
        className={`flex justify-center items-center text-xs ${
          type === "income" ? "text-incomeText" : "text-expenseText"
        }`}
      >
        {type === "income" ? "+" : "-"}￥{amount.toLocaleString()}
      </span>
    </div>
  );
}
