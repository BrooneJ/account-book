import StatisticsPeriodSelector from "@/app/ui/Statistics/StatisticsPeriodSelector/index";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Statistics/StatisticsPeriodSelector",
  component: StatisticsPeriodSelector,
  parameters: {},
  tags: ["autodocs"],
  argTypes: {
    isSixMonth: { control: "boolean" },
    setIsSixMonth: { action: "setIsSixMonth" },
  },
  args: {
    isSixMonth: false,
    setIsSixMonth: () => {
      console.log("setIsSixMonth");
    },
  },
} satisfies Meta<typeof StatisticsPeriodSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isSixMonth: false,
    setIsSixMonth: () => {
      console.log("setIsSixMonth");
    },
  },
};
