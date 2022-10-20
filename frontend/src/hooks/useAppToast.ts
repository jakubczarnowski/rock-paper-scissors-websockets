import { RenderProps, theme, useToast } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useNavigate } from "react-router";

type Props = {
	on: any;
	equals: any;
	type: "info" | "success" | "warning" | "error";
	title: string;
	description: string;
};

const useAppToast = ({ on, type, title, description, equals }: Props) => {
	const toast = useToast();
	useEffect(() => {
		if (on === equals) {
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
	}, [on]);
};

export default useAppToast;
