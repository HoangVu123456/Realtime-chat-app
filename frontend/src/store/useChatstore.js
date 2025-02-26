import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthstore } from "./useAuthstore";

export const useChatstore = create((set, get) => ({
    message: [],
    users: [],
    selecteduser: null,
    isuserloading: false,
    ismessageloading: false,

    getuser: async () => {
        set({ isuserloading:true, });
        try{
            const res = await axiosInstance.get("/messages/users");
            set({ users:res.data, });

        } catch(err) {
            toast.error(err.response.data.message);
        } finally {
            set({ isuserloading:false, });
        }
    },

    getmessage: async (userID) => {
        set({ ismessageloading:true, });
        try{
            const res = await axiosInstance.get(`/messages/${userID}`);
            set({ message:res.data, });

        } catch(err) {
            toast.error(err.response.data.message);
        } finally {
            set({ ismessageloading:false, });
        }
    },

    sendmessage: async (messageData) => {
        const { selecteduser, message } = get();
        try {
          const res = await axiosInstance.post(`/messages/send/${selecteduser._id}`, messageData);
          set({ message: [...message, res.data] });
        } catch (error) {
          toast.error(error.response.data.message);
        }
      },

    subscribemessage: () => {
        const { selecteduser } = get();
        if (!selecteduser) return;

        const socket = useAuthstore.getState().socket;
        socket.on("new_message", (new_message) => {
            if (new_message.senderID!==selecteduser._id) return;
            set({ message: [...get().message, new_message] });
    });
    },

    unsubscribemessage: () => {
        const socket = useAuthstore.getState().socket;
        socket.off("new_message");
    },

    setselecteduser: (selecteduser) => set({selecteduser}),
}));