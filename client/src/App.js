import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
// import Home from "./pages/Home";
import Login from "./pages/Login";

import Test from "./pages/TestPage";
import "./App.css";
import ResponsiveHome from "./pages/ResponsiveHome";

function App() {
	const [user, setUser] = useState(null);

	const getUser = async () => {
		try {
			const url = `${process.env.REACT_APP_API_URL}/auth/login/success`;
			const { data } = await axios.get(url, { withCredentials: true });
			setUser(data.user._json);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getUser();
	}, []);

	return (
		<div>
			<Routes>
				<Route
					exact
					path="/"
					element={user ? <ResponsiveHome user={user} /> : <Navigate to="/login" />}
				/>
				<Route
					exact
					path="/login"
					element={user ? <Navigate to="/" /> : <Login />}
				/>
				<Route
					path="/test"
					element={user ? <Test user={user} /> : <Login />}
				/>
			</Routes>
		</div>
	);
}

export default App;
