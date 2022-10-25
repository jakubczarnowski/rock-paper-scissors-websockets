import { Box, Circle, Flex, ScaleFade, Slide, Text, theme, useColorModeValue, useDisclosure } from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router";

type Props = {};

const HomePage = (props: Props) => {
	const navigate = useNavigate();
	const [clicked, setClicked] = useState(false);
	const mainColor = useColorModeValue(theme.colors.black, theme.colors.white);
	const createRoom = () => {
		const roomId = Math.random().toString(36).slice(2, 7);
		navigate(`/game/${roomId}`);
	};
	return (
		<Flex alignItems={"center"} justifyContent={"center"} flex={1} direction="column">
			<ScaleFade transition={{ enter: { duration: 0.7 } }} initialScale={0.5} in={true}>
				<Text fontSize={"4rem"} fontWeight="black">
					Rock Paper Scissors
				</Text>
			</ScaleFade>
			<Text onClick={() => createRoom()} variant="basic" mt={5} _hover={{ outline: "1px solid" + mainColor }} padding={1} rounded="md">
				Create Room
			</Text>
		</Flex>
	);
};

export default HomePage;
