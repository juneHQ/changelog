import { create } from "zustand";

interface IPreviousPageUrl {
  prevUrl: string;
  setPrevUrl: (url: string) => void;
}

const usePreviousPageUrl = create<IPreviousPageUrl>((set) => ({
  prevUrl: "",
  setPrevUrl: (url) => set(() => ({ prevUrl: url })),
}));

export default usePreviousPageUrl;
