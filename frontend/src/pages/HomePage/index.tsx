import { Circle, Flex, ScaleFade, Text, theme, useColorModeValue, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router";

type Props = {};

const HomePage = (props: Props) => {
	const navigate = useNavigate();
	const mainColor = useColorModeValue(theme.colors.black, theme.colors.white);
	return (
		<Flex alignItems={"center"} justifyContent={"center"} flex={1}>
			<ScaleFade transition={{ enter: { duration: 0.7 } }} initialScale={0.5} in={true}>
				<Circle
					size={"300px"}
					borderRadius={"full"}
					borderWidth={5}
					cursor="pointer"
					borderColor={mainColor}
					sx={{ transition: "transform 0.5s ease-out" }}
					_hover={{ transform: "scale(110%)", transition: "transform 0.5s" }}
					onClick={() => {
						const roomId = Math.random().toString(36).slice(2, 7);
						navigate(`/game/${roomId}`);
					}}
				>
					<Text fontSize={"4rem"} fontWeight="black">
						PLAY
					</Text>
				</Circle>
			</ScaleFade>
		</Flex>
	);
};

export default HomePage;
