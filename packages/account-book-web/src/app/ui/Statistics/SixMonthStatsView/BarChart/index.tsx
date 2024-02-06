import { ResponsiveBar } from "@nivo/bar";
import { ResultType } from "@/app/ui/Statistics/SixMonthStatsView/type";

type Props = {
  data: ResultType[];
  keys: string[];
};
const MyResponsiveBar = ({ data, keys }: Props) => (
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

export default MyResponsiveBar;
