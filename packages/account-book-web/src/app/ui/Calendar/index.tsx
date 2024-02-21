"use client";
import moment from "moment-timezone";
import { DATE } from "@/app/ui/Calendar/const";
import { useState } from "react";
import Arrow from "@/app/ui/svg/arrow";

export default function Calendar() {
  const [current, setCurrent] = useState(moment().startOf("month").utc(true));

  const dummyData = [
    {
      date: "2024-02-01",
      list: [
        { type: "income", transaction: ["kaisya"] },
        { type: "expense", transaction: ["SEIYU", "UR"] },
      ],
    },
    {
      date: "2024-02-02",
      list: [
        { type: "income", transaction: ["kaisya"] },
        { type: "expense", transaction: ["SEIYU", "UR"] },
      ],
    },
    {
      date: "2024-02-03",
      list: [
        { type: "income", transaction: ["kaisya"] },
        { type: "expense", transaction: ["SEIYU", "UR"] },
      ],
    },
    {
      date: "2024-02-04",
      list: [
        { type: "income", transaction: ["kaisya"] },
        { type: "expense", transaction: ["SEIYU", "UR"] },
      ],
    },
    {
      date: "2024-02-05",
      list: [
        { type: "income", transaction: ["kaisya"] },
        { type: "expense", transaction: [] },
      ],
    },
    {
      date: "2024-02-06",
      list: [
        { type: "income", transaction: ["kaisya"] },
        { type: "expense", transaction: ["SEIYU", "UR"] },
      ],
    },
    {
      date: "2024-02-07",
      list: [
        { type: "income", transaction: ["kaisya"] },
        { type: "expense", transaction: ["SEIYU", "UR"] },
      ],
    },
    {
      date: "2024-02-17",
      list: [
        { type: "income", transaction: ["kaisya"] },
        { type: "expense", transaction: ["SEIYU", "UR"] },
      ],
    },
  ];

  const days = current.daysInMonth();
  const firstDayOfMonth = current.clone().startOf("month").day();
  const daysArray = Array.from({ length: days }, (_, i) => {
    return {
      date: i + 1,
      list: dummyData
        .filter((item) => {
          return (
            item.date ===
            current.format("YYYY-MM") +
              "-" +
              `${i + 1 < 10 ? "0" + (i + 1) : i + 1}`
          );
        })
        .map((item) => {
          return item.list;
        }),
    };
  });

  const paddingDaysAfter = 7 - current.clone().endOf("month").day() - 1;

  const daysArrayWithPadding = [
    ...Array.from({ length: firstDayOfMonth }, () => null),
    ...daysArray,
    ...Array.from({ length: paddingDaysAfter }, () => null),
  ];

  return (
    <div>
      <div className="flex justify-between">
        <button
          onClick={() => {
            setCurrent(current.clone().subtract(1, "month"));
          }}
        >
          <Arrow className="transform rotate-180" />
        </button>
        <h1 className="font-bold text-lg">{current.format("YYYY年MM月")}</h1>
        <button
          onClick={() => {
            setCurrent(current.clone().add(1, "month"));
          }}
        >
          <Arrow />
        </button>
      </div>
      <div className="w-full grid grid-cols-7 grid-rows-[50px] auto-rows-[minmax(50px,auto)] border-gray-300">
        {DATE.DAYS.map((day, index) => {
          return (
            <div
              key={index}
              className={`text-md uppercase text-center border-solid leading-[50px] font-medium`}
            >
              {day}
            </div>
          );
        })}
        {daysArrayWithPadding.map((day, index) => {
          return (
            <div
              key={index}
              className={`text-center p-1 text-sm border-b border-r border-gray-300 flex flex-col items-center rounded-xl ${index < 7 ? "border-t" : ""} ${index % 7 === 0 ? "border-l" : ""} ${day === null ? "bg-gray-200" : ""}`}
            >
              <span>{day?.date}</span>
              <div className="h-full flex items-center flex-wrap">
                {day?.list[0]?.map((item, index) => {
                  if (item.type === "income") {
                    return item.transaction.map((transaction, index) => {
                      return (
                        <div
                          key={index}
                          className="p-[3px] bg-point rounded-2xl"
                        ></div>
                      );
                    });
                  }
                })}
              </div>
              <div className="h-full flex items-center flex-wrap">
                {day?.list[0]?.map((item, index) => {
                  if (item.type === "expense") {
                    return item.transaction.map((transaction, index) => {
                      return (
                        <div
                          key={index}
                          className="p-[3px] bg-expenseText2 rounded-2xl"
                        ></div>
                      );
                    });
                  }
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
