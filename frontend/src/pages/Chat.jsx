import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { allUsersRoute } from "../utils/APIRoutes";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";


function Chat() {
	const navigate = useNavigate();

	const [contacts, setContacts] = useState([]);
	const [currentUser, setCurrentUser] = useState(undefined);
	const [currentChat, setCurrentChat] = useState(undefined);

	useEffect(() => {
		const getCurrentUser = async () => {
			if(!localStorage.getItem("chat-app-user")) {
				navigate("/")
			} else {
				setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")))
			}
		}

		getCurrentUser();
	}, []);

	useEffect(() => {
		const getAllUsers = async () => {
			if(currentUser) {
				if(currentUser.isAvatarImageSet) {
					const data = await axios
						.get(`${allUsersRoute}/${currentUser._id}`)
						.catch(err => console.log(err));

					setContacts(data.data);
				} else {
					navigate('/setAvatar');
				}
			}
		}

		getAllUsers();
	}, [currentUser]);

	const handleChatChange = (chat) => {
		setCurrentChat(chat);
	}

	return (
		<Container>
			<div className="container">
				<Contacts
					changeChat={handleChatChange}
					contacts={contacts}
					currentUser={currentUser}/>

				<Welcome 
					currentUser={currentUser}/>
			</div>
		</Container>
	)
}

const Container = styled.div`
	height: 100vh;
	width: 100vw;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 1rem;
	background-color: #131324;

	.container {
		height: 85vh;
		width: 85vw;
		background-color: #00000076;
		display: grid;
		grid-template-columns: 25% 75%;

		@media screen and (min-width: 720px) and (max-width: 1080px) {
			grid-template-columns: 35% 65%;
		}
	
		@media screen and (min-width: 360px) and (max-width: 480px) {
			grid-template-columns: 45% 55%;
		}
	}
`;

export default Chat;