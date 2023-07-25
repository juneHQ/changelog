import { create } from "zustand";

interface IAnimatePage {
  animatePage: boolean;
  setAnimatePage: (animate: boolean) => void;
}

const useAnimatePageStore = create<IAnimatePage>((set) => ({
  animatePage: true,
  setAnimatePage: (animate) => set(() => ({ animatePage: animate })),
}));

export default useAnimatePageStore;
