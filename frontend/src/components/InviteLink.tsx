import { Flex, Input, theme, Tooltip, useClipboard, useColorModeValue, Text } from "@chakra-ui/react";
import React from "react";
import PageWrapper from "../layout/PageWrapper";

type Props = {
	link: string;
};

const InviteLink = ({ link }: Props) => {
	const handsColor = useColorModeValue(theme.colors.gray[800], theme.colors.white);
	const { hasCopied, onCopy } = useClipboard(link);
	return (
		<PageWrapper column>
			<Tooltip
				label={hasCopied ? "Copied!" : "Click to copy!"}
				fontSize={[12, 18, 24]}
				p={[2, null, 4]}
				arrowSize={16}
				borderRadius={["xl", null, "3xl"]}
				offset={[0, 16]}
				isOpen
				hasArrow
				placement="top"
			>
				<Input
					maxW={950}
					p={[0, 2, 8]}
					readOnly={true}
					borderColor={handsColor}
					borderWidth={[1, 2, 4]}
					fontSize={[11, 16, 24, 32]}
					textAlign="center"
					onClick={(e) => {
						e.currentTarget.select();
						onCopy();
					}}
					value={link}
				/>
			</Tooltip>
			<Text fontSize={32}>Send the link to your friend!</Text>
		</PageWrapper>
	);
};

export default InviteLink;
