import GameRoomStates from "./GameRoomStates";
import GameState from "./GameState";
import Hands from "./Hands";

export interface IGameContext {
	roomState: GameRoomStates;
	playerHand: Hands;
	opponentHand: Hands;
	isOpponentReady: boolean;
	gameResult: GameState;
	playerScore: number;
	opponentScore: number;
	rematchRequested: boolean;
	playRematch: () => void;
}
