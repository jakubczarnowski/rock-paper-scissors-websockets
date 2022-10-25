import { RenderProps, theme, useToast } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useNavigate } from "react-router";

type Props = {
	shouldOpen: () => boolean;
	type: "info" | "success" | "warning" | "error";
	title: string;
	description: string;
};

const useAppToast = ({ type, title, description, shouldOpen }: Props) => {
	const toast = useToast();
	useEffect(() => {
		if (shouldOpen()) {
			toast({
				position: "top",
				title: title,
				colorScheme: "yellow",
				description: description,
				status: type,
				duration: 9000,
				isClosable: true,
				variant: "main",
			});
		} else {
			toast.closeAll();
		}
	}, [shouldOpen]);
};

export default useAppToast;
