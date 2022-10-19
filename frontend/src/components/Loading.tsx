import { Flex, Spinner } from "@chakra-ui/react";
import React from "react";
import PageWrapper from "../layout/PageWrapper";

type Props = {};

const Loading = (props: Props) => {
	return (
		<PageWrapper>
			<Spinner />
		</PageWrapper>
	);
};

export default Loading;
