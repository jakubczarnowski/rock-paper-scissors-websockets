import { Circle, Flex, Spinner, theme, useColorModeValue, Text } from "@chakra-ui/react";
import GameState from "../../types/GameState";
import Hands from "../../types/Hands";
import PaperHand from "../HandImages/PaperHand";
import RockHand from "../HandImages/RockHand";
import ScissorsHand from "../HandImages/ScissorsHand";

interface Props {
	opponent?: boolean;
	isOpponentReady?: boolean;
	hand: Hands;
	gameResult?: GameState;
}

const ShowHand = ({ hand, opponent, isOpponentReady, gameResult }: Props) => {
	const handsColor = useColorModeValue(theme.colors.black, theme.colors.white);

	const fillColor = {
		[GameState.WIN]: opponent ? theme.colors.red : theme.colors.green,
		[GameState.LOSE]: opponent ? theme.colors.green : theme.colors.red,
		[GameState.DRAW]: theme.colors.blue,
		[GameState.PLAYING]: handsColor,
	};

	const Hand = () => (hand !== Hands.NONE ? <PlayerHand hand={hand} /> : <Text fontWeight="bold">Pick hand!</Text>);

	return (
		<Circle borderColor={fillColor[gameResult || "WIN"]} border={4} borderRadius={"full"} borderWidth={5}>
			{opponent ? <OpponentHand hand={hand} isOpponentReady={isOpponentReady} handsColor={handsColor} /> : <Hand />}
		</Circle>
	);
};
const OpponentHand = ({ isOpponentReady, hand, handsColor }: { isOpponentReady: boolean | undefined; hand: Hands; handsColor: string }) =>
	isOpponentReady ? (
		hand !== Hands.NONE ? (
			<PlayerHand hand={hand} />
		) : (
			<Flex flexDirection="column" align="center">
				<Text align="center" fontWeight="bold">
					Opponent made a pick!
				</Text>
			</Flex>
		)
	) : (
		<Flex flexDirection="column" align="center">
			<Spinner speed="1.5s" color={handsColor} />
			<Text align="center" fontWeight="bold">
				Opponent's still picking...
			</Text>
		</Flex>
	);
const PlayerHand = ({ hand }: { hand: Hands }) => {
	return (
		<>
			{hand === Hands.ROCK && <RockHand />}
			{hand === Hands.PAPER && <PaperHand />}
			{hand === Hands.SCISSORS && <ScissorsHand />}
		</>
	);
};
export default ShowHand;
