export type Transaction = {
  id: number;
  type: "income" | "expense";
  amount: number;
  date: Date;
  category: {
    name: string;
  };
  financialSource: {
    name: string;
  };
};

export type TransactionDetail = Transaction & { description: string };
