import { Flex } from "@chakra-ui/react";
import React, { ReactNode } from "react";
import { JsxElement } from "typescript";
import { ColorModeSwitcher } from "./ColorModeSwitcher";

type Props = {
	children: ReactNode;
};

const Layout = ({ children }: Props) => {
	return (
		<Flex direction="column" minH="100vh" p={[1, 2, 4]}>
			<Flex justifyContent="flex-end">
				<ColorModeSwitcher />
			</Flex>
			{children}
		</Flex>
	);
};

export default Layout;
