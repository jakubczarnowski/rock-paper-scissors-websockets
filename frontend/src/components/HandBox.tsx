import { Square, theme, useColorModeValue } from "@chakra-ui/react";
import { ReactNode } from "react";
type Props = {
	children: ReactNode;
	onClick: () => void;
};
const HandBox = ({ children, onClick }: Props) => {
	const handsColor = useColorModeValue(theme.colors.blackAlpha[200], theme.colors.blackAlpha[400]);

	return (
		<Square
			maxWidth={"30%"}
			onClick={onClick}
			p={5}
			cursor="pointer"
			borderWidth={4}
			bgColor={handsColor}
			borderColor={"black"}
			borderRadius={"2xl"}
			_hover={{ transform: "scale(105%)", transition: "0.5s" }}
		>
			{children}
		</Square>
	);
};
export default HandBox;
