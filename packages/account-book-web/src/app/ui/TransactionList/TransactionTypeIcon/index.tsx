import Image from "next/image";

export default function TransactionTypeIcon({
  type,
  modal = false,
}: {
  type: "income" | "expense";
  modal?: boolean;
}) {
  const size = modal ? 30 : 35;
  return (
    <>
      {type === "income" ? (
        <Image
          src="/images/income.svg"
          alt="income"
          width={size}
          height={size}
        />
      ) : (
        <Image
          src="/images/expense.svg"
          alt="expense"
          width={size}
          height={size}
        />
      )}
    </>
  );
}
