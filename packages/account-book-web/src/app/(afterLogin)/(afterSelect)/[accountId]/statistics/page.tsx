"use client";

import { useState } from "react";
import LowHeader from "@/app/ui/Header/lowHeader";
import PieChart from "@/app/ui/Statistics/PieGraph";

export default function Page({ params }: { params: { accountId: string } }) {
  const accountId = params.accountId;

  const [isIncome, setIsIncome] = useState<"income" | "expense">("expense");
  const [date, setDate] = useState<string>(
    new Date().toISOString().split("T")[0],
  );

  return (
    <div className="h-full">
      <LowHeader headerLeft={true} title="統計" />
      <div className="-m-5 h-1/2">
        <PieChart accountId={accountId} type={isIncome} date={date} />
      </div>
    </div>
  );
}
