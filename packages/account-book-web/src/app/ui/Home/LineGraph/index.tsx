"use client";

import { ResponsiveLine } from "@nivo/line";
import { useQuery } from "@tanstack/react-query";
import { getTopTransactionByYear } from "@/app/lib/transaction";

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
          style={{
            background: "white",
            padding: "9px 12px",
            border: "1px solid #ccc",
          }}
        >
          <div>{point.serieId}</div>
          <div></div>
        </div>
      );
    }}
  />
);

function LineGraphWrapper({ id }: { id: string }) {
  const date = new Date().toISOString().split("T")[0];
  const { data, isFetching } = useQuery({
    queryKey: [id, "home", "year"],
    queryFn: () => getTopTransactionByYear(id, date),
  });

  return (
    <div className="mt-4">
      <span className="text-xl font-semibold">収入・支出</span>
      <div className="h-60">
        {isFetching ? <div>loading...</div> : <MyResponsiveLine data={data} />}
      </div>
    </div>
  );
}

export default LineGraphWrapper;
