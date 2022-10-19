import React, { createContext, ReactNode, useState } from "react";
import GameRoomStates from "../../types/GameRoomStates";
import GameState from "../../types/GameState";
import Hands from "../../types/Hands";
import { IGameContext } from "../../types/IGameContext";

type Props = {
	children: ReactNode;
};

export const GameContext = createContext<IGameContext | null>(null);
const GameProvider = ({ children }: Props) => {
	const [roomState, setRoomState] = useState(GameRoomStates.LOADING);
	const [playerHand, setPlayerHand] = useState(Hands.NONE);
	const [opponentHand, setOpponentHand] = useState(Hands.NONE);
	const [isOpponentReady, setIsOpponentReady] = useState(false);
	const [gameResult, setGameResult] = useState(GameState.PLAYING);
	const [playerScore, setPlayerScore] = useState(0);
	const [opponentScore, setOpponentScore] = useState(0);
	const [rematchRequested, setRematchRequested] = useState(false);

	const playRematch = () => {};

	return (
		<GameContext.Provider
			value={{
				roomState,
				playerHand,
				opponentHand,
				isOpponentReady,
				gameResult,
				playerScore,
				opponentScore,
				rematchRequested,
				playRematch,
			}}
		>
			{children}
		</GameContext.Provider>
	);
};

export default GameProvider;
