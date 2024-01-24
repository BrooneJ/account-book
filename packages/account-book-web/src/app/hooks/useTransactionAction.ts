import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { useTransactionId } from "@/app/hooks/useTransactionId";
import { deleteTransaction } from "@/app/lib/transaction";

export function useDeleteTransaction() {
  const transactionId = useTransactionId();
  const queryClient = useQueryClient();
  return useCallback(
    async (accountId: string) => {
      if (!transactionId) return;
      await deleteTransaction({ accountId, transactionId });
      await queryClient.invalidateQueries({
        queryKey: ["transactions", accountId],
      });
    },
    [transactionId],
  );
}
