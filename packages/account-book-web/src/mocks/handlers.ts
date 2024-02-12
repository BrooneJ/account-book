import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("*/api/transaction/:accountId/statistics/half-year", () => {
    return HttpResponse.json(
      {
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
      },
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Set-Cookie": "token=1234; Path=/; HttpOnly; Secure; SameSite=Strict",
        },
      },
    );
  }),
];
