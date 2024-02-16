import StatisticsRankItem from "@/app/ui/Statistics/SingleMonthStatsView/StatisticsRank/StatisticsRankItem/index";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Statistics/SingleMonthStatsView/StatisticsRankItem",
  component: StatisticsRankItem,
  tags: ["autodocs"],
  argTypes: {
    color: { control: "color" },
    item: { control: "object" },
  },
  args: {
    color: "red",
    item: {
      count: 1,
      id: "1",
      label: "Book",
      value: 1234,
    },
  },
} satisfies Meta<typeof StatisticsRankItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    color: "red",
    item: {
      count: 1,
      id: "1",
      label: "Book",
      value: 1234,
    },
  },
};
