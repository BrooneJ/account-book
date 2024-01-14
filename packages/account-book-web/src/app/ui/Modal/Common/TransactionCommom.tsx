import Image from "next/image";
import { Button } from "@/app/ui/loginRegister/Button";
import { UseMutateFunction } from "@tanstack/react-query";
import { FormEvent } from "react";

type TransactionCommonProps = {
  title: string;
  mutation: UseMutateFunction<any, Error, FormEvent<HTMLFormElement>, unknown>;
  inputValue: string;
  setInputValue: (value: string) => void;
  errorMessages: string;
  data: string[];
  onClose: () => void;
  isIncome: string;
};

const TransactionCommon = ({
  title,
  mutation,
  inputValue,
  setInputValue,
  errorMessages,
  data,
  onClose,
}: TransactionCommonProps) => {
  return (
    <div className="absolute h-90vh bottom-0 p-5 bg-background w-full rounded-t-xl flex flex-col">
      <span className="text-2xl font-bold">{title}</span>
      <form onSubmit={mutation}>
        <div className="mt-6 relative flex items-center">
          <input
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
            name="name"
            className="py-3 px-5 rounded-3xl border border-gray-1 w-full"
            placeholder="新しい項目を作成"
          />
          <button className="bg-primary p-2 rounded-3xl absolute right-2">
            <Image src="/images/plus.svg" alt="plus" width={20} height={20} />
          </button>
        </div>
      </form>
      <div className="flex items-center justify-between">
        <span className="text-sm text-caution ml-2">{errorMessages}</span>
        <span className="block text-right py-2 mr-2">編集</span>
      </div>
      <div className="h-2/3 overflow-scroll">
        <div className="flex flex-wrap">
          {data.map((item: string) => (
            <div
              tabIndex={0}
              className="border border-2 border-gray-1 text-gray-1 rounded-lg p-2 m-1 focus:border-primary focus:border-2 focus:text-point"
              key={item}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
      <Button layoutMode="fullWidth" disabled={false} onClick={onClose}>
        選択
      </Button>
    </div>
  );
};

export default TransactionCommon;
