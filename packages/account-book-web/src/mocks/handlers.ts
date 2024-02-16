import { http, HttpResponse } from "msw";

export const handlers = [
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
];
