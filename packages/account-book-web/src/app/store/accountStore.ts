import { create } from "zustand";

type AccountState = {
  id: string;
  setAccount: (id: string) => void;
};

export const accountStore = create<AccountState>()((set) => ({
  id: "",
  setAccount: (id) => set({ id }),
}));
