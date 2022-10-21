import { Circle, Flex, Spinner, theme, useColorModeValue, Text, Box } from "@chakra-ui/react";
import GameState from "../../types/GameState";
import Hands from "../../types/Hands";
import PaperHand from "../HandImages/PaperHand";
import RockHand from "../HandImages/RockHand";
import ScissorsHand from "../HandImages/ScissorsHand";

interface Props {
	hand: Hands;
}

const ShowHand = ({ hand }: Props) => {
	return <PlayerHand hand={hand} />;
};
const PlayerHand = ({ hand }: { hand: Hands }) => {
	return (
		<Box sx={{ height: "300px" }}>
			{hand === Hands.ROCK && <RockHand />}
			{hand === Hands.PAPER && <PaperHand />}
			{hand === Hands.SCISSORS && <ScissorsHand />}
		</Box>
	);
};
export default ShowHand;
