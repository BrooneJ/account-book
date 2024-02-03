import set, { create } from "zustand";

type ModalState = {
  visible: boolean;
};

type ModalAction = {
  open: () => void;
  close: () => void;
};
export const useModalVisibleStore = create<ModalAction & ModalState>((set) => ({
  visible: false,
  open: () => set((state) => ({ ...state, visible: true })),
  close: () => set((state) => ({ ...state, visible: false })),
}));
