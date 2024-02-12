import SixMonthStatsView from "@/app/ui/Statistics/SixMonthStatsView/index";
import { Meta, StoryObj } from "@storybook/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { http, HttpResponse } from "msw";
import { handlers } from "@/mocks/handlers";

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

const MockTemplate = () => (
  <QueryClientProvider client={mockedQueryClient}>
    <SixMonthStatsView accountId="1" />
    <ReactQueryDevtools
      initialIsOpen={process.env.NEXT_PUBLIC_MODE === "local"}
    />
  </QueryClientProvider>
);

export const MockedSuccess: Story = {
  render: () => <MockTemplate />,
  parameters: {
    msw: {
      handlers: [...handlers],
    },
  },
};
