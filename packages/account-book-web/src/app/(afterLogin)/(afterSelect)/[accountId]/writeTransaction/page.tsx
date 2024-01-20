"use client";

import { categorySourceStore } from "@/app/store/categorySourceStore";
import { useGoBack } from "@/app/hooks/useGoBack";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createCategory,
  deleteCategoryList,
  getCategory,
} from "@/app/lib/category";
import {
  createSource,
  deleteSourceList,
  getSource,
} from "@/app/lib/financialSource";
import { ChangeEvent, FormEvent, useState, useTransition } from "react";
import { useUser } from "@/app/contexts/UserContext";
import { useRouter } from "next/navigation";
import { createTransaction } from "@/app/lib/transaction";
import { Button } from "@/app/ui/loginRegister/Button";
import TransactionCommon from "@/app/ui/Modal/Common/TransactionCommom";
import DeleteCategorySource from "@/app/ui/Modal/Common/DeleteCategorySource";
import { z } from "zod";

const oldData = z.object({
  income: z.array(z.string()),
  expense: z.array(z.string()),
});

type OldData = z.infer<typeof oldData>;

export type StateType = {
  errorMessages: string;
  isIncome: "income" | "expense";
  selectSource: boolean;
  inputValue: string;
  isCamera: boolean;
  deleteSource: boolean;
  selectedDate: string;
  deleteCategory: boolean;
  selected: string[];
  selectCategory: boolean;
};

