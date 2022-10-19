"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Hands_1 = __importDefault(require("./types/Hands"));
const roomUtils_1 = require("./utils/roomUtils");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, { cors: { origin: "*" } });
let gameRooms = [];
server.listen(PORT, () => {
    console.log("listening on *:" + PORT);
});
io.on("connection", (socket) => {
    console.log("a user connected");
    socket.on("user:connecting", (roomId) => {
        const foundRoom = gameRooms.find((x) => x.roomId === roomId);
        if (!foundRoom) {
            gameRooms = [
                ...gameRooms,
                {
                    roomId: roomId,
                    hostId: socket.id,
                    hostHand: Hands_1.default.NONE,
                    opponentHand: Hands_1.default.NONE,
                    rematchRequested: false,
                },
            ];
            socket.join(roomId);
            socket.emit("room:waiting");
            console.log(`user ${socket.id} created the room: ${roomId}`);
            return;
        }
        if (foundRoom.opponentId) {
            socket.emit("room:full");
            console.log(`room ${roomId} is full!`);
            return;
        }
        gameRooms = gameRooms.map((gameRoom) => gameRoom.roomId === foundRoom.roomId ? Object.assign(Object.assign({}, foundRoom), { opponentId: socket.id }) : gameRoom);
        socket.join(roomId);
        io.to(foundRoom.roomId).emit("room:playing");
    });
    socket.on("user:setHand", (hand) => {
        if (!(hand in Hands_1.default)) {
            console.log(`'${hand}' was not recognized as proper hand value`);
            return;
        }
        const foundRoom = (0, roomUtils_1.findRoomForSocket)(gameRooms, socket.id);
        if (!foundRoom) {
            socket.emit("server:error");
            return;
        }
        if (foundRoom.hostId === socket.id) {
            if (foundRoom.hostHand === Hands_1.default.NONE) {
                gameRooms = gameRooms.map((gameRoom) => (gameRoom.roomId === foundRoom.roomId ? Object.assign(Object.assign({}, foundRoom), { hostHand: hand }) : gameRoom));
                socket.emit("player:playerHand", hand);
                io.to(foundRoom.opponentId).emit("room:opponentReady");
            }
        }
        else {
            if (foundRoom.opponentHand === Hands_1.default.NONE) {
                gameRooms = gameRooms.map((gameRoom) => gameRoom.roomId === foundRoom.roomId ? Object.assign(Object.assign({}, foundRoom), { opponentHand: hand }) : gameRoom);
                socket.emit("player:playerHand", hand);
                io.to(foundRoom.hostId).emit("room:opponentReady");
            }
        }
    });
    socket.on("room:rematch", () => {
        const foundRoom = (0, roomUtils_1.findRoomForSocket)(gameRooms, socket.id);
        if (!foundRoom) {
            socket.emit("server:error");
            return;
        }
        if (!foundRoom.rematchRequested) {
            gameRooms = gameRooms.map((gameRoom) => gameRoom.roomId === foundRoom.roomId ? Object.assign(Object.assign({}, foundRoom), { rematchRequested: true }) : gameRoom);
            socket.to(foundRoom.roomId).emit("room:rematchSuggested");
        }
        else {
            gameRooms = gameRooms.map((gameRoom) => gameRoom.roomId === foundRoom.roomId
                ? Object.assign(Object.assign({}, foundRoom), { rematchRequested: false, opponentHand: Hands_1.default.NONE, hostHand: Hands_1.default.NONE })
                : gameRoom);
            socket.emit("room:playRematch");
            socket.to(foundRoom.roomId).emit("room:playRematch");
        }
    });
    socket.on("checkWinner", () => {
        const foundRoom = (0, roomUtils_1.findRoomForSocket)(gameRooms, socket.id);
        if (!foundRoom) {
            socket.emit("server:error");
            return;
        }
        if (foundRoom.hostId === socket.id) {
            socket.emit("player:opponentHand", foundRoom.opponentHand);
        }
        else {
            socket.emit("player:opponentHand", foundRoom.hostHand);
        }
    });
});
io.of("/").adapter.on("leave-room", (roomId, userId) => {
    if (roomId !== userId) {
        console.log(`user ${userId} has left the room ${roomId}`);
        io.to(roomId).emit("room:left");
    }
});
io.of("/").adapter.on("delete-room", (roomId) => {
    const foundRoom = gameRooms.find((x) => x.roomId === roomId);
    if (foundRoom) {
        gameRooms = gameRooms.filter((x) => x.roomId !== roomId);
    }
});
