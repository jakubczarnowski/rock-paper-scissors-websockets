import { Box, Button, Circle, Fade, Flex, Spinner, Stack, Text, theme, useColorModeValue, useInterval, useToast } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useParams } from "react-router";
import Error from "../../components/Error";
import HandBox from "../../components/HandBox";
import ShowHand from "../../components/ShowHand";
import PaperHand from "../../components/HandImages/PaperHand";
import RockHand from "../../components/HandImages/RockHand";
import ScissorsHand from "../../components/HandImages/ScissorsHand";
import InviteLink from "../../components/InviteLink";
import Loading from "../../components/Loading";
import RoomFull from "../../components/RoomFull";
import UserLeft from "../../components/UserLeft";
import useAppToast from "../../hooks/useAppToast";
import useGame from "../../hooks/useGame";
import GameRoomStates from "../../types/GameRoomStates";
import Hands from "../../types/Hands";

type Props = {};

const GamePage = (props: Props) => {
	const { id } = useParams<{ id: string }>();
	const game = useGame(id || "");
	useAppToast({
		title: "Your opponent has requested a rematch!",
		description: "Click rematch to accept",
		type: "info",
		on: game.opponentRequestedRematch,
		equals: true,
	});
	const frontendDomain = process.env.REACT_APP_FRONTEND_DOMAIN || "http://localhost:3000/";
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
			<Flex flex={1} flexDirection="column" justifyContent="space-between" align="center" pt={{ md: 5 }}>
				<ShowHand opponent isOpponentReady={game.isOpponentReady} hand={game.opponentHand} gameResult={game.gameResult} />
				<Flex flex={1} flexDir="column" justifyContent="space-between" align="center" py={4}>
					<Text variant="basic" fontWeight="bold">
						{game.opponentScore}
					</Text>

					<Flex flex="0 0 80px" align="center">
						<Fade in={game.opponentHand !== Hands.NONE} unmountOnExit>
							<Button my={4} w={"100px"} border={`2px solid black`} onClick={() => game.requestRematch()}>
								{game.rematchRequested ? <Spinner /> : <Text>Rematch!</Text>}
							</Button>
						</Fade>
					</Flex>

					<Text variant="basic" fontWeight="bold">
						{game.playerScore}
					</Text>
				</Flex>

				<ShowHand hand={game.playerHand} gameResult={game.gameResult} />
			</Flex>
			<Flex align="center" justify="center" gap="10px">
				<HandBox onClick={() => game.setHand(Hands.ROCK)}>
					<RockHand />
				</HandBox>

				<HandBox onClick={() => game.setHand(Hands.PAPER)}>
					<PaperHand />
				</HandBox>

				<HandBox onClick={() => game.setHand(Hands.SCISSORS)}>
					<ScissorsHand />
				</HandBox>
			</Flex>
		</>
	);
};

export default GamePage;
