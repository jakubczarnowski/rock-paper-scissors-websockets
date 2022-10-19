import { Circle, Flex, Text, theme, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router";

type Props = {};

const HomePage = (props: Props) => {
	const navigate = useNavigate();
	const mainColor = useColorModeValue(theme.colors.gray[800], theme.colors.white);

	return (
		<Flex alignItems={"center"} justifyContent={"center"} flex={1}>
			<Circle
				size={{ sm: 200, md: 300 }}
				borderWidth={5}
				p={5}
				cursor="pointer"
				borderColor={mainColor}
				onClick={() => {
					const roomId = Math.random().toString(36).slice(2, 7);
					navigate(`/game/${roomId}`);
				}}
			>
				<Text fontSize={{ sm: 32, md: 64 }} fontWeight="black">
					PLAY
				</Text>
			</Circle>
		</Flex>
	);
};

export default HomePage;
