"use client";

import Image from "next/image";
import { useGoBack } from "@/app/hooks/useGoBack";
import { ChangeEvent, FormEvent, useState, useTransition } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import {
  createSource,
  deleteSourceList,
  getSource,
} from "@/app/lib/financialSource";
import TransactionCommon from "@/app/ui/Modal/Common/TransactionCommom";
import DeleteCategorySource from "@/app/ui/Modal/Common/DeleteCategorySource";
import {
  createCategory,
  deleteCategoryList,
  getCategory,
} from "@/app/lib/category";
import { Button } from "@/app/ui/loginRegister/Button";
import { categorySourceStore } from "@/app/store/categorySourceStore";
import { createTransaction } from "@/app/lib/transaction";
import { useUser } from "@/app/contexts/UserContext";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

const oldData = z.object({
  income: z.array(z.object({ id: z.string(), name: z.string() })),
  expense: z.array(z.object({ id: z.string(), name: z.string() })),
});

type OldData = z.infer<typeof oldData>;

export type StateType = {
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

export default function Page({ params }: { params: { accountId: string } }) {
  // Left as a precaution in case the same situation occurs again.
  // const pathname = usePathname();
  // const shouldShowModal = pathname.includes("/writeTransaction");
  // if (!shouldShowModal) return null;

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
        await queryClient.invalidateQueries({
          queryKey: ["transactions", accountId],
        });
        router.replace(`/${accountId}/transactions`);
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
      queryClient.setQueryData(
        ["categories", accountId],
        (oldData: OldData) => {
          return {
            ...oldData,
            [response.type]: [
              ...oldData[type],
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
            [type]: oldData[type].filter(
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
            ...oldData[type],
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
          [type]: oldData[type].filter(
            (item) => !state.selected.includes(item.id),
          ),
        };
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const [isVisible, setIsVisible] = useState(true);

  return (
    <div className="absolute h-screen w-full bg-black bg-opacity-40 top-0 left-0 z-10">
      <div
        className="absolute right-4 top-4 bg-background rounded-xl"
        onClick={() => {
          setIsVisible(false);
          setTimeout(() => {
            goBack();
          }, 500);
          setTransactionType("expense");
          setCategory({ type: "expense", name: "未登録" });
          setSource({ type: "expense", name: "未登録" });
        }}
      >
        <Image src="/images/close.svg" alt="close" width={20} height={20} />
      </div>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ y: 600 }}
            animate={{ y: 0 }}
            exit={{ y: 600 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="absolute h-90vh bottom-0 p-5 bg-background w-full rounded-t-xl flex flex-col"
          >
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
          </motion.div>
        )}
      </AnimatePresence>
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
    </div>
  );
}
