import MonthIndicator from "@/app/ui/Statistics/MonthIndicator/index";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Statistics/MonthIndicator",
  component: MonthIndicator,
  parameters: {},
  tags: ["autodocs"],
  argTypes: {
    month: { control: "text" },
  },
  args: {
    month: "2024`-01",
  },
} satisfies Meta<typeof MonthIndicator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    month: "2024-01",
  },
};
