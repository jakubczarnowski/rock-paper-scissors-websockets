import { Text, Circle } from "@chakra-ui/layout";
import { Flex, Spinner, theme, useColorModeValue } from "@chakra-ui/react";
import GameState from "../../types/GameState";
import Hands from "../../types/Hands";
import PaperHand from "../HandSvgs/PaperHand";
import RockHand from "../HandSvgs/RockHand";
import ScissorsHand from "../HandSvgs/ScissorsHand";

interface Props {
	opponent?: boolean;
	isOpponentReady?: boolean;
	playerHand: Hands;
	gameResult?: GameState;
}

const HandFight = ({ playerHand, opponent, isOpponentReady, gameResult }: Props) => {
	const handsColor = useColorModeValue(theme.colors.gray[800], theme.colors.white);

	const fillColor = {
		[GameState.WIN]: opponent ? "#ff0000" : "#00ff00",
		[GameState.LOSE]: opponent ? "#00ff00" : "#ff0000",
		[GameState.DRAW]: "#0000ff",
		[GameState.PLAYING]: handsColor,
	};

	const OpponentHand = () =>
		isOpponentReady ? (
			playerHand !== Hands.NONE ? (
				<PlayerHand hand={playerHand} />
			) : (
				<Flex flexDir="column" align="center" pb={[4, 8]}>
					<Text align="center" fontWeight="bold" fontSize={[12, 16]} mt={[4, 8]}>
						Opponent made a pick!
					</Text>
				</Flex>
			)
		) : (
			<Flex flexDir="column" align="center" pb={[4, 8]}>
				<Spinner speed="1.5s" w={[8, 10, 16]} h={[8, 10, 16]} color={handsColor} />
				<Text align="center" fontWeight="bold" fontSize={[12, 16]} mt={[4, 8]}>
					Opponent's still picking...
				</Text>
			</Flex>
		);

	const Hand = () =>
		playerHand !== Hands.NONE ? (
			<PlayerHand hand={playerHand} />
		) : (
			<Text fontWeight="bold" fontSize={[16, 20]}>
				Pick hand!
			</Text>
		);

	return (
		<Circle
			size={opponent ? ["140px", "200px", "250px"] : ["120px", "160px", "200px"]}
			borderWidth={[2, 3, 5]}
			p={[3, 5]}
			borderColor={fillColor[gameResult || "WIN"]}
		>
			{opponent ? <OpponentHand /> : <Hand />}
		</Circle>
	);
};

const PlayerHand = ({ hand }: { hand: Hands }) => {
	const handsColor = useColorModeValue(theme.colors.gray[800], theme.colors.white);

	return (
		<>
			{hand === Hands.ROCK && <RockHand fill={handsColor} />}
			{hand === Hands.PAPER && <PaperHand fill={handsColor} stroke={handsColor} />}
			{hand === Hands.SCISSORS && <ScissorsHand fill={handsColor} stroke={handsColor} />}
		</>
	);
};

export default HandFight;
