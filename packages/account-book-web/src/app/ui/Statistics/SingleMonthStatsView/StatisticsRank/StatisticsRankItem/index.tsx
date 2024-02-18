import { StatisticsResponseSingleType } from "@/app/ui/Statistics/SingleMonthStatsView/type";
import { useRouter } from "next/navigation";
import { useStatisticsStore } from "@/app/store/statisticsStore";
import { useModalVisibleStore } from "@/app/store/modalVisibleStore";
import { truncateString } from "@/app/lib/truncate";

type Props = {
  color: string;
  item: StatisticsResponseSingleType;
};

export default function StatisticsRankItem({ item, color }: Props) {
  const router = useRouter();
  const open = useModalVisibleStore((store) => store.open);
  const type = useStatisticsStore((state) => state.type);

  return (
    <div className="flex justify-between items-center bg-gray-0 px-3 py-2 mb-[10px] rounded-xl">
      <div className="flex items-center">
        <div
          style={{ backgroundColor: color }}
          className="h-7 w-7 rounded-2xl mr-3 shadow-md border border-gray-0"
        ></div>
        <div className="flex flex-col">
          <span className="text-[16px] truncate">{item.label}</span>
          <span className="text-xs">{item.count}件があります。</span>
        </div>
      </div>
      <div className="flex items-center">
        <span className="grow flex justify-end text-xs mr-2">
          {type === "expense" ? "-" : ""}￥
          {truncateString(item.value.toLocaleString())}
        </span>
        <button
          onClick={() => {
            open();
            router.push(`statistics/${item.id}/detail`, { scroll: false });
          }}
          className="text-sm text-gray-3 border border-gray-2 rounded-md py-[2px] px-2 shadow-md min-w-[43px] max-h-[26px]"
        >
          詳細
        </button>
      </div>
    </div>
  );
}
