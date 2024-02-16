import StatisticsRank from "@/app/ui/Statistics/SingleMonthStatsView/StatisticsRank/index";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Statistics/SingleMonthStatsView/StatisticsRank",
  component: StatisticsRank,
  tags: ["autodocs"],
  argTypes: {
    data: { control: "object" },
    isFetching: { control: "boolean" },
  },
} satisfies Meta<typeof StatisticsRank>;

export default meta;
type Story = StoryObj<typeof meta>;

export const List: Story = {
  args: {
    data: [
      {
        count: 1,
        id: "1",
        label: "教育・教養",
        value: 1234,
      },
      {
        count: 2,
        id: "2",
        label: "食費",
        value: 1234,
      },
      {
        count: 3,
        id: "3",
        label: "ファッション",
        value: 1234,
      },
    ],
    isFetching: false,
  },
};

export const Empty: Story = {
  args: {
    data: [],
    isFetching: false,
  },
};

export const Loading: Story = {
  args: {
    data: [],
    isFetching: true,
  },
};
