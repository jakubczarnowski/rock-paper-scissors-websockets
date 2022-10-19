import { Square, theme, useColorModeValue } from "@chakra-ui/react";
import { ReactNode } from "react";
type Props = {
	children: ReactNode;
	onClick: () => void;
};
const HandBox = ({ children, onClick }: Props) => {
	const handsColor = useColorModeValue(theme.colors.gray[800], theme.colors.white);

	return (
		<Square
			onClick={onClick}
			size={["90px", "140px", "200px"]}
			p={[2, 3, 5]}
			cursor="pointer"
			borderWidth={[2, 3, 5]}
			borderColor={handsColor}
			borderRadius={[30, 40, 50]}
			_hover={{ _active: { transform: "scale(0.9)" } }}
		>
			{children}
		</Square>
	);
};
export default HandBox;
