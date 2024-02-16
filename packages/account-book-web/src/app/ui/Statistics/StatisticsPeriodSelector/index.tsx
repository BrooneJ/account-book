import { Dispatch, SetStateAction } from "react";
import { motion } from "framer-motion";

type Props = {
  isSixMonth: boolean;
  setIsSixMonth: Dispatch<SetStateAction<boolean>>;
};
const StatisticsPeriodSelector = ({ isSixMonth, setIsSixMonth }: Props) => {
  return (
    <div className="flex bg-gray-0 h-[42px] w-full p-1 rounded-lg">
      <div
        onClick={() => setIsSixMonth(false)}
        className={`grow flex justify-center relative`}
      >
        <span className="z-10 flex justify-center items-center">当月</span>
        {isSixMonth ? null : (
          <motion.div
            layoutId="circle"
            className={`absolute ${
              isSixMonth
                ? ""
                : "w-full h-[32px] bg-white font-semibold shadow-lg p-1 rounded-lg"
            }`}
          ></motion.div>
        )}
      </div>
      <div
        onClick={() => setIsSixMonth(true)}
        className={`grow flex justify-center relative`}
      >
        <span className="z-10 flex justify-center items-center">６ヶ月</span>
        {isSixMonth ? (
          <motion.div
            layoutId="circle"
            className={`absolute ${
              isSixMonth
                ? "w-full h-[32px] bg-white font-semibold shadow-lg p-1 rounded-lg"
                : ""
            }`}
          ></motion.div>
        ) : null}
      </div>
    </div>
  );
};

export default StatisticsPeriodSelector;
