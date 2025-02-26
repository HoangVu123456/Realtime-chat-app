import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const baseURL = import.meta.env.MODE==="development"?"http://localhost:5001":"api";

export const useAuthstore = create((set, get) => ({
    auth_user: null,
    is_signup: false,
    is_login: false,
    is_update_profile: false,
    check_auth: true,
    onlineuser: [],
    socket: null,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check");

            set({auth_user: res.data});
            get().connectsocket();
        } catch(err) {
            console.log("Error in check Auth:", err);
            set({auth_user: null});
        } finally {
            set({check_auth: false});
        }
    },

    signup: async(data) => {
        set({ is_signup:true, });
        try{
            const res = await axiosInstance.post("/auth/signup", data);
            set({ auth_user:res.data, });
            toast.success("Account created successfully!");
            get().connectsocket();
        } catch(err) {
            toast.error(err.response.data.message);
        }
        finally {
            set({ is_signup: false, });
        }
    },

    logout: async() => {
        try{
            await axiosInstance.post("/auth/logout");
            toast.success("Logout successfully!");
            set({ auth_user:null, });
            get().disconnectsocket();
        } catch(err) {
            toast.error(err.response.data.message);
        }
    },

    login: async (data) => {
        set({ is_login: true });
        try {
            const res = await axiosInstance.post("/auth/login", data);
            set({ auth_user: res.data });
            toast.success("Login successfully!");
            get().connectsocket();
        } catch (err) {
            if (err.response) {
                if (err.response.status === 400) {
                    toast.error("Incorrect password. Please try again.");
                } else {
                    toast.error(err.response.data.message || "An error occurred. Please try again.");
                }
            } else {
                toast.error("Network error. Please check your connection.");
            }
        } finally {
            set({ is_login: false });
        }
    },

    update_profile: async(data) => {
        set({ is_update_profile: true, });
        try{
            const res = await axiosInstance.put("/auth/update-profile", data);
            set({ auth_user:res.data, });
            toast.success("Profile image uploaded successfully!");
        } catch(err) {
            toast.error(err.response.data.message);
        } finally {
            set({ is_update_profile: false, });
        }
    },

    connectsocket: () => {
        const { auth_user } = get();
        
        if(!auth_user || get().socket?.connected) return;
        
        const socket = io(baseURL, {query: { userID: auth_user._id },});
        socket.connect();

        set({ socket: socket });

        socket.on("user-connected", (userIds) => {
            set({ onlineuser: userIds });
          });
        },

    disconnectsocket: () => {
        if (get().socket?.connected) {
            get().socket.disconnect();
        }
    },
}));