import { useState } from "react";
import MonthIndicator from "@/app/ui/Statistics/MonthIndicator";
import PieChart from "@/app/ui/Statistics/PieGraph";
import { useQuery } from "@tanstack/react-query";
import { getTransactionByMonth } from "@/app/lib/transaction";
import { StatisticsResponseType } from "@/app/ui/Statistics/type";
import StatisticsRank from "@/app/ui/Statistics/StatisticsRank";
import { useStatisticsStore } from "@/app/store/statisticsStore";

const SingleMonthStatsView = ({ accountId }: { accountId: string }) => {
  const { date, type } = useStatisticsStore((state) => state);

  const { data, isFetching } = useQuery<StatisticsResponseType>({
    queryKey: ["statistics", date, type],
    queryFn: () => getTransactionByMonth(accountId, type, date),
  });

  return (
    <>
      <div className="relative z-10">
        <MonthIndicator />
      </div>
      <div className="relative -m-3 h-80">
        <PieChart data={data} />
      </div>
      <div className="relative -mt-10 h-64 pb-16 overflow-scroll">
        <StatisticsRank data={data} isFetching={isFetching} />
      </div>
    </>
  );
};

export default SingleMonthStatsView;
