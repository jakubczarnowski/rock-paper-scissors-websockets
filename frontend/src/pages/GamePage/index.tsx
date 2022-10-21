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
import GameState from "../../types/GameState";

type Props = {};

const GamePage = (props: Props) => {
	const { id } = useParams<{ id: string }>();
	const game = useGame(id || "");
	const mainColor = useColorModeValue(theme.colors.black, theme.colors.white);
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
	const winMapping: Partial<Record<keyof typeof GameState, string>> = {
		[GameState.DRAW]: "Draw!",
		[GameState.WIN]: "You won!",
		[GameState.LOSE]: "You lost!",
	};

	return (
		<>
			<Flex justify={"center"} alignItems={"center"} direction="column">
				<Flex gap={"10px"}>
					<Text variant="basic" fontWeight="bold">
						{game.playerScore}
					</Text>
					<Text variant="basic" fontWeight="bold">
						:
					</Text>
					<Text variant="basic" fontWeight="bold">
						{game.opponentScore}
					</Text>
				</Flex>
				<Flex flex="0 0 80px" align="center">
					<Fade in={game.opponentHand !== Hands.NONE} unmountOnExit>
						<Button my={4} w={"100px"} border={`2px solid black`} onClick={() => game.requestRematch()}>
							{game.rematchRequested ? <Spinner /> : <Text>Rematch!</Text>}
						</Button>
					</Fade>
				</Flex>
			</Flex>
			<Flex flex={1} flexDirection="row" align="center" justify={"center"} pt={{ md: 5 }} mb={5}>
				{game.playerHand !== Hands.NONE ? (
					<Flex width={"30%"} justify={"center"}>
						<ShowHand hand={game.playerHand} />
					</Flex>
				) : (
					<Flex minWidth={"30%"} flexDirection={{ md: "row", base: "column" }}>
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
				)}

				{game.isOpponentReady ? (
					<>
						<Flex flexDirection="column" align="center">
							<Text align="center" fontWeight="bold">
								Opponent made a pick!
							</Text>
							{game.gameResult !== GameState.PLAYING && <Text variant="basic">{winMapping[game.gameResult]}</Text>}
						</Flex>

						<Flex width={"30%"} justify={"center"} sx={{ transform: "scaleX(-1)" }}>
							<ShowHand hand={game.opponentHand} />
						</Flex>
					</>
				) : (
					<>
						<Flex flexDirection="column" align="center">
							<Spinner speed="1.5s" color={mainColor} />
							<Text align="center" fontWeight="bold">
								Opponent's still picking...
							</Text>
						</Flex>
						<Flex width={"30%"} />
					</>
				)}
			</Flex>
		</>
	);
};

export default GamePage;
