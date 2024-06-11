import React from "react";
import Home from './pages/Home';
import TopNavBar from './components/Navbar';
import { useAuth } from "../lib";
import Login from "./pages/Login";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCircleNotch } from "@fortawesome/free-solid-svg-icons";

const LogginIn = ()=> (
	<div className="flex items-center justify-center min-h-screen bg-gray-100">
		<div className="spinner-border animate-spin inline-block w-12 h-12 border-4 rounded-full text-indigo-600" role="status">
			<span className="visually-hidden">
				<FontAwesomeIcon icon={faCircleNotch} />
			</span>
		</div>
	</div>
);

const ASR = () => {
	const { user, isLoggingIn } = useAuth();
	return isLoggingIn ? (<LogginIn />): user ?
	(
		<div className="App">
			<TopNavBar />
			<div className="mt-16">
				<Home />
			</div>
		</div>
	): (<Login />);
}

export default ASR
