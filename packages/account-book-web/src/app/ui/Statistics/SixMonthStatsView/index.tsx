import { useQuery } from "@tanstack/react-query";
import { getTopTransactionByHalfYear } from "@/app/lib/transaction";
import { useStatisticsStore } from "@/app/store/statisticsStore";
import MonthIndicator from "@/app/ui/Statistics/MonthIndicator";
import { useEffect, useState } from "react";
import BarChartSkeleton from "@/app/ui/Statistics/SixMonthStatsView/BarChartSkeleton";
import MyResponsiveBar from "@/app/ui/Statistics/SixMonthStatsView/BarChart";
import { ResultType } from "@/app/ui/Statistics/SixMonthStatsView/type";

type SixMonthDataType = {
  result: ResultType[];
  list: string[];
};

export default function SixMonthStatsView({
  accountId,
}: {
  accountId: string;
}) {
  const { date, type } = useStatisticsStore((state) => state);

  const { data } = useQuery<SixMonthDataType>({
    queryKey: ["statistics", "barGraph", accountId, date],
    queryFn: () => getTopTransactionByHalfYear(accountId, type, date),
  });

  const [prevData, setPrevData] = useState(data);

  useEffect(() => {
    if (!data) return;
    setPrevData(data);
  }, [data]);

  if (!prevData || prevData.list.length === 0)
    return (
      <div style={{ height: "450px" }}>
        <MonthIndicator />
        <BarChartSkeleton />
      </div>
    );

  let count = 0;
  prevData?.result.forEach((item) => {
    for (const key in item) {
      count++;
    }
  });

  return (
    <>
      <MonthIndicator />
      {count === 6 ? (
        <>
          <BarChartSkeleton />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <span className="text-xl font-bold">データがありません。</span>
          </div>
        </>
      ) : (
        <MyResponsiveBar data={prevData.result} keys={prevData.list} />
      )}
    </>
  );
}
