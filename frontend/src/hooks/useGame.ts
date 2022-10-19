import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import GameRoomStates from "../types/GameRoomStates";
import GameState from "../types/GameState";
import Hands from "../types/Hands";
import { getWinner } from "../utils";

const backendDomain = process.env.BACKEND_DOMAIN || "http://localhost:4000/";
console.log(process.env.BACKEND_DOMAIN);
const socket = io(backendDomain, { autoConnect: false });
const useGame = (roomId: string) => {
	const [roomState, setRoomState] = useState(GameRoomStates.LOADING);
	const [playerHand, setPlayerHand] = useState(Hands.NONE);
	const [opponentHand, setOpponentHand] = useState(Hands.NONE);
	const [isOpponentReady, setIsOpponentReady] = useState(false);
	const [gameResult, setGameResult] = useState(GameState.PLAYING);
	const [playerScore, setPlayerScore] = useState(0);
	const [opponentScore, setOpponentScore] = useState(0);
	const [rematchRequested, setRematchRequested] = useState(false);
	const [opponentRequestedRematch, setOpponentRequestedRematch] = useState(false);

	const checkWinner = () => {
		socket.emit("checkWinner", roomId);
	};
	const setHand = (hand: Hands) => {
		if (playerHand !== Hands.NONE) {
			return;
		}
		setPlayerHand(hand);
		socket.emit("user:setHand", hand);
	};
	useEffect(() => {
		if (opponentHand !== Hands.NONE) {
			setGameResult(getWinner(playerHand, opponentHand));
		}
	}, [opponentHand]);
	const requestRematch = () => {
		if (rematchRequested) {
			return;
		}
		setRematchRequested(true);
		socket.emit("room:rematch");
	};

	const playRematch = () => {
		setPlayerHand(Hands.NONE);
		setOpponentHand(Hands.NONE);
		setGameResult(GameState.PLAYING);
		setIsOpponentReady(false);
		setOpponentRequestedRematch(false);
		setRematchRequested(false);
		setRoomState(GameRoomStates.PLAYING);
	};
	useEffect(() => {
		if (!socket.connected) socket.connect();
		socket.emit("user:connecting", roomId);

		return () => {
			socket.disconnect();
		};
	}, []);

	useEffect(() => {
		if (playerHand !== Hands.NONE && isOpponentReady) {
			checkWinner();
		}
	}, [playerHand, isOpponentReady]);

	useEffect(() => {
		console.log("+!");
		console.log(gameResult);
		console.log(playerHand, opponentHand);
		if (gameResult === GameState.WIN) {
			setPlayerScore((prev) => prev + 1);
			return;
		}

		if (gameResult === GameState.LOSE) {
			setOpponentScore((prev) => prev + 1);
			return;
		}
	}, [gameResult]);

	useEffect(() => {
		socket.on("room:playing", () => {
			setRoomState(GameRoomStates.PLAYING);
		});
		socket.on("room:waiting", () => {
			setRoomState(GameRoomStates.WAITING);
		});
		socket.on("room:full", () => {
			setRoomState(GameRoomStates.FULL);
		});
		socket.on("room:left", () => {
			setRoomState(GameRoomStates.LEFT);
		});
		socket.on("room:rematchSuggested", () => {
			if (rematchRequested) {
				return;
			}
			setOpponentRequestedRematch(true);
		});
		socket.on("room:playRematch", () => {
			console.log("rematch");
			playRematch();
		});
		socket.on("room:opponentReady", () => {
			setIsOpponentReady(true);
		});
		socket.on("server:error", () => {
			setRoomState(GameRoomStates.ERROR);
		});
		socket.on("player:playerHand", (hand: Hands) => setPlayerHand(hand));
		socket.on("player:opponentHand", (hand: Hands) => {
			console.log("XDDDDDDDD");
			setOpponentHand(hand);
		});
		return () => {
			socket.off("room:playing");
			socket.off("room:waiting");
			socket.off("room:left");
			socket.off("room:full");
			socket.off("room:rematchSuggested");
			socket.off("room:playRematch");
			socket.off("room:opponentReady");
			socket.off("server:error");
		};
	}, []);
	return {
		roomState,
		playerHand,
		opponentHand,
		isOpponentReady,
		gameResult,
		playerScore,
		opponentScore,
		rematchRequested,
		opponentRequestedRematch,
		playRematch,
		setHand,
		requestRematch,
	};
};

export default useGame;
