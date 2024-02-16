import SingleMonthStatsView from "@/app/ui/Statistics/SingleMonthStatsView/index";
import { Meta, StoryObj } from "@storybook/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { http, HttpResponse } from "msw";

const meta = {
  title: "Statistics/SingleMonthStatsView",
  component: SingleMonthStatsView,
  tags: ["autodocs"],
  argTypes: {
    accountId: { control: "string" },
  },
  args: {
    accountId: "1",
  },
} satisfies Meta<typeof SingleMonthStatsView>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultQueryClient = new QueryClient();

export const Empty: Story = {
  decorators: [
    (Story) => (
      <QueryClientProvider client={defaultQueryClient}>
        {Story()}
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

const mockData = [
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

mockedQueryClient.setQueryData(
  ["statistics", "2024-02-16", "expense"],
  mockData,
);

export const WithData: Story = {
  decorators: [
    (Story) => (
      <QueryClientProvider client={mockedQueryClient}>
        {Story()}
        <ReactQueryDevtools
          initialIsOpen={process.env.NEXT_PUBLIC_MODE === "local"}
        />
      </QueryClientProvider>
    ),
  ],
};

const mockedTest = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const Mocked = () => (
  <QueryClientProvider client={mockedTest}>
    <SingleMonthStatsView accountId="1" />
    <ReactQueryDevtools
      initialIsOpen={process.env.NEXT_PUBLIC_MODE === "local"}
    />
  </QueryClientProvider>
);

export const MockedData: Story = {
  render: () => <Mocked />,
  parameters: {
    msw: {
      handlers: [
        http.get("*/api/transaction/1/statistics", () => {
          return HttpResponse.json(mockData, {
            status: 200,
            headers: {
              "Set-Cookie": "access_token=msw-cookie;HttpOnly;Path=/;Max-Age=0",
            },
          });
        }),
      ],
    },
  },
};
