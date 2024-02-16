import { StatisticsResponseListType } from "@/app/ui/Statistics/SingleMonthStatsView/type";
import StatisticsRankSkeleton from "@/app/ui/Statistics/SingleMonthStatsView/StatisticsRank/StatisticsRankSkeleton";
import StatisticsRankItem from "@/app/ui/Statistics/SingleMonthStatsView/StatisticsRank/StatisticsRankItem";

type Props = {
  data: StatisticsResponseListType | undefined;
  isFetching: boolean;
};

const color = [
  "#b3e2cd",
  "#fdcdac",
  "#cbd5e8",
  "#f4cae4",
  "#e6f5c9",
  "#fff2ae",
  "#f1e2cc",
  "#cccccc",
];

const StatisticsRank = ({ data, isFetching }: Props) => {
  if (isFetching) {
    return <StatisticsRankSkeleton />;
  }

  if (!data || data.length === 0) {
    return (
      <div className="flex justify-center items-center bg-gray-0 h-full rounded-xl">
        データがありません。
      </div>
    );
  }

  return (
    <>
      {data?.map((item, index) => (
        <StatisticsRankItem color={color[index]} item={item} key={item.id} />
      ))}
    </>
  );
};

export default StatisticsRank;
