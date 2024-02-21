"use client";
import moment from "moment-timezone";
import { DATE } from "@/app/ui/Calendar/const";
import { useState } from "react";
import Arrow from "@/app/ui/svg/arrow";

export default function Calendar() {
  const [current, setCurrent] = useState(moment().startOf("month").utc(true));

  const days = current.daysInMonth();
  const firstDayOfMonth = current.clone().startOf("month").day();
  const daysArray = Array.from({ length: days }, (_, i) => i + 1);
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
              <span>{day}</span>
              <div className="h-full flex items-center flex-wrap">
                <div className="p-[3px] bg-primary rounded-2xl"></div>
              </div>
              <div className="h-full flex items-center flex-wrap">
                <div className="p-[3px] bg-expenseText2 rounded-2xl"></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
