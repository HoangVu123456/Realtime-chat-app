import React from 'react'
import { X } from "lucide-react";
import { useAuthstore } from "../store/useAuthstore";
import { useChatstore } from "../store/useChatstore";

const ChatHeader = () => {
  const { selecteduser, setselecteduser } = useChatstore();
  const { onlineuser } = useAuthstore();

  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              <img src={selecteduser.profilepic || "/avatar.png"} alt={selecteduser.fullname} />
            </div>
          </div>

          {/* User info */}
          <div>
            <h3 className="font-medium">{selecteduser.fullname}</h3>
            <p className="text-sm text-base-content/70">
              {onlineuser.includes(selecteduser._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        {/* Close button */}
        <button onClick={() => setselecteduser(null)}>
          <X />
        </button>
      </div>
    </div>
  );
};
export default ChatHeader;