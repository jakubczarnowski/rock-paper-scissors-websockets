import { ChakraProvider } from "@chakra-ui/react";
import AppTheme from "./chakra/AppTheme";
import Layout from "../layout/Layout";
import GameProvider from "./GameProvider/GameProvider";
import RouterProvider from "./router";

type Props = {};

const Providers = (props: Props) => {
	return (
		<ChakraProvider theme={AppTheme}>
			<Layout>
				<GameProvider>
					<RouterProvider />
				</GameProvider>
			</Layout>
		</ChakraProvider>
	);
};

export default Providers;
