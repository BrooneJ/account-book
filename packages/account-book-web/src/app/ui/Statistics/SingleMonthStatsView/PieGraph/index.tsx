import { ResponsivePie } from "@nivo/pie";
import { StatisticsResponseListType } from "@/app/ui/Statistics/SingleMonthStatsView/type";

type Props = {
  data: StatisticsResponseListType | undefined;
};

const PieChart = ({ data }: Props) => {
  if (!data || data.length === 0) {
    const dataDummy = [
      {
        id: "未登録",
        label: "未登録",
        value: 1,
      },
    ];
    return (
      <ResponsivePie
        data={dataDummy}
        theme={{
          text: {
            fontSize: "14px",
          },
        }}
        colors={{ scheme: "pastel2" }}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.4}
        padAngle={0.7}
        cornerRadius={5}
        activeOuterRadiusOffset={8}
        arcLinkLabel={(e) => `${e.label}`}
        enableArcLabels={false}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsDiagonalLength={5}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
          from: "color",
          modifiers: [["darker", 2]],
        }}
      />
    );
  }

  return (
    <ResponsivePie
      data={data}
      theme={{
        text: {
          fontSize: "12px",
        },
      }}
      colors={{ scheme: "pastel2" }}
      margin={{ top: 30, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.4}
      padAngle={0.7}
      cornerRadius={5}
      activeOuterRadiusOffset={8}
      arcLinkLabel={(e) => `${e.label}`}
      enableArcLabels={false}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsDiagonalLength={5}
      arcLinkLabelsTextColor="#333333"
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color" }}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["darker", 2]],
      }}
      tooltip={({ datum }) => {
        return (
          <div className="flex justify-between bg-gray-3 text-primary p-4 rounded w-32">
            <span className="text-xs">{datum.label}</span>
            <span className="text-xs">￥{datum.value.toLocaleString()}</span>
          </div>
        );
      }}
    />
  );
};

export default PieChart;
