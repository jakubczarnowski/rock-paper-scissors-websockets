import { Image } from "@chakra-ui/react";
import * as React from "react";

import Scissors from "../../static/Scissors.png";

const ScissorsHand = () => {
	return <Image src={Scissors} sx={{ width: "100%", height: "100%" }} />;
};

export default ScissorsHand;
