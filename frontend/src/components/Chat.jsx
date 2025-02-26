import React, { useEffect, useRef } from 'react';
import { useChatstore } from '../store/useChatstore';
import MessageInput from './MessageInput';
import Chatheader from './Chatheader';
import MessageSkeleton from './Skeleton/MessageSkeleton';
import { useAuthstore } from '../store/useAuthstore';
import { formatMessageTime } from '../constant/utils';

const Chat = () => {

    const { message, getmessage, ismessageloading, selecteduser, subscribemessage, unsubscribemessage } = useChatstore();
    const {auth_user} = useAuthstore();
    const messageEndRef = useRef(null);

    useEffect(() => {getmessage(selecteduser._id);
        subscribemessage(); return () => unsubscribemessage();},
        [selecteduser._id, getmessage, subscribemessage, unsubscribemessage]);

    useEffect(() => {
        if (messageEndRef.current && message) {
            messageEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [message]);

    if (ismessageloading) {return (
        <div className="flex-1 flex flex-col overflow-auto">
            <Chatheader/>

            <MessageSkeleton/>

            <MessageInput/>
        </div>
    );
}
    
return (
    <div className="flex-1 flex flex-col overflow-auto">
      <Chatheader />
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {message.map((msg) => (
           <div key={msg._id} className={`chat ${msg.senderID === auth_user._id ? "chat-end" : "chat-start"}`} ref={messageEndRef}>
            <div className="chat-image avatar">
                <div className="size-10 rounded-full border">
                    <img 
                    src={
                        msg.senderID === auth_user._id
                          ? auth_user.profilepic || "/avatar.png"
                          : selecteduser.profilepic || "/avatar.png"
                      }
                      alt="profile pic"/>
                </div>
            </div>
            <div className="chat-header mb-1">
                <time className="text-xs opacity-50 ml-1">
                    {formatMessageTime(msg.createdAt)}
                </time>
            </div>
            <div className="chat-bubble flex flex-col">
              {msg.image && (
                <img
                  src={msg.image}
                  alt="Attachment"
                  className="sm:max-w-[200px] rounded-md mb-2"
                />
              )}
              {msg.text && <p>{msg.text}</p>}
            </div>
           </div>
        ))}
      </div>

      <MessageInput />
    </div>
);
};

export default Chat;