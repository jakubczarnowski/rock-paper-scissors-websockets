import { defineStyle, defineStyleConfig, extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
	useSystemColorMode: false,
	initialColorMode: "dark",
};
const basic = defineStyle({
	fontSize: { sm: "1.3rem", md: "2rem" },
});

export const textTheme = defineStyleConfig({
	variants: { basic },
});
const theme = extendTheme({
	config,
	colors: {
		red: "FC0000",
		green: "00FC00",
		blue: "0000FC",
	},
	components: {
		Text: textTheme,
		Alert: {
			variants: {
				main: (props: any) => {
					return {
						container: {
							bg: props.colorMode === "dark" ? `#5d5f6d` : "#cdcdd4",
							color: props.colorMode === "dark" ? "white" : "black", // or literal color, e.g. "#0984ff"
						},
					};
				},
			},
		},
	},
	styles: {
		global: (props: any) => ({
			"html, body": {
				bgColor: props.colorMode === "dark" ? "#181b2e" : "#FFFFFF",
			},
		}),
	},
});

export default theme;
