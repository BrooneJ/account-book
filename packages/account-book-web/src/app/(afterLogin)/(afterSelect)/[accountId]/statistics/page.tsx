"use client";

import { useState } from "react";
import LowHeader from "@/app/ui/Header/lowHeader";
import PieChart from "@/app/ui/Statistics/PieGraph";
import MonthIndicator from "@/app/ui/Statistics/MonthIndicator";

export default function Page({ params }: { params: { accountId: string } }) {
  const accountId = params.accountId;

  const [isIncome, setIsIncome] = useState<"income" | "expense">("expense");
  const [date, setDate] = useState<string>(
    new Date().toISOString().split("T")[0],
  );

  return (
    <div className="h-full">
      <LowHeader headerLeft={true} title="統計" />
      <div className="relative z-10">
        <MonthIndicator setDate={setDate} date={date} />
      </div>
      <div className="relative -m-3 h-80">
        <PieChart accountId={accountId} type={isIncome} date={date} />
      </div>
    </div>
  );
}
