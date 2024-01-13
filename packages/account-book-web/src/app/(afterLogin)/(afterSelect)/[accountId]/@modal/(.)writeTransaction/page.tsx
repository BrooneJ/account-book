"use client";

import Image from "next/image";
import { useGoBack } from "@/app/hooks/useGoBack";
import { ChangeEvent, FormEvent, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCategory } from "@/app/lib/getCategory";
import { Button } from "@/app/ui/loginRegister/Button";
import { createCategory } from "@/app/lib/createCategory";
import { z } from "zod";
import { createSource, getSource } from "@/app/lib/financialSource";

type IncomeType = "income" | "expense";

const oldData = z.object({
  income: z.array(z.string()),
  expense: z.array(z.string()),
});

type OldData = z.infer<typeof oldData>;

export default function Page({ params }: { params: { accountId: string } }) {
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

  const [isCamera, setIsCamera] = useState(false);
  const [isIncome, setIsIncome] = useState<IncomeType>("income");

  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0],
  );

  const [selectCategory, setSelectCategory] = useState(false);
  const [selectSource, setSelectSource] = useState(false);

  const [errorMessages, setErrorMessages] = useState("");

  const [categoryValue, setCategoryValue] = useState("");
  const [sourceValue, setSourceValue] = useState("");
  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
  };

  const queryClient = useQueryClient();

  const mutationCategory = useMutation({
    mutationFn: async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setCategoryValue("");

      const form = e.target as HTMLFormElement;
      const name = form.elements.namedItem("name") as HTMLInputElement;

      const categoryData = {
        name: name.value,
        type: isIncome,
      };

      const result = await createCategory(categoryData, accountId);
      return result;
    },
    onSuccess: (response) => {
      setErrorMessages("");
      queryClient.setQueryData(
        ["categories", accountId],
        (oldData: OldData) => {
          return {
            ...oldData,
            [response.type]: [...oldData[isIncome], response.name],
          };
        },
      );
    },
    onError: (error) => {
      setErrorMessages("カテゴリーが既に登録されています。");
    },
  });

  const mutationSource = useMutation({
    mutationFn: async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setSourceValue("");

      const form = e.target as HTMLFormElement;
      const name = form.elements.namedItem("name") as HTMLInputElement;

      const sourceData = {
        name: name.value,
        type: isIncome,
      };

      const result = await createSource(sourceData, accountId);
      return result;
    },
    onSuccess: (response) => {
      setErrorMessages("");
      queryClient.setQueryData(["sources", accountId], (oldData: OldData) => {
        return {
          ...oldData,
          [response.type]: [...oldData[isIncome], response.name],
        };
      });
    },
    onError: (error) => {
      setErrorMessages("収入源が既に登録されています。");
    },
  });

  return (
    <div className="absolute h-screen w-full bg-black bg-opacity-40 top-0 left-0 z-10">
      <div
        className="absolute right-4 top-4 bg-background rounded-xl"
        onClick={goBack}
      >
        <Image src="/images/close.svg" alt="close" width={20} height={20} />
      </div>
      <div className="absolute h-90vh bottom-0 p-5 bg-background w-full rounded-t-xl">
        <div className="flex">
          <div
            className={`grow flex justify-center font-bold text-xl pb-[10px] ${
              isCamera
                ? "text-gray-2 border-b-2 border-b-gray-2"
                : "text-primary border-b-2 border-b-primary"
            }`}
            onClick={() => setIsCamera(false)}
          >
            手入力
          </div>
          <div
            className={`grow flex justify-center font-bold text-xl pb-[10px] ${
              isCamera
                ? "text-primary border-b-2 border-b-primary"
                : "text-gray-2 border-b-2 border-b-gray-2"
            }`}
            onClick={() => setIsCamera(true)}
          >
            カメラ
          </div>
        </div>
        <div className="mt-6 bg-gray-1 rounded-lg flex p-[5px] h-[42px]">
          <div
            className={`grow flex items-center justify-center rounded-lg ${
              isIncome === "income" ? "bg-background shadow" : ""
            }`}
            onClick={() => setIsIncome("income")}
          >
            収入
          </div>
          <div
            className={`grow flex items-center justify-center rounded-lg ${
              isIncome === "expense" ? "bg-background shadow" : ""
            }`}
            onClick={() => setIsIncome("expense")}
          >
            支出
          </div>
        </div>
        <div className="mt-6">
          <div className="relative flex items-center">
            <div className="absolute left-0 pl-3 pt-2 items-center justify-center">
              <span className="text-2xl text-gray-2">¥</span>
            </div>
            <input
              type="number"
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
            value={selectedDate}
            onChange={handleDateChange}
          />
        </div>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-2xl">カテゴリ</span>
          <div onClick={() => setSelectCategory(true)}>未登録</div>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-2xl">どこから？</span>
          <div onClick={() => setSelectSource(true)}>未登録</div>
        </div>
      </div>
      {selectCategory ? (
        <div className="absolute h-90vh bottom-0 p-5 bg-background w-full rounded-t-xl flex flex-col">
          <span className="text-2xl font-bold">カテゴリー</span>
          <form onSubmit={mutationCategory.mutate}>
            <div className="mt-6 relative flex items-center">
              <input
                onChange={(e) => setCategoryValue(e.target.value)}
                value={categoryValue}
                name="name"
                className="py-3 px-5 rounded-3xl border border-gray-1 w-full"
                placeholder="新しい項目を作成"
              />
              <button className="bg-primary p-2 rounded-3xl absolute right-2">
                <Image
                  src="/images/plus.svg"
                  alt="plus"
                  width={20}
                  height={20}
                />
              </button>
            </div>
          </form>
          <div className="flex items-center justify-between">
            <span className="text-sm text-caution ml-2">{errorMessages}</span>
            <span className="block text-right py-2 mr-2">編集</span>
          </div>
          <div className="h-2/3 overflow-scroll">
            {isIncome === "income" ? (
              <div className="flex flex-wrap">
                {categoryData?.income.map((category: string) => (
                  <div
                    tabIndex={0}
                    className="border border-2 border-gray-1 text-gray-1 rounded-lg p-2 m-1 focus:border-primary focus:border-2 focus:text-point"
                    key={category}
                  >
                    {category}
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-wrap">
                {categoryData?.expense.map((category: string) => (
                  <div
                    tabIndex={0}
                    className="border border-2 border-gray-1 text-gray-1 rounded-lg p-2 m-1 focus:border-primary focus:border-2 focus:text-point"
                    key={category}
                  >
                    {category}
                  </div>
                ))}
              </div>
            )}
          </div>
          <Button
            layoutMode="fullWidth"
            disabled={false}
            onClick={() => setSelectCategory(false)}
          >
            選択
          </Button>
        </div>
      ) : null}

      {selectSource ? (
        <div className="absolute h-90vh bottom-0 p-5 bg-background w-full rounded-t-xl flex flex-col">
          <span className="text-2xl font-bold">収入源</span>
          <form onSubmit={mutationSource.mutate}>
            <div className="mt-6 relative flex items-center">
              <input
                onChange={(e) => setSourceValue(e.target.value)}
                value={sourceValue}
                name="name"
                className="py-3 px-5 rounded-3xl border border-gray-1 w-full"
                placeholder="新しい項目を作成"
              />
              <button className="bg-primary p-2 rounded-3xl absolute right-2">
                <Image
                  src="/images/plus.svg"
                  alt="plus"
                  width={20}
                  height={20}
                />
              </button>
            </div>
          </form>
          <div className="flex items-center justify-between">
            <span className="text-sm text-caution ml-2">{errorMessages}</span>
            <span className="block text-right py-2 mr-2">編集</span>
          </div>
          <div className="h-2/3 overflow-scroll">
            {isIncome === "income" ? (
              <div className="flex flex-wrap">
                {sourceData?.income.map((source: string) => (
                  <div
                    tabIndex={0}
                    className="border border-2 border-gray-1 text-gray-1 rounded-lg p-2 m-1 focus:border-primary focus:border-2 focus:text-point"
                    key={source}
                  >
                    {source}
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-wrap">
                {sourceData?.expense.map((source: string) => (
                  <div
                    tabIndex={0}
                    className="border border-2 border-gray-1 text-gray-1 rounded-lg p-2 m-1 focus:border-primary focus:border-2 focus:text-point"
                    key={source}
                  >
                    {source}
                  </div>
                ))}
              </div>
            )}
          </div>
          <Button
            layoutMode="fullWidth"
            disabled={false}
            onClick={() => setSelectSource(false)}
          >
            選択
          </Button>
        </div>
      ) : null}
    </div>
  );
}