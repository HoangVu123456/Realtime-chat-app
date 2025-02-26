import Message from "../models/message.models.js";
import User from "../models/user.models.js";
import cloudinary from "../lib/cloudinary.js";
import { getreceiversocketID, io } from "../lib/socket.js";

export const getuserforsidebar = async (req, res) => {
    try {
        
        const userloggedin = req.user._id;
        const users = await User.find({ _id: { $ne: userloggedin } }).select("-password");

        res.status(200).json(users)
    } catch(err) {
        console.log("Error in usersidebar controller", err.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getmessage = async (req, res) => {
    try {
        const { id: usertochatid } = req.params;
        const myId = req.user._id;

        const message = await Message.find({
            $or: [
                {senderID: myId, receiverID: usertochatid,},
                {senderID: usertochatid, receiverID: myId,}
            ]
        })

        res.status(200).json(message);
    } catch(err) {
        console.log("Error in getmessage controller", err.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const sendmessage = async (req, res) => {
    try {
        const { text, image } = req.body;
        const { id: receiverId} = req.params;
        const myid = req.user._id;

        let imageUrl;
        if (image) {
        const upload_image = await cloudinary.uploader.upload(image);
        imageUrl = upload_image.secure_url;
        }

        const new_message = new Message({
            senderID: myid,
            receiverID: receiverId,
            text: text,
            image: imageUrl,
        });

        await new_message.save();

        const receiversocketID = getreceiversocketID(receiverId);
        if (receiversocketID) {
            io.to(receiversocketID).emit("new_message", new_message);
        }
        
        res.status(201).json(new_message);
    } catch(err) {
        console.log("Error in send controller", err.message);
        res.status(500).json({ message: "Internal server error" });
    }
};