import { create } from "zustand";

type State = {
  date: string;
  type: "income" | "expense";
};

type Action = {
  setDate: (date: string) => void;
  setType: (type: "income" | "expense") => void;
};

export const useStatisticsStore = create<State & Action>((set) => ({
  date: new Date().toISOString().split("T")[0],
  type: "expense",
  setDate: (date) => set({ date }),
  setType: (type) => set({ type }),
}));
