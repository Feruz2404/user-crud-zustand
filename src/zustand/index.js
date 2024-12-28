import { create } from "zustand";


export const useStore = create((set) => ({
    counter: 0,
    increment: () => set(state => ({ counter: state.counter + 1 })),
    decrement: () => set(state => ({ counter: state.counter - 1 })),
    reset: () => set(state => ({ counter: 0 }))
  }));