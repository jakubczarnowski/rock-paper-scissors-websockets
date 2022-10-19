import { Response } from "express";
import { SocketAddress } from "net";
import { Socket } from "socket.io";
import GameRoom from "./types/GameRoom";
import Hands from "./types/Hands";
import { findRoomForSocket } from "./utils/roomUtils";

const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;

const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, { cors: { origin: "*" } });

let gameRooms: GameRoom[] = [];

server.listen(PORT, () => {
	console.log("listening on *:" + PORT);
});
io.on("connection", (socket: Socket) => {
	console.log("a user connected");
	socket.on("user:connecting", (roomId: string) => {
		const foundRoom = gameRooms.find((x) => x.roomId === roomId);

		if (!foundRoom) {
			gameRooms = [
				...gameRooms,
				{
					roomId: roomId,
					hostId: socket.id,
					hostHand: Hands.NONE,
					opponentHand: Hands.NONE,
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
		gameRooms = gameRooms.map((gameRoom) =>
			gameRoom.roomId === foundRoom.roomId ? ({ ...foundRoom, opponentId: socket.id } as GameRoom) : gameRoom
		);
		socket.join(roomId);
		io.to(foundRoom.roomId).emit("room:playing");
	});
	socket.on("user:setHand", (hand) => {
		if (!(hand in Hands)) {
			console.log(`'${hand}' was not recognized as proper hand value`);
			return;
		}
		const foundRoom = findRoomForSocket(gameRooms, socket.id);

		if (!foundRoom) {
			socket.emit("server:error");
			return;
		}

		if (foundRoom.hostId === socket.id) {
			if (foundRoom.hostHand === Hands.NONE) {
				gameRooms = gameRooms.map((gameRoom) => (gameRoom.roomId === foundRoom.roomId ? ({ ...foundRoom, hostHand: hand } as GameRoom) : gameRoom));
				socket.emit("player:playerHand", hand);
				io.to(foundRoom.opponentId).emit("room:opponentReady");
			}
		} else {
			if (foundRoom.opponentHand === Hands.NONE) {
				gameRooms = gameRooms.map((gameRoom) =>
					gameRoom.roomId === foundRoom.roomId ? ({ ...foundRoom, opponentHand: hand } as GameRoom) : gameRoom
				);
				socket.emit("player:playerHand", hand);
				io.to(foundRoom.hostId!).emit("room:opponentReady");
			}
		}
	});
	socket.on("room:rematch", () => {
		const foundRoom = findRoomForSocket(gameRooms, socket.id);

		if (!foundRoom) {
			socket.emit("server:error");
			return;
		}
		if (!foundRoom.rematchRequested) {
			gameRooms = gameRooms.map((gameRoom) =>
				gameRoom.roomId === foundRoom.roomId ? ({ ...foundRoom, rematchRequested: true } as GameRoom) : gameRoom
			);
			socket.to(foundRoom.roomId).emit("room:rematchSuggested");
		} else {
			gameRooms = gameRooms.map((gameRoom) =>
				gameRoom.roomId === foundRoom.roomId
					? ({ ...foundRoom, rematchRequested: false, opponentHand: Hands.NONE, hostHand: Hands.NONE } as GameRoom)
					: gameRoom
			);
			socket.emit("room:playRematch");
			socket.to(foundRoom.roomId).emit("room:playRematch");
		}
	});
	socket.on("checkWinner", () => {
		const foundRoom = findRoomForSocket(gameRooms, socket.id);

		if (!foundRoom) {
			socket.emit("server:error");
			return;
		}
		if (foundRoom.hostId === socket.id) {
			socket.emit("player:opponentHand", foundRoom.opponentHand);
		} else {
			socket.emit("player:opponentHand", foundRoom.hostHand);
		}
	});
});
io.of("/").adapter.on("leave-room", (roomId: string, userId: string) => {
	if (roomId !== userId) {
		console.log(`user ${userId} has left the room ${roomId}`);
		io.to(roomId).emit("room:left");
	}
});

io.of("/").adapter.on("delete-room", (roomId: string) => {
	const foundRoom = gameRooms.find((x) => x.roomId === roomId);
	if (foundRoom) {
		gameRooms = gameRooms.filter((x) => x.roomId !== roomId);
	}
});
