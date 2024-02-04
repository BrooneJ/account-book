import Image from "next/image";

export default function TransactionTypeIcon({
  type,
}: {
  type: "income" | "expense";
}) {
  return (
    <>
      {type === "income" ? (
        <Image src="/images/income.svg" alt="income" width={35} height={35} />
      ) : (
        <Image src="/images/expense.svg" alt="expense" width={35} height={35} />
      )}
    </>
  );
}
