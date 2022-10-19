import { Box, Button, Circle, Fade, Flex, Spinner, Text, theme, useColorModeValue, useInterval, useToast } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useParams } from "react-router";
import Error from "../../components/Error";
import HandBox from "../../components/HandBox";
import HandFight from "../../components/HandFight";
import PaperHand from "../../components/HandSvgs/PaperHand";
import RockHand from "../../components/HandSvgs/RockHand";
import ScissorsHand from "../../components/HandSvgs/ScissorsHand";
import InviteLink from "../../components/InviteLink";
import Loading from "../../components/Loading";
import RoomFull from "../../components/RoomFull";
import UserLeft from "../../components/UserLeft";
import useGame from "../../hooks/useGame";
import GameRoomStates from "../../types/GameRoomStates";
import Hands from "../../types/Hands";

type Props = {};

const GamePage = (props: Props) => {
	const { id } = useParams<{ id: string }>();
	const game = useGame(id || "");
	const handsColor = useColorModeValue(theme.colors.gray[800], theme.colors.white);
	const toast = useToast();
	useEffect(() => {
		if (game.opponentRequestedRematch) {
			toast({
				position: "top",
				title: "Your opponent has requested a rematch!",
				description: "Click here to accept",
				status: "info",
				duration: 9000,
				isClosable: true,
			});
		} else {
			toast.closeAll();
		}
	}, [game.opponentRequestedRematch]);

	const frontendDomain = process.env.REAT_APP_FRONTEND_DOMAIN || "http://localhost:3000/";
	const inviteLink = frontendDomain + "game/" + (id || "xd");
	switch (game.roomState) {
		case GameRoomStates.LOADING:
			return <Loading />;
		case GameRoomStates.WAITING:
			return <InviteLink link={inviteLink} />;
		case GameRoomStates.LEFT:
			return <UserLeft />;
		case GameRoomStates.FULL:
			return <RoomFull />;
		case GameRoomStates.ERROR:
			return <Error />;
	}
	return (
		<>
			<Flex flex={1} flexDirection="column" justifyContent="space-between" align="center" pt={{ md: 6 }}>
				<HandFight opponent isOpponentReady={game.isOpponentReady} playerHand={game.opponentHand} gameResult={game.gameResult} />
				<Flex flex={1} flexDir="column" justifyContent="space-between" align="center" py={4}>
					<Text fontSize={[12, 16, 20]} fontWeight="bold">
						{game.opponentScore}
					</Text>

					<Flex flex="0 0 80px" align="center">
						<Fade in={game.opponentHand !== Hands.NONE} unmountOnExit>
							<Button my={4} w={["80px", "100px", "120px"]} border={`2px ${handsColor} solid`} onClick={() => game.requestRematch()}>
								{game.rematchRequested ? <Spinner speed="0.8s" /> : <Text fontSize={[12, 16]}>Rematch!</Text>}
							</Button>
						</Fade>
					</Flex>

					<Text fontWeight="bold">{game.playerScore}</Text>
				</Flex>

				<HandFight playerHand={game.playerHand} gameResult={game.gameResult} />
			</Flex>
			<Flex flex={0} mb={[2]} mt={[4, 8]} align="center" justify="center">
				<HandBox onClick={() => game.setHand(Hands.ROCK)}>
					<RockHand fill={handsColor} />
				</HandBox>

				<Flex flex={0} mx={[4, null, 12, 32]}>
					<HandBox onClick={() => game.setHand(Hands.PAPER)}>
						<PaperHand fill={handsColor} stroke={handsColor} />
					</HandBox>
				</Flex>

				<HandBox onClick={() => game.setHand(Hands.SCISSORS)}>
					<ScissorsHand fill={handsColor} stroke={handsColor} />
				</HandBox>
			</Flex>
		</>
	);
};

export default GamePage;
