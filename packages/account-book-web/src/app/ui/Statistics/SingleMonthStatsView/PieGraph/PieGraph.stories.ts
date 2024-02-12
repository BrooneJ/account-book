import PieGraph from "@/app/ui/Statistics/SingleMonthStatsView/PieGraph/index";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Statistics/SingleMonthStatsView/PieGraph",
  component: PieGraph,
  tags: ["autodocs"],
  argTypes: {
    data: { control: "object" },
  },
} satisfies Meta<typeof PieGraph>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
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
  },
};

export const Empty: Story = {
  args: {
    data: [],
  },
};
