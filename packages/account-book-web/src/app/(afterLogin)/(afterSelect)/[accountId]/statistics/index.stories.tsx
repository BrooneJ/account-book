import Page from "@/app/(afterLogin)/(afterSelect)/[accountId]/statistics/page";
import { Meta, StoryObj } from "@storybook/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

const meta = {
  title: "Statistics/MainPage",
  component: Page,
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        {Story()}
        <ReactQueryDevtools
          initialIsOpen={process.env.NEXT_PUBLIC_MODE === "local"}
        />
      </QueryClientProvider>
    ),
  ],
  tags: ["autodocs"],
  argTypes: {
    params: { control: "object" },
  },
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof Page>;

export const Empty: Story = {
  args: {
    params: { accountId: "1" },
  },
};
