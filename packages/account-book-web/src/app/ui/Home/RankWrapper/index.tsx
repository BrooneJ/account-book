"use client";

import { useStatisticsStore } from "@/app/store/statisticsStore";
import { getTransactionByMonth } from "@/app/lib/transaction";
import { QueryClient, useQuery } from "@tanstack/react-query";
import StatisticsRank from "@/app/ui/Statistics/SingleMonthStatsView/StatisticsRank";
import { StatisticsResponseListType } from "@/app/ui/Statistics/SingleMonthStatsView/type";

export default function RankWrapper({ accountId }: { accountId: string }) {
  const { date, type } = useStatisticsStore((state) => state);

  const { data, isFetching } = useQuery<StatisticsResponseListType>({
    queryKey: ["statistics", date, type],
    queryFn: () => getTransactionByMonth(accountId, type, date),
  });

  return (
    <div className="mt-5">
      <span className="text-xl font-semibold">今月トップカテゴリー３つ</span>
      <div className="bg-night mt-2 p-2 rounded-xl overflow-hidden">
        <div className="relative h-48">
          <StatisticsRank
            data={data?.splice(0, 3)}
            isFetching={isFetching}
            home
          />
        </div>
      </div>
    </div>
  );
}
