import Page from "@/app/(afterLogin)/(afterSelect)/[accountId]/statistics/page";
import { Meta, StoryObj } from "@storybook/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { http, HttpResponse } from "msw";

const queryClient = new QueryClient();

const meta = {
  title: "Statistics/MainPage",
  component: Page,
  tags: ["autodocs"],
  argTypes: {
    params: { control: "object" },
  },
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof Page>;

const mockedGraphClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const MockTemplate = () => (
  <QueryClientProvider client={mockedGraphClient}>
    <Page params={{ accountId: "1" }} />
    <ReactQueryDevtools
      initialIsOpen={process.env.NEXT_PUBLIC_MODE === "local"}
    />
  </QueryClientProvider>
);

const pieGraphData = [
  {
    count: 1,
    id: "1",
    label: "教育・教養",
    value: 12341,
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
  {
    count: 4,
    id: "4",
    label: "住居",
    value: 1234,
  },
  {
    count: 5,
    id: "5",
    label: "交通",
    value: 1234,
  },
  {
    count: 6,
    id: "6",
    label: "趣味・娯楽",
    value: 1234,
  },
  {
    count: 7,
    id: "7",
    label: "その他",
    value: 1234,
  },
];

const sixMonthStatsData = {
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

export const MockSuccess: Story = {
  render: () => <MockTemplate />,
  parameters: {
    msw: {
      handlers: [
        http.get("*/api/transaction/:accountId/statistics/half-year", () => {
          return HttpResponse.json(sixMonthStatsData);
        }),
        http.get("*/api/transaction/:accountId/statistics", () => {
          return HttpResponse.json(pieGraphData);
        }),
      ],
    },
  },
};
