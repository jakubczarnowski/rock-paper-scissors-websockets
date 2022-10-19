import { Routes, Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import HomePage from "../../pages/HomePage";

type Props = {};

const RouterProvider = (props: Props) => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<HomePage />}></Route>
			</Routes>
		</BrowserRouter>
	);
};
export default RouterProvider;