export default function writeAccountBookPage({
  params,
}: {
  params: { accountId: string };
}) {
  const { type, setTransactionType, category, source, setSource, setCategory } =
    categorySourceStore();
  const goBack = useGoBack();
  const accountId = params.accountId;

  const { data: categoryData } = useQuery({
    queryKey: ["categories", accountId],
    queryFn: () => getCategory(accountId),
  });

  const { data: sourceData } = useQuery({
    queryKey: ["sources", accountId],
    queryFn: () => getSource(accountId),
  });

  const [state, setState] = useState({
    isCamera: false,
    selectedDate: new Date().toISOString().split("T")[0],
    selectCategory: false,
    selectSource: false,
    deleteCategory: false,
    deleteSource: false,
    selected: [] as string[],
    errorMessages: "",
    inputValue: "",
  });

  const [isPending, startTransition] = useTransition();
  const user = useUser();
  const router = useRouter();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(async () => {
      const form = e.target as HTMLFormElement;
      const amount = form.elements.namedItem("amount") as HTMLInputElement;
      const description = form.elements.namedItem(
        "description",
      ) as HTMLTextAreaElement;

      const transactionData = {
        userId: user!.id,
        amount: Number(amount.value),
        description: description.value,
        date: state.selectedDate,
        category: category.name,
        financialSource: source.name,
        type,
      };

      try {
        const result = await createTransaction(transactionData, accountId);
        setCategory({ type: "income", name: "未登録" });
        setSource({ type: "income", name: "未登録" });
        router.replace(`/${accountId}/transactionDetail`);
        return result;
      } catch (error) {
        console.log(error);
      }
    });
  };

  const updateState = (newState: Partial<StateType>) => {
    setState((prevState) => ({ ...prevState, ...newState }));
  };

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateState({ selectedDate: e.target.value });
  };

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
      updateState({ errorMessages: "" });
      queryClient.setQueryData(
        ["categories", accountId],
        (oldData: OldData) => {
          return {
            ...oldData,
            [response.type]: [...oldData[type], response.name],
          };
        },
      );
    },
    onError: (error) => {
      updateState({ errorMessages: "カテゴリーが既に登録されています。" });
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
            [type]: oldData[type].filter(
              (item) => !state.selected.includes(item),
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
      updateState({ errorMessages: "" });
      queryClient.setQueryData(["sources", accountId], (oldData: OldData) => {
        return {
          ...oldData,
          [response.type]: [...oldData[type], response.name],
        };
      });
    },
    onError: (error) => {
      updateState({ errorMessages: "収入源が既に登録されています。" });
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
          [type]: oldData[type].filter(
            (item) => !state.selected.includes(item),
          ),
        };
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return (
    <div className="h-full pt-5 flex pb-14">
      <div className="bg-background w-full rounded-t-xl flex flex-col">
        <div className="flex">
          <div
            className={`grow flex justify-center font-bold text-xl pb-[10px] ${
              state.isCamera
                ? "text-gray-2 border-b-2 border-b-gray-2"
                : "text-primary border-b-2 border-b-primary"
            }`}
            onClick={() => updateState({ isCamera: false })}
          >
            手入力
          </div>
          <div
            className={`grow flex justify-center font-bold text-xl pb-[10px] ${
              state.isCamera
                ? "text-primary border-b-2 border-b-primary"
                : "text-gray-2 border-b-2 border-b-gray-2"
            }`}
            onClick={() => updateState({ isCamera: true })}
          >
            カメラ
          </div>
        </div>
        <div className="mt-6 bg-gray-1 rounded-lg flex p-[5px] h-[42px]">
          <div
            className={`grow flex items-center justify-center rounded-lg ${
              type === "income" ? "bg-background shadow" : ""
            }`}
            onClick={() => {
              setTransactionType("income");
              setSource({ type: "income", name: "未登録" });
              setCategory({ type: "income", name: "未登録" });
            }}
          >
            収入
          </div>
          <div
            className={`grow flex items-center justify-center rounded-lg ${
              type === "expense" ? "bg-background shadow" : ""
            }`}
            onClick={() => {
              setTransactionType("expense");
              setSource({ type: "expense", name: "未登録" });
              setCategory({ type: "expense", name: "未登録" });
            }}
          >
            支出
          </div>
        </div>
        <form className="flex flex-col grow" onSubmit={onSubmit}>
          <div className="mt-6">
            <div className="relative flex items-center">
              <div className="absolute left-0 pl-3 pt-2 items-center justify-center">
                <span className="text-2xl text-gray-2">¥</span>
              </div>
              <input
                type="number"
                name="amount"
                className="w-full h-12 border-0 bg-background border-b-2 px-4 mt-2 focus:outline-none focus:border-b-2 focus:border-primary text-xl text-right"
                placeholder="金額を入力してください。"
              />
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-2xl">日付</span>
            <input
              type="date"
              className="border-0 bg-background p-2 rounded focus:outline-none focus:border-b-primary text-xl text-right border-b-2 border"
              value={state.selectedDate}
              onChange={handleDateChange}
            />
          </div>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-2xl">カテゴリー</span>
            <div onClick={() => updateState({ selectCategory: true })}>
              {category.name}
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-2xl">
              {type === "income" ? "どこから？" : "どこで？"}
            </span>
            <div onClick={() => updateState({ selectSource: true })}>
              {source.name}
            </div>
          </div>
          <div className="pt-4 grow flex flex-col">
            <label className="text-2xl">メモ</label>
            <textarea
              name="description"
              className="w-full h-50 rounded-lg bg-gray-200 p-3 my-2 focus:outline-none text-lg grow"
              placeholder="メモを入力してください。"
            ></textarea>
          </div>
          <Button layoutMode="fullWidth" disabled={isPending}>
            登録
          </Button>
        </form>
      </div>
      {state.selectCategory ? (
        <TransactionCommon
          title="カテゴリー"
          mutation={mutationCategory.mutate}
          inputValue={state.inputValue}
          setInputValue={(value) => updateState({ inputValue: value })}
          errorMessages={state.errorMessages}
          setDelete={(value) => updateState({ deleteCategory: value })}
          data={
            type === "income" ? categoryData?.income : categoryData?.expense
          }
          onClose={() => {
            updateState({ selectCategory: false });
            updateState({ errorMessages: "" });
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
          title="収入源"
          mutation={mutationSource.mutate}
          inputValue={state.inputValue}
          setInputValue={(value) => updateState({ inputValue: value })}
          errorMessages={state.errorMessages}
          setDelete={(value) => updateState({ deleteSource: value })}
          data={type === "income" ? sourceData?.income : sourceData?.expense}
          onClose={() => {
            updateState({ selectSource: false });
            updateState({ errorMessages: "" });
          }}
          onSelected={(value) => setSource(value)}
        />
      ) : null}

      {state.deleteSource ? (
        <DeleteCategorySource
          title="収入源"
          mutation={mutationDeleteSource.mutate}
          updateState={updateState}
          data={type === "income" ? sourceData?.income : sourceData?.expense}
          isIncome={type}
          selected={state.selected}
          setDelete={(value) => updateState({ deleteSource: value })}
        />
      ) : null}
    </div>
  );
}
