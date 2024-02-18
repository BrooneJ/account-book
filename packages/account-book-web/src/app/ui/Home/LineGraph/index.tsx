"use client";

import { ResponsiveLine } from "@nivo/line";

const data = [
  {
    id: "expense",
    data: [
      { x: "1", y: 200000 },
      { x: "2", y: 180000 },
      { x: "3", y: 190000 },
      { x: "4", y: 210000 },
      { x: "5", y: 200000 },
      { x: "6", y: 220000 },
      { x: "7", y: 250000 },
      { x: "8", y: 210000 },
      { x: "9", y: 230000 },
      { x: "10", y: 220000 },
      { x: "11", y: 240000 },
      { x: "12", y: 260000 },
    ],
  },
  {
    id: "income",
    data: [
      { x: "1", y: 230000 },
      { x: "2", y: 230000 },
      { x: "3", y: 230000 },
      { x: "4", y: 230000 },
      { x: "5", y: 230000 },
      { x: "6", y: 230000 },
      { x: "7", y: 230000 },
      { x: "8", y: 230000 },
      { x: "9", y: 230000 },
      { x: "10", y: 230000 },
      { x: "11", y: 230000 },
      { x: "12", y: 280000 },
    ],
  },
];
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

function LineGraphWrapper() {
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
