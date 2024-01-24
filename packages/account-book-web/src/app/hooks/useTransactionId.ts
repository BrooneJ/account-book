import { useParams } from "next/navigation";

export function useTransactionId() {
  const { transactionId } = useParams<{ transactionId: string }>();
  const parsedTransactionId = transactionId ? parseInt(transactionId) : null;
  return parsedTransactionId;
}
