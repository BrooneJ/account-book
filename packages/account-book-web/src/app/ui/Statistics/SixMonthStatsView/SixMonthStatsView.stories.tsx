import SixMonthStatsView from "@/app/ui/Statistics/SixMonthStatsView/index";
import { Meta, StoryObj } from "@storybook/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const meta = {
  title: "Statistics/SixMonthStatsView",
  component: SixMonthStatsView,
  tags: ["autodocs"],
  argTypes: {
    params: { control: "object" },
  },
  args: {
    params: { accountId: "1" },
  },
} satisfies Meta<typeof SixMonthStatsView>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockedQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const mockData = {
  result: [
    {
      date: "2023-09",
      "教育・教養": 1200,
      食費: 2100,
      ファッション: 3000,
    },
    {
      date: "2023-10",
      "教育・教養": 1600,
      食費: 1900,
      ファッション: 1800,
    },
    {
      date: "2023-11",
      "教育・教養": 1600,
      食費: 2300,
      ファッション: 2800,
    },
    {
      date: "2023-12",
      "教育・教養": 1030,
      食費: 1800,
      ファッション: 3300,
    },
    {
      date: "2024-01",
      "教育・教養": 1200,
      食費: 2300,
      ファッション: 3200,
    },
    {
      date: "2024-02",
      "教育・教養": 1900,
      食費: 1500,
      ファッション: 3400,
    },
  ],
  list: ["教育・教養", "食費", "ファッション"],
};

mockedQueryClient.setQueryData(
  // we need to change the query key to today
  ["statistics", "barGraph", "", "2024-02-12"],
  mockData,
);

const MockTemplate = () => (
  <QueryClientProvider client={mockedQueryClient}>
    <SixMonthStatsView />
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);

export const MockedSuccess: Story = {
  render: MockTemplate,
};
