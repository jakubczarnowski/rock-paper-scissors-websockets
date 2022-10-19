import { Button, Flex, useToast, Text } from "@chakra-ui/react";
import React from "react";
import { CiWarning } from "react-icons/ci";
import { NavigateFunction, useNavigate } from "react-router";
import { AiOutlineClose } from "react-icons/ai";
type Props = {
	type: "info" | "success" | "warning" | "error";
	title: string;
	description: string;
	redirectUrl: string;
};

const CustomToast = ({ type, title, description, redirectUrl }: Props) => {
	const toast = useToast();
	const navigate = useNavigate();
	return (
		<Flex
			onClick={() => {
				toast.closeAll();
				navigate(redirectUrl);
			}}
			flex={1}
			py={2}
			pl={4}
			pr={2}
			cursor="pointer"
			justifyContent="space-between"
			borderRadius="lg"
			bgColor={"orange.200"}
			color="#000"
		>
			<CiWarning />
			<Flex flexDirection="column">
				<Text fontWeight="bold">{title}</Text>
				<Text fontSize={12}>{description}</Text>
			</Flex>
			<Button
				onClick={(e) => {
					toast.closeAll();
					e.stopPropagation();
				}}
				bgColor={"orange.200"}
				_hover={{ bgColor: "orange.100" }}
				size="xs"
			>
				<AiOutlineClose />
			</Button>
		</Flex>
	);
};

export default CustomToast;
