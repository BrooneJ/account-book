type TotalAmountsPerDay = {
  [date: string]: number;
};

type Props = {
  dataKey: string;
  totalAmountsPerDay: TotalAmountsPerDay;
};

const AmountsPerDay = ({ dataKey, totalAmountsPerDay }: Props) => {
  return (
    <div className="border-b border-b-gray-1 py-1 flex justify-between">
      <span>
        {Number(dataKey.split("-")[1])}月{Number(dataKey.split("-")[2])}日
      </span>
      <span
        className={`pr-3 text-sm ${
          totalAmountsPerDay[dataKey] >= 0
            ? "text-incomeText"
            : "text-expenseText"
        }`}
      >
        {totalAmountsPerDay[dataKey].toLocaleString()}
      </span>
    </div>
  );
};

export default AmountsPerDay;
