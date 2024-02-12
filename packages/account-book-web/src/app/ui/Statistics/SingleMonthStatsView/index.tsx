import MonthIndicator from "@/app/ui/Statistics/MonthIndicator";
import { useQuery } from "@tanstack/react-query";
import { getTransactionByMonth } from "@/app/lib/transaction";
import { StatisticsResponseListType } from "@/app/ui/Statistics/SingleMonthStatsView/type";
import { useStatisticsStore } from "@/app/store/statisticsStore";
import PieChart from "@/app/ui/Statistics/SingleMonthStatsView/PieGraph";
import StatisticsRank from "@/app/ui/Statistics/SingleMonthStatsView/StatisticsRank";

const SingleMonthStatsView = ({ accountId }: { accountId: string }) => {
  const { date, type } = useStatisticsStore((state) => state);

  const { data, isFetching } = useQuery<StatisticsResponseListType>({
    queryKey: ["statistics", date, type],
    queryFn: () => getTransactionByMonth(accountId, type, date),
  });

  return (
    <>
      <div className="relative z-10">
        <MonthIndicator />
      </div>
      <div className="relative -m-3">
        <PieChart data={data} />
      </div>
      <div className="relative -mt-10 h-64 pb-16 overflow-scroll">
        <StatisticsRank data={data} isFetching={isFetching} />
      </div>
    </>
  );
};

export default SingleMonthStatsView;
