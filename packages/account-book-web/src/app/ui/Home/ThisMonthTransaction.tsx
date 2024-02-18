"use client";

import { getThisMonthTransaction } from "@/app/lib/transaction";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

export default function ThisMonthTransaction({ id }: { id: string }) {
  const { data } = useQuery<{ income: number; expense: number }>({
    queryKey: ["accountbook", "thisMonthTransactions", id],
    queryFn: () => getThisMonthTransaction(id),
  });
  const thisMonth = new Date().getMonth() + 1;

  return (
    <Link href={`/${id}/transactions`}>
      <div className="flex items-center justify-between border border-gray-1 py-2 px-3 rounded-xl mt-4 bg-white">
        <div className="bg-sub h-12 w-12 rounded-3xl shadow shadow-gray-1 flex justify-center items-center">
          <span className="text-xl">{thisMonth}月</span>
        </div>
        <div className="flex grow justify-center">
          <div className="flex flex-col items-center grow border-r-[1px] text-incomeText">
            <span className="text-sm">収入</span>
            <span className="text-2xl">{data?.income.toLocaleString()}</span>
          </div>
          <div className="w-[1px] h-full bg-black"></div>
          <div className="flex flex-col items-center grow text-red-300">
            <span className="text-sm">支出</span>
            <span className="text-2xl">{data?.expense.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
