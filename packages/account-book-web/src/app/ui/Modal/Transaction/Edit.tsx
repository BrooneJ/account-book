"use client";

import MutationButton from "@/app/ui/TransactionList/MutationButton";
import { TransactionDetail } from "@/app/(afterLogin)/(afterSelect)/[accountId]/transactions/type";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getTransactionDetail, updateTransaction } from "@/app/lib/transaction";
import { FormEvent, useEffect, useState } from "react";
import CancelButton from "@/app/ui/TransactionList/CancelButton";
import { categorySourceStore } from "@/app/store/categorySourceStore";
import { StateType } from "@/app/(afterLogin)/(afterSelect)/[accountId]/@modal/(.)writeTransaction/page";
import {
  createCategory,
  deleteCategoryList,
  getCategory,
} from "@/app/lib/category";
import { z } from "zod";
import {
  createSource,
  deleteSourceList,
  getSource,
} from "@/app/lib/financialSource";
import TransactionCommon from "@/app/ui/Modal/Write/TransactionCommom";
import DeleteCategorySource from "@/app/ui/Modal/Write/DeleteCategorySource";
import { useUser } from "@/app/contexts/UserContext";
import { useRouter } from "next/navigation";

type Props = {
  accountId: string;
  transactionId: string;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
};

const oldData = z.object({
  income: z.array(z.object({ id: z.string(), name: z.string() })),
  expense: z.array(z.object({ id: z.string(), name: z.string() })),
});

type OldData = z.infer<typeof oldData>;

