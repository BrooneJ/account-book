import SixMonthStatsView from "@/app/ui/Statistics/SixMonthStatsView/index";
import { Meta, StoryObj } from "@storybook/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { handlers } from "@/mocks/handlers";
import { MSWComponent } from "@/mocks/_component/MSWComponent";
import { withNextHeadersMock } from "../../../../../.storybook/withHeadersMock";

const meta = {
  title: "Statistics/SixMonthStatsView",
  component: SixMonthStatsView,
  tags: ["autodocs"],
  argTypes: {
    accountId: { control: "string" },
  },
  args: {
    accountId: "1",
  },
} satisfies Meta<typeof SixMonthStatsView>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultQueryClient = new QueryClient();

export const Empty: Story = {
  decorators: [
    (Story) => (
      <QueryClientProvider client={defaultQueryClient}>
        {Story()}
        <ReactQueryDevtools
          initialIsOpen={process.env.NEXT_PUBLIC_MODE === "local"}
        />
      </QueryClientProvider>
    ),
  ],
};

const mockedQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const MockTemplate = () => (
  <QueryClientProvider client={mockedQueryClient}>
    <SixMonthStatsView accountId="1" />
    <MSWComponent />
    <ReactQueryDevtools
      initialIsOpen={process.env.NEXT_PUBLIC_MODE === "local"}
    />
  </QueryClientProvider>
);

export const MockedSuccess: Story = {
  decorators: [withNextHeadersMock],
  render: () => <MockTemplate />,
  parameters: {
    msw: {
      handlers: [...handlers],
    },
    nextHeaders: {
      "my-header": "foo",
    },
  },
};
