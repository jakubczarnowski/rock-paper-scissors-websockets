import { Text, Circle } from "@chakra-ui/layout";
import { Flex, Spinner, theme, useColorModeValue } from "@chakra-ui/react";
import GameState from "../../types/GameState";
import Hands from "../../types/Hands";
import PlayerHand from "./PlayerHand";

interface Props {
	opponent?: boolean;
	isOpponentReady?: boolean;
	playerHand: Hands;
	gameResult?: GameState;
}

const HandFight = ({ playerHand, opponent, isOpponentReady, gameResult }: Props) => {
	const handsColor = useColorModeValue(theme.colors.gray[800], theme.colors.white);

	const getFillColor = () => {
		if (opponent) {
			switch (gameResult) {
				case GameState.WIN:
					return "#ff0000";
				case GameState.LOSE:
					return "#00ff00";
				case GameState.DRAW:
					return "#0000ff";
				case GameState.PLAYING:
					return handsColor;
			}
		} else {
			switch (gameResult) {
				case GameState.WIN:
					return "#00ff00";
				case GameState.LOSE:
					return "#ff0000";
				case GameState.DRAW:
					return "#0000ff";
				case GameState.PLAYING:
					return handsColor;
			}
		}
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
			borderColor={getFillColor()}
		>
			{opponent ? <OpponentHand /> : <Hand />}
		</Circle>
	);
};

export default HandFight;
