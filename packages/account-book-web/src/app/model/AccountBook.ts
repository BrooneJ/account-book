export type AccountBook = {
  id: string;
  name: string;
  balance: number;
  userAccounts: {
    user: {
      username: string;
    };
  }[];
  transactions: {
    amount: number;
    description: string | null;
    createdAt: Date;
    type: string;
    user: {
      username: string;
    };
    category: {
      name: string;
    } | null;
  }[];
};
