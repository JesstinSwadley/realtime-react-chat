import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Robot from "../assets/robot.gif";

function Welcome() {
	const [username, setUsername] = useState("")

	useEffect(() => {
		const getCurrentUser = async () => {
			let user = await JSON.parse(localStorage.getItem("chat-app-user")).username
			setUsername(user);
		}

		getCurrentUser();
	}, []);

	return (
		<Container>
			<img src={Robot} alt="Robot" />
			<h1>
				Welcome, <span>{username}!</span>
			</h1>

			<h3>Please select a chat to start messaging.</h3>
		</Container>
	)
}

const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	color: white;

	img {
		height: 20rem;
	}

	span {
		color: #4e0fff;
	}
`;

export default Welcome;