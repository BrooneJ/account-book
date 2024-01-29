import MutationButton from "@/app/ui/TransactionList/MutationButton";
import { TransactionDetail } from "@/app/(afterLogin)/(afterSelect)/[accountId]/transactions/type";
import { useForm } from "react-hook-form";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getTransactionDetail } from "@/app/lib/transaction";

type Props = {
  accountId: string;
  transactionId: string;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Edit({ setIsEdit, transactionId, accountId }: Props) {
  const { data, isFetching } = useSuspenseQuery<TransactionDetail>({
    queryKey: ["transaction", accountId, transactionId],
    queryFn: () => getTransactionDetail(accountId, transactionId),
  });

  const { register, setValue, watch } = useForm({
    defaultValues: {
      amount: data.amount,
    },
  });

  const date = data?.date.toString().split("T")[0].split("-");

  return (
    <div className="flex flex-col p-5 bg-background rounded-xl h-[463px] w-[285px]">
      <div className="flex items-center justify-between py-2 border-b border-b-gray-1">
        <input
          type="number"
          {...register("amount")}
          onChange={(event) => setValue("amount", Number(event.target.value))}
        />
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
      </div>
    </div>
  );
}
