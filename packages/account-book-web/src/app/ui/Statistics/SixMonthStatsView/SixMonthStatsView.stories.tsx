import SixMonthStatsView from "@/app/ui/Statistics/SixMonthStatsView/index";
import { Meta, StoryObj } from "@storybook/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { withNextHeadersMock } from "../../../../../.storybook/withHeadersMock";
import { http, HttpResponse } from "msw";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const meta = {
  title: "Statistics/SixMonthStatsView",
  component: SixMonthStatsView,
  argTypes: {
    accountId: { control: "string" },
  },
  args: {
    accountId: "1",
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

const MockTemplate = () => (
  <QueryClientProvider client={mockedQueryClient}>
    <SixMonthStatsView accountId="1" />
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);

export const MockedSuccess: Story = {
  decorators: [withNextHeadersMock],
  render: () => <MockTemplate />,
  parameters: {
    msw: {
      handlers: [
        http.get("*/api/transaction/:accountId/statistics/half-year", () => {
          return HttpResponse.json({
            result: [
              {
                date: "2023-09",
                test1: 1200,
                test2: 2100,
                test3: 3000,
              },
              {
                date: "2023-10",
                test1: 1600,
                test2: 1900,
                test3: 1800,
              },
              {
                date: "2023-11",
                test1: 1600,
                test2: 2300,
                test3: 2800,
              },
              {
                date: "2023-12",
                test1: 1030,
                test2: 1800,
                test3: 3300,
              },
              {
                date: "2024-01",
                test1: 1200,
                test2: 2300,
                test3: 3200,
              },
              {
                date: "2024-02",
                test1: 1900,
                test2: 1500,
                test3: 3400,
              },
            ],
            list: ["test1", "test2", "test3"],
          });
        }),
      ],
    },
  },
};

export const Empty: Story = {
  decorators: [withNextHeadersMock],
  render: () => <MockTemplate />,
  parameters: {
    msw: {
      handlers: [
        http.get("*/api/transaction/:accountId/statistics/half-year", () => {
          return HttpResponse.json(
            {
              result: [],
              list: [],
            },
            {
              status: 404,
            },
          );
        }),
      ],
    },
  },
};
