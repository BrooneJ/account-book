import { ListData } from "@/app/ui/Calendar/type";

type Props = {
  list: ListData | undefined;
  type: "income" | "expense";
};

export default function FinancialActivityDots({ list, type }: Props) {
  return (
    <div className="flex flex-wrap">
      {list?.map((item, index) => {
        if (item.type === type) {
          return (
            <div
              key={index}
              className={`p-[3px] rounded-2xl ${type === "income" ? "bg-point" : "bg-expenseText2"}`}
            ></div>
          );
        }
      })}
    </div>
  );
}
