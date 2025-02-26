import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
    },
});

export function getreceiversocketID (userId) {
    return usersocketmap[userId];
};

const usersocketmap = {}; //{UserID: socketID}

io.on("connection", (socket) => {
    console.log("A user connected", socket.id);

    const userID = socket.handshake.query.userID;

    if (userID)
        usersocketmap[userID] = socket.id;

    io.emit("user-connected", Object.keys(usersocketmap));

    socket.on("disconnect", () => {
        console.log("A user disconnected", socket.id);
        delete usersocketmap[userID];
        io.emit("user-disconnected", Object.keys(usersocketmap));
    });
});
export { io, app, server };