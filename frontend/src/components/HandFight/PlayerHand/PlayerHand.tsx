import { theme, useColorModeValue } from "@chakra-ui/react";
import Hands from "../../../types/Hands";
import PaperHand from "../../HandSvgs/PaperHand";
import RockHand from "../../HandSvgs/RockHand";
import ScissorsHand from "../../HandSvgs/ScissorsHand";

type Props = {
	hand: Hands;
};

const PlayerHand = ({ hand }: Props) => {
	const handsColor = useColorModeValue(theme.colors.gray[800], theme.colors.white);

	return (
		<>
			{hand === Hands.ROCK && <RockHand fill={handsColor} />}
			{hand === Hands.PAPER && <PaperHand fill={handsColor} stroke={handsColor} />}
			{hand === Hands.SCISSORS && <ScissorsHand fill={handsColor} stroke={handsColor} />}
		</>
	);
};

export default PlayerHand;
