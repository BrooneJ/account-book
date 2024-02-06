import { ResponsiveBar } from "@nivo/bar";
import { useQuery } from "@tanstack/react-query";
import { getTopTransactionByHalfYear } from "@/app/lib/transaction";
import { useStatisticsStore } from "@/app/store/statisticsStore";
import { usePathname } from "next/navigation";
import MonthIndicator from "@/app/ui/Statistics/MonthIndicator";
import { useEffect, useState } from "react";

const MyResponsiveBar = ({ data, keys /* see data tab */ }: any) => (
  <ResponsiveBar
    data={data}
    keys={keys}
    indexBy="date"
    margin={{ top: 20, right: 0, bottom: 70, left: 50 }}
    padding={0.2}
    layout="vertical"
    valueScale={{ type: "linear" }}
    indexScale={{ type: "band", round: true }}
    colors={{ scheme: "set3" }}
    labelSkipWidth={12}
    labelSkipHeight={12}
    legends={[
      {
        dataFrom: "keys",
        anchor: "bottom",
        direction: "row",
        justify: false,
        translateY: 50,
        itemsSpacing: 0,
        itemWidth: 40,
        itemHeight: 20,
        itemDirection: "top-to-bottom",
        itemOpacity: 0.85,
        symbolSize: 20,
        effects: [
          {
            on: "hover",
            style: {
              itemOpacity: 1,
            },
          },
        ],
      },
    ]}
    role="application"
    ariaLabel="Nivo bar chart demo"
    barAriaLabel={(e) =>
      e.id + ": " + e.formattedValue + " in date: " + e.indexValue
    }
  />
);

export default function SixMonthStatsView() {
  const { date, type } = useStatisticsStore((state) => state);
  const accountId = usePathname().split("/")[1];

  const { data } = useQuery({
    queryKey: ["statistics", "barGraph", accountId, date],
    queryFn: () => getTopTransactionByHalfYear(accountId, type, date),
  });

  const [prevData, setPrevData] = useState(data);

  useEffect(() => {
    if (!data) return;
    setPrevData(data);
  }, [data]);

  if (!prevData) return <div>Loading...</div>;

  return (
    <>
      <MonthIndicator />
      <div style={{ height: "450px" }}>
        <MyResponsiveBar data={prevData.result} keys={prevData.list} />
      </div>
    </>
  );
}
