import { Flex, Spinner, theme, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import PageWrapper from "../layout/PageWrapper";

type Props = {};

const Loading = (props: Props) => {
	const handsColor = useColorModeValue(theme.colors.black, theme.colors.white);
	return (
		<PageWrapper>
			<Spinner color={handsColor} />
		</PageWrapper>
	);
};

export default Loading;
