import { create } from "zustand";

const useNotificationStore = create((set) => ({
  message: null,
  type: "success",

  setNotification: (message, type = "success") => set({ message, type }),
  clearNotification: () => set({ message: null, type: "success" }),
}));

export default useNotificationStore;
