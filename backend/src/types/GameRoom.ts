import Hands from "./Hands";

export default interface GameRoom {
	roomId: string;
	hostId: string;
	opponentId?: string;
	hostHand: Hands;
	opponentHand: Hands;
	rematchRequested: boolean;
}
