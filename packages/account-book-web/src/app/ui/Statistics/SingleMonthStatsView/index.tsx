import { useState } from "react";
import MonthIndicator from "@/app/ui/Statistics/MonthIndicator";
import PieChart from "@/app/ui/Statistics/PieGraph";
import { useQuery } from "@tanstack/react-query";
import { getTransactionByMonth } from "@/app/lib/transaction";
import { StatisticsResponseType } from "@/app/ui/Statistics/type";
import StatisticsRank from "@/app/ui/Statistics/StatisticsRank";

const SingleMonthStatsView = ({ accountId }: { accountId: string }) => {
  const [isIncome, setIsIncome] = useState<"income" | "expense">("expense");
  const [date, setDate] = useState<string>(
    new Date().toISOString().split("T")[0],
  );

  const { data, isFetching } = useQuery<StatisticsResponseType>({
    queryKey: ["statistics", date, isIncome],
    queryFn: () => getTransactionByMonth(accountId, isIncome, date),
  });

  return (
    <>
      <div className="relative z-10">
        <MonthIndicator setDate={setDate} date={date} />
      </div>
      <div className="relative -m-3 h-80">
        <PieChart data={data} />
      </div>
      <div className="relative -mt-10 h-64 pb-16 overflow-scroll z-10">
        <StatisticsRank
          data={data}
          isIncome={isIncome}
          isFetching={isFetching}
        />
      </div>
    </>
  );
};

export default SingleMonthStatsView;
