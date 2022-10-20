import { Image } from "@chakra-ui/react";
import * as React from "react";
import Rock from "../../static/Rock.png";

const RockHand = () => {
	return <Image src={Rock} sx={{ width: "100%", height: "100%" }} />;
};

export default RockHand;
