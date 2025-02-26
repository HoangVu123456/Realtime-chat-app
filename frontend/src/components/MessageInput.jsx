import React, { useRef, useState } from 'react';
import { useChatstore } from '../store/useChatstore';
import { Image, Send, X } from 'lucide-react';

const MessageInput = () => {

    const [text, settext] = useState("");
    const [imagepreview, setimagepreview] = useState(null);
    const fileinputref = useRef(null);
    const { sendmessage } = useChatstore();

    const handle_image_change = (e) => {
        const file = e.target.files[0];

        if (!file.type.startsWith("image")) {
            toast.error("Please select an image file");
            return; }
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setimagepreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const remove_image = () => {
        setimagepreview(null);
        if (fileinputref.current) fileinputref.current.value = "";
    };

    const handle_send_message = async (e) => {
        e.preventDefault();
        if (!text.trim() && !imagepreview) return;
        try {
            await sendmessage({ text: text.trim(), image: imagepreview, });
            settext("");
            setimagepreview(null);
            if (fileinputref.current) fileinputref.current.value = "";
        } catch (err) {
            console.log("Failed to send message", err);
        }
    };
  return (
    <div className="p-4 w-full">
      {imagepreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagepreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
            />
            <button
              onClick={remove_image}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
              flex items-center justify-center"
              type="button"
            >
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}
      
      <form onSubmit={handle_send_message} className="flex items-center gap-2">
        <div className="flex-1 flex gap-2">
            <input
            type="text"
            value={text}
            onChange={(e) => settext(e.target.value)}
            placeholder="Type a message..."
            className="w-full input input-bordered rounded-lg input-sm sm:input-md"/>
            <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileinputref}
            onChange={handle_image_change}
            />
            <button
            type="button"
            className={`hidden sm:flex btn btn-circle
                ${imagepreview ? "text-emerald-500" : "text-zinc-400"}`}
            onClick={() => fileinputref.current?.click()}>
                <Image size={20} />
            </button>
        </div>
        <button
        type='submit'
        className={`btn btn-primary ${text ? "bg-primary" : "bg-primary/20"}`}
        disabled={!text.trim() && !imagepreview}>
            <Send size={22} />
        </button>
      </form>
      </div>
        
      )}

export default MessageInput;