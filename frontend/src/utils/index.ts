import { io } from "socket.io-client";
import GameState from "../types/GameState";
import Hands from "../types/Hands";
export const getWinner = (playerHand: Hands, opponentHand: Hands) => {
	type myType = Partial<Record<keyof typeof Hands, Partial<Record<keyof typeof Hands, GameState>>>>;
	const winningCondition: myType = {
		[Hands.ROCK]: {
			[Hands.PAPER]: GameState.LOSE,
			[Hands.SCISSORS]: GameState.WIN,
			[Hands.ROCK]: GameState.DRAW,
		},
		[Hands.PAPER]: {
			[Hands.PAPER]: GameState.DRAW,
			[Hands.SCISSORS]: GameState.LOSE,
			[Hands.ROCK]: GameState.WIN,
		},
		[Hands.SCISSORS]: {
			[Hands.PAPER]: GameState.WIN,
			[Hands.SCISSORS]: GameState.DRAW,
			[Hands.ROCK]: GameState.LOSE,
		},
	};

	return winningCondition[playerHand]?.[opponentHand] || GameState.DRAW;
};

const backendDomain = process.env.REACT_APP_BACKEND_DOMAIN || "http://localhost:4000/";
export const socket = io(backendDomain, { autoConnect: false });
