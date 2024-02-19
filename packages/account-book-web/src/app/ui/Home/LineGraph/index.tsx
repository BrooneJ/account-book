"use client";

import { ResponsiveLine } from "@nivo/line";
import { useQuery } from "@tanstack/react-query";
import { getTopTransactionByYear } from "@/app/lib/transaction";
import { GraphDataArray } from "@/app/ui/Home/LineGraph/type";

const MyResponsiveLine = ({ data /* see data tab */ }: { data: any }) => (
  <ResponsiveLine
    data={data}
    colors={["#FCA5A5", "#2EAC57"]}
    margin={{ top: 20, right: 5, bottom: 30, left: 50 }}
    curve="catmullRom"
    xScale={{ type: "point" }}
    yScale={{
      type: "linear",
      min: "auto",
      max: "auto",
      stacked: false,
      reverse: false,
    }}
    useMesh={true}
    yFormat=" >-.2f"
    axisTop={null}
    axisRight={null}
    pointSize={4}
    pointColor={{ theme: "background" }}
    pointBorderWidth={4}
    pointBorderColor={{ from: "serieColor" }}
    pointLabelYOffset={-12}
    tooltip={({ point }) => {
      return (
        <div
          className={`flex flex-col bg-gray-3 p-4 rounded ${point.serieId === "income" ? "text-primary" : "text-expenseText2"}`}
        >
          <span className="text-xs">
            {point.serieId === "income" ? "収入" : "支出"}
          </span>
          <span className="text-xs">￥{point.data.y.toString()}</span>
        </div>
      );
    }}
  />
);

function LineGraphWrapper({ id }: { id: string }) {
  const date = new Date().toISOString().split("T")[0];
  const { data } = useQuery<GraphDataArray>({
    queryKey: [id, "home", "year"],
    queryFn: () => getTopTransactionByYear(id, date),
  });

  return (
    <div className="mt-4">
      <span className="text-xl font-semibold">収入・支出</span>
      <div className="h-60">
        <MyResponsiveLine data={data} />
      </div>
    </div>
  );
}

export default LineGraphWrapper;
