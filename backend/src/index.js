import express from "express";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import cookie_parser from "cookie-parser";
import dotenv from "dotenv";
import {connectDB} from "./lib/db.js";
import cors from "cors";
import path from "path";
import { app, server } from "./lib/socket.js";

dotenv.config();
const PORT = process.env.PORT;
const __dirname = path.resolve();

app.use(express.json({ limit: '50mb' }));
app.use(cookie_parser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,}));

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

if (process.env.NODE_ENV==="production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));


    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "../frontend", "dist", "index.html"));
    })
}

server.listen(5001, () => {
    console.log("Server is running on port:" + PORT);
    connectDB();
});