export default function Edit({ setIsEdit, transactionId, accountId }: Props) {
  const { data, isFetching } = useQuery<TransactionDetail>({
    queryKey: ["transaction", accountId, transactionId],
    queryFn: () => getTransactionDetail(accountId, transactionId),
  });

  const { data: categoryData } = useQuery({
    queryKey: ["categories", accountId],
    queryFn: () => getCategory(accountId),
  });

  const { data: sourceData } = useQuery({
    queryKey: ["sources", accountId],
    queryFn: () => getSource(accountId),
  });

  const router = useRouter();

  const queryClient = useQueryClient();

  const mutationCategory = useMutation({
    mutationFn: async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      updateState({ inputValue: "" });

      const form = e.target as HTMLFormElement;
      const name = form.elements.namedItem("name") as HTMLInputElement;

      const categoryData = {
        name: name.value,
        type,
      };

      const result = await createCategory(categoryData, accountId);
      return result;
    },
    onSuccess: (response) => {
      queryClient.setQueryData(
        ["categories", accountId],
        (oldData: OldData) => {
          return {
            ...oldData,
            [response.type]: [
              ...oldData[type!],
              { id: response.id, name: response.name },
            ],
          };
        },
      );
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const mutationDeleteCategory = useMutation({
    mutationFn: async () => {
      await deleteCategoryList(accountId, type, state.selected);
    },
    onSuccess: () => {
      queryClient.setQueryData(
        ["categories", accountId],
        (oldData: OldData) => {
          return {
            ...oldData,
            [type!]: oldData[type!].filter(
              (item) => !state.selected.includes(item.id),
            ),
          };
        },
      );
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const mutationSource = useMutation({
    mutationFn: async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      updateState({ inputValue: "" });

      const form = e.target as HTMLFormElement;
      const name = form.elements.namedItem("name") as HTMLInputElement;

      const sourceData = {
        name: name.value,
        type,
      };

      const result = await createSource(sourceData, accountId);
      return result;
    },
    onSuccess: (response) => {
      queryClient.setQueryData(["sources", accountId], (oldData: OldData) => {
        return {
          ...oldData,
          [response.type]: [
            ...oldData[type!],
            { id: response.id, name: response.name },
          ],
        };
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const mutationDeleteSource = useMutation({
    mutationFn: async () => {
      await deleteSourceList(accountId, type, state.selected);
    },
    onSuccess: () => {
      queryClient.setQueryData(["sources", accountId], (oldData: OldData) => {
        return {
          ...oldData,
          [type!]: oldData[type!].filter(
            (item) => !state.selected.includes(item.id),
          ),
        };
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const { setCategory, category, setSource, source } = categorySourceStore();
  const user = useUser();

  useEffect(() => {
    setCategory({ type: data?.type, name: data?.category.name });
    setSource({ type: data?.type, name: data?.financialSource.name });
  }, [data]);

  const date = data?.date.toString().split("T")[0];

  const { register, setValue, watch, handleSubmit } = useForm({
    defaultValues: {
      amount: data?.amount,
      description: data?.description,
      date: date,
    },
  });

  const [state, setState] = useState({
    selectedDate: new Date().toISOString().split("T")[0],
    selectCategory: false,
    selectSource: false,
    deleteCategory: false,
    deleteSource: false,
    selected: [] as string[],
    inputValue: "",
  });

  const updateState = (newState: Partial<StateType>) => {
    setState((prevState) => ({ ...prevState, ...newState }));
  };

  const [type, setType] = useState(data?.type);

  if (isFetching) return <div>loading...</div>;

  const schema = z.object({
    amount: z.number().optional(),
    description: z.string().optional(),
    date: z.string().optional(),
  });

  type Schema = z.infer<typeof schema>;

  const onSubmit = async (data: Schema) => {
    const formData = {
      type: type,
      userId: user!.id,
      amount: Number(data.amount!),
      description: data.description!,
      date: data.date!,
      category: category.name,
      financialSource: source.name,
    };

    try {
      await updateTransaction(formData, accountId, Number(transactionId));
      router.push(`/${accountId}/transactions`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex flex-col p-5 bg-background rounded-xl h-[463px] w-[285px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center justify-between py-2 border-b border-b-gray-1">
            <input
              type="number"
              {...register("amount")}
              onChange={(event) =>
                setValue("amount", Number(event.target.value))
              }
            />
            <div
              className={`px-4 rounded-2xl border border-gray-1 ${
                type === "income" ? "bg-incomeBg" : "bg-expenseBg"
              }`}
              onClick={() => {
                if (type === "income") {
                  setType("expense");
                } else {
                  setType("income");
                }
              }}
            >
              <span
                className={`text-xs ${
                  type === "income" ? "text-incomeText" : "text-expenseText"
                }`}
              >
                {type === "income" ? "収入" : "支出"}
              </span>
            </div>
          </div>
          <div className="text-right text-sm text-gray-2 pt-[10px] pb-[14px]">
            <input type="date" {...register("date")} />
          </div>
          <div className="flex flex-col grow">
            <div className="flex border-b border-b-gray-1 pb-2 mb-2">
              <div className="flex flex-col grow">
                <span className="text-xs">
                  {type === "income" ? "収入源" : "支出先"}
                </span>
                <span
                  className="text-[20px]"
                  onClick={() => updateState({ selectSource: true })}
                >
                  {source.name}
                </span>
              </div>
              <div className="flex flex-col grow">
                <span className="text-xs">カテゴリー</span>
                <span
                  className="text-[20px]"
                  onClick={() => updateState({ selectCategory: true })}
                >
                  {category.name}
                </span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xs pb-2">メモ</span>
              <textarea
                className="text-sm overflow-scroll h-[200px]"
                {...register("description")}
                onChange={(event) =>
                  setValue("description", event.target.value.toString())
                }
              />
            </div>
          </div>
          <div className="flex justify-between">
            <MutationButton layoutMode="modal" mode="modify">
              修正
            </MutationButton>
            <CancelButton layoutMode="modal" onClick={() => setIsEdit(false)}>
              キャンセル
            </CancelButton>
          </div>
        </form>
      </div>
      {state.selectCategory ? (
        <TransactionCommon
          title="カテゴリー"
          mutation={mutationCategory.mutate}
          inputValue={state.inputValue}
          setInputValue={(value) => updateState({ inputValue: value })}
          setDelete={(value) => updateState({ deleteCategory: value })}
          data={
            type === "income" ? categoryData?.income : categoryData?.expense
          }
          onClose={() => {
            updateState({ selectCategory: false });
          }}
          onSelected={(value) => setCategory(value)}
        />
      ) : null}

      {state.deleteCategory ? (
        <DeleteCategorySource
          title="カテゴリー"
          mutation={mutationDeleteCategory.mutate}
          updateState={updateState}
          data={
            type === "income" ? categoryData?.income : categoryData?.expense
          }
          isIncome={type}
          selected={state.selected}
          setDelete={(value) => updateState({ deleteCategory: value })}
        />
      ) : null}

      {state.selectSource ? (
        <TransactionCommon
          title="支出先"
          mutation={mutationSource.mutate}
          inputValue={state.inputValue}
          setInputValue={(value) => updateState({ inputValue: value })}
          setDelete={(value) => updateState({ deleteSource: value })}
          data={type === "income" ? sourceData?.income : sourceData?.expense}
          onClose={() => {
            updateState({ selectSource: false });
          }}
          onSelected={(value) => setSource(value)}
        />
      ) : null}

      {state.deleteSource ? (
        <DeleteCategorySource
          title="支出先"
          mutation={mutationDeleteSource.mutate}
          updateState={updateState}
          data={type === "income" ? sourceData?.income : sourceData?.expense}
          isIncome={type}
          selected={state.selected}
          setDelete={(value) => updateState({ deleteSource: value })}
        />
      ) : null}
    </>
  );
}
