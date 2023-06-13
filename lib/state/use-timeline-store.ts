import { create } from "zustand";

interface ITimelineState {
  view: "weeks" | "months" | "years";
  setView: (targetTime: "weeks" | "months" | "years") => void;
}

const useTimelineStore = create<ITimelineState>((set) => ({
  view: "weeks",
  setView: (targetTime) => set(() => ({ view: targetTime })),
}));

export default useTimelineStore;
