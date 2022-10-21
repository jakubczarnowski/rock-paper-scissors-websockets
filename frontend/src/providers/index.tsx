import { Box, ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import AppTheme from "./chakra/AppTheme";
import Layout from "../layout/Layout";
import RouterProvider from "./router";
import theme from "./chakra/AppTheme";

type Props = {};

const Providers = (props: Props) => {
	return (
		<ChakraProvider theme={AppTheme}>
			<ColorModeScript initialColorMode={theme.config.initialColorMode} />

			<Layout>
				<RouterProvider />
			</Layout>
		</ChakraProvider>
	);
};

export default Providers;
