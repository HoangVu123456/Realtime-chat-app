import { create } from "zustand";

export const useTheme = create((set) => ({
    theme: localStorage.getItem("chat-theme") || "coffee",
    settheme: (theme) =>{
        localStorage.setItem("chat-theme", theme);
        set({ theme });
    },
}));