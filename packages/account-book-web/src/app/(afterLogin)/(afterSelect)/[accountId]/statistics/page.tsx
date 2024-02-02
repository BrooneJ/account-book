"use client";

import { useState } from "react";
import LowHeader from "@/app/ui/Header/lowHeader";
import StatisticsPeriodSelector from "@/app/ui/Statistics/StatisticsPeriodSelector";
import SingleMonthStatsView from "@/app/ui/Statistics/SingleMonthStatsView";

export default function Page({ params }: { params: { accountId: string } }) {
  const accountId = params.accountId;

  const [isSixMonth, setIsSixMonth] = useState(false);

  return (
    <div className="h-full">
      <LowHeader headerLeft={true} title="統計" />
      <div className="mb-[10px]">
        <StatisticsPeriodSelector
          isSixMonth={isSixMonth}
          setIsSixMonth={setIsSixMonth}
        />
      </div>
      <SingleMonthStatsView accountId={accountId} />
    </div>
  );
}
