import { StatisticsResponseType } from "@/app/ui/Statistics/type";
import StatisticsRankSkeleton from "@/app/ui/Statistics/StatisticsRank/StatisticsRankSkeleton";
import { useRouter } from "next/navigation";
import { useModalVisibleStore } from "@/app/store/modalVisibleStore";
import { useStatisticsStore } from "@/app/store/statisticsStore";

type Props = {
  data: StatisticsResponseType | undefined;
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
  const router = useRouter();
  const open = useModalVisibleStore((store) => store.open);
  const type = useStatisticsStore((state) => state.type);

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
        <div
          key={index}
          className="flex justify-between items-center bg-gray-0 px-3 py-2 mb-[10px] rounded-xl"
        >
          <div className="flex items-center">
            <div
              style={{ backgroundColor: color[index] }}
              className="h-7 w-7 rounded-2xl mr-4 shadow-md border border-gray-0"
            ></div>
            <div className="flex flex-col">
              <span className="text-[16px]">{item.label}</span>
              <span className="text-xs">{item.count}件の履歴があります。</span>
            </div>
          </div>
          <div className="flex items-center">
            <span className="text-xs mr-2">
              {type === "expense" ? "-" : ""}￥{item.value.toLocaleString()}
            </span>
            <button
              onClick={() => {
                open();
                router.push(`statistics/${item.id}/detail`, { scroll: false });
              }}
              className="text-sm text-gray-3 border border-gray-2 rounded-md py-[2px] px-2 shadow-md"
            >
              詳細
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default StatisticsRank;
