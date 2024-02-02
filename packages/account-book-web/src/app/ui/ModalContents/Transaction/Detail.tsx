"use client";

import MutationButton from "@/app/ui/TransactionList/MutationButton";
import { TransactionDetail } from "@/app/(afterLogin)/(afterSelect)/[accountId]/transactions/type";
import { useDeleteTransaction } from "@/app/hooks/useTransactionAction";
import { useGoBack } from "@/app/hooks/useGoBack";
import { useQuery } from "@tanstack/react-query";
import { getTransactionDetail } from "@/app/lib/transaction";
import Spinner from "@/app/ui/Common/Spinner";
import SkeletonForDetail from "@/app/ui/ModalContents/Transaction/SkeletonForDetail";

type Props = {
  accountId: string;
  transactionId: string;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Detail({ setIsEdit, accountId, transactionId }: Props) {
  const { data, isFetching } = useQuery<TransactionDetail>({
    queryKey: ["transaction", accountId, transactionId],
    queryFn: () => getTransactionDetail(accountId, transactionId),
  });
  const deleteTransaction = useDeleteTransaction();
  const goBack = useGoBack();

  const date = data?.date.toString().split("T")[0].split("-");

  if (isFetching) return <SkeletonForDetail />;

  return (
    <div className="flex flex-col p-5 bg-background rounded-xl h-[463px] w-[285px]">
      <div className="flex items-center justify-between py-2 border-b border-b-gray-1">
        <span
          className={`text-xl ${
            data?.type === "income" ? "text-incomeText" : "text-expenseText"
          }`}
        >
          {data?.type === "income" ? "+" : "-"}
          {data?.amount.toLocaleString()}
        </span>
        <div
          className={`px-4 rounded-2xl border border-gray-1 ${
            data?.type === "income" ? "bg-incomeBg" : "bg-expenseBg"
          }`}
        >
          <span
            className={`text-xs ${
              data?.type === "income" ? "text-incomeText" : "text-expenseText"
            }`}
          >
            {data?.type === "income" ? "収入" : "支出"}
          </span>
        </div>
      </div>
      <div className="text-right text-sm text-gray-2 pt-[10px] pb-[14px]">
        {data?.date ? `${date![0]}年${date![1]}月${date![2]}日` : ""}
      </div>
      <div className="flex flex-col grow">
        <div className="flex border-b border-b-gray-1 pb-2 mb-2">
          <div className="flex flex-col grow">
            <span className="text-xs">
              {data?.type === "income" ? "収入源" : "支出先"}
            </span>
            <span className="text-[20px]">{data?.financialSource.name}</span>
          </div>
          <div className="flex flex-col grow">
            <span className="text-xs">カテゴリー</span>
            <span className="text-[20px]">{data?.category.name}</span>
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-xs pb-2">メモ</span>
          <div className="text-sm overflow-scroll">
            {data?.description === ""
              ? "作成したメモがありません。"
              : data?.description}
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <MutationButton
          layoutMode="modal"
          mode="modify"
          onClick={() => setIsEdit(true)}
        >
          修正
        </MutationButton>
        <MutationButton
          layoutMode="modal"
          mode="delete"
          onClick={async () => {
            await deleteTransaction(accountId);
            goBack();
          }}
        >
          削除
        </MutationButton>
      </div>
    </div>
  );
}
