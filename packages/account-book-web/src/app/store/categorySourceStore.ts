import { create } from "zustand";

type State = {
  type: "income" | "expense";
  category: { type: "income" | "expense"; name: string };
  source: { type: "income" | "expense"; name: string };
};

type Action = {
  setTransactionType: (type: "income" | "expense") => void;
  setCategory: (category: { type: "income" | "expense"; name: string }) => void;
  setSource: (source: { type: "income" | "expense"; name: string }) => void;
};

export const categorySourceStore = create<State & Action>((set) => ({
  type: "expense",
  setTransactionType: (type) => set({ type }),
  category: { type: "income", name: "未登録" },
  setCategory: (category) => set({ category }),
  source: { type: "income", name: "未登録" },
  setSource: (source) => set({ source }),
}));
