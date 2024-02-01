import { Dispatch, SetStateAction } from "react";
import Image from "next/image";

type Props = {
  date: string;
  setDate: Dispatch<SetStateAction<string>>;
};

const MonthIndicator = ({ date, setDate }: Props) => {
  const month =
    date.split("-")[1].split("")[0] === "0"
      ? date.split("-")[1].split("")[1]
      : date.split("-")[1];

  return (
    <div className="flex justify-between">
      <Image
        src="/images/arrow.svg"
        alt="arrow"
        width={20}
        height={20}
        onClick={() =>
          setDate(
            new Date(new Date(date).setMonth(new Date(date).getMonth() - 1))
              .toISOString()
              .split("T")[0],
          )
        }
        className="transform rotate-180"
      />
      <span className="text-xl font-semibold">{month}月</span>
      <Image
        src="/images/arrow.svg"
        alt="arrow"
        width={20}
        height={20}
        onClick={() =>
          setDate(
            new Date(new Date(date).setMonth(new Date(date).getMonth() + 1))
              .toISOString()
              .split("T")[0],
          )
        }
      />
    </div>
  );
};

export default MonthIndicator;
