import { Routes, Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import GamePage from "../../pages/GamePage";
import HomePage from "../../pages/HomePage";

type Props = {};

const RouterProvider = (props: Props) => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<HomePage />}></Route>
				<Route path="game/:id" element={<GamePage />}></Route>
			</Routes>
		</BrowserRouter>
	);
};
export default RouterProvider;
