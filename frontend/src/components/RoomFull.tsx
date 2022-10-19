import { Button, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router";
import PageWrapper from "../layout/PageWrapper";

type Props = {};

const RoomFull = (props: Props) => {
	const navigate = useNavigate();

	return (
		<PageWrapper column>
			<Text fontSize={32}>The room is full!</Text>
			<Button onClick={() => navigate("/")}>Create Another Game</Button>
		</PageWrapper>
	);
};

export default RoomFull;
