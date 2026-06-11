import { createContext, useContext, useEffect } from "react";
import { create } from 'zustand';
import axios from 'axios';

// 1. Global Auth Store (Single Source of Truth)
export const useAuthStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  checkAuth: async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/user/me`, { withCredentials: true });
      set({ user: data.user });
    } catch {
      set({ user: null });
    }
  },
  logout: async () => {
    await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/user/logout`, {}, { withCredentials: true });
    set({ user: null });
  }
}));

// 2. Real-time SSE Hook
const useTrackData = (model, onMessage) => {
    useEffect(() => {
        if (!model) return;
        const eventSource = new EventSource(
            `${import.meta.env.VITE_API_URL}/api/v1/stream?model=${model}`,
            { withCredentials: true }
        );
        eventSource.onmessage = (event) => onMessage(JSON.parse(event.data));
        eventSource.onerror = () => eventSource.close();
        return () => eventSource.close();
    }, [model, onMessage]);
};

export default useTrackData;