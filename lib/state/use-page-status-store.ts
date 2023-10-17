import { create } from "zustand";

interface IPageStatusStoreProps {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const usePageStatusStore = create<IPageStatusStoreProps>((set) => ({
  isLoading: false,
  setIsLoading: (loading) => set(() => ({ isLoading: loading })),
}));

export default usePageStatusStore;
