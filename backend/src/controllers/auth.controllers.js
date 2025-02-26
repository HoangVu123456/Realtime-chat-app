import User from "../models/user.models.js";
import bcrypt from "bcryptjs";
import { generatetoken } from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";

export const signup = async (req, res) => {
    const { fullname, username, email, password } = req.body;
    try {

        if (!fullname || !email || !username || !password) {
            return res.status(400).json({ message: "Please fill in all required field!" });
        }
        if (password.length < 8) {
            return res.status(400).json({ message: "Password must contain at least 8 characters" });
        }

        const check_user = await User.findOne({ username });
        const check_email = await User.findOne({ email });

        if (check_email) {
            return res.status(400).json({ message: "Email already exists" });
        }

        if (check_user) {
            return res.status(400).json({ message: "This username was taken! Please choose another one" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const new_user = new User({
            fullname: fullname,
            email: email,
            username: username,
            password: hashedPassword,
        })

        if (new_user) {
            generatetoken(new_user._id, res);
            await new_user.save();

            res.status(201).json({
                _id: new_user._id,
                fullname: new_user.fullname,
                email: new_user.email,
                username: new_user.username,
                password: hashedPassword,  
            })
        }
        else {
            return res.status(400).json({ message: "Invalid user" });
        }
    } catch(err) {
        console.log("Error in signup controller", err.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const check_user = await User.findOne({ email });
        
        if (!check_user) {
            return res.status(400).json({ message: "This email doesn't exist!"});
        }

        const verify = await bcrypt.compare(password, check_user.password);

        if (!verify) {
            return res.status(400).json({ message:"Wrong password!" });
        }

        generatetoken(check_user._id, res);

        res.status(200).json({
            _id: check_user._id,
            fullname: check_user.fullname,
            email: check_user.email,
            username: check_user.username,
            profilepic: check_user.profilepic,
        })
    } catch(err) {
        console.log("Error in login controller", err.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0});
        res.status(200).json({ message: "Logout successful" });
    } catch(err) {
        console.log("Error in logout controller", err.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const update_profilepic = async (req, res) => {
    try {
        const { profilepic } = req.body;
        const userId = req.user._id;

        if (!profilepic) {
            return res.status(400).json({ message:"Image required" });
        }

        const upload_response = await cloudinary.uploader.upload(profilepic);
        const updated_user = await User.findByIdAndUpdate(userId, {profilepic:upload_response.secure_url}, {new:true});

        res.status(200).json(updated_user);
    } catch(err) {
        console.log("Error in update controller", err.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const checkAuth = (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch(err) {
        console.log("Error in checkAuth controller", err.message);
        res.status(500).json({ message: "Internal server error" });
    }
};