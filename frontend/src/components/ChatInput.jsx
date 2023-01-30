import React, { useState } from "react";
import styled from "styled-components";
import Picker, { EmojiClickData } from "emoji-picker-react";
import { IoMdSend } from "react-icons/io";
import { BsEmojiSmileFill } from "react-icons/bs";

function ChatInput({handleSendMsg}) {
	const [showEmojiPicker, setShowEmojiPicker] = useState(false);
	const [msg, setMsg] = useState("");

	const handleEmojiPickerHideShow = () => {
		setShowEmojiPicker(!showEmojiPicker);
	}

	const handleEmojiClick = (EmojiClickData, event) => {
		let message = msg;
		message += EmojiClickData.emoji;

		setMsg(message);
	}

	const sendChat = (event) => {
		event.preventDefault();

		if(msg.length > 0) {
			handleSendMsg(msg);
			setMsg('');
		}
	}

	return (
		<Container>
			<div className="button-container">
				<div className="emoji">
					<BsEmojiSmileFill 
						onClick={handleEmojiPickerHideShow}/>
					
					{
						showEmojiPicker && <Picker onEmojiClick={ handleEmojiClick}/>
					}
				</div>
			</div>
			<form 
				className="input-container"
				onSubmit={(e) => {
					sendChat(e)
				}}
			>
				<input 
					type="text" 
					placeholder="type your message here" 
					value={msg} 
					onChange={(e) => {setMsg(e.target.value)}}/>
				<button className="submit">
					<IoMdSend />
				</button>
			</form>
		</Container>
	)
}

const Container = styled.div`
	display: grid;
	grid-template-columns: 5% 95%;
	align-items: center;
	background: #080420;
	padding: 0 2rem;

	.button-container {
		display: flex;
		align-items: center;
		color: white;
		gap: 1rem;

		.emoji {
			position: relative;

			svg {
				font-size: 1.5rem;
				color: #ffff00c8;
				cursor: pointer;
			}

			.EmojiPickerReact {
				position: absolute;
				top: -30rem;
				background-color: #080420;
				box-shadow: 0 5px 10px #9a86f3;
				border-color: #9a86f3;

				.emoji-category-content {
					button {
						filter: contrast(0);
					}
				}

				.epr-search {
					background-color: transparent;
					border-color: #9a86f3;
				}

				.epr-emoji-category-label{
					background-color: #080420;
				}
			}
		}
	}

	.input-container {
		width: 100%;
		border-radius: 2rem;
		display: flex;
		align-content: center;
		gap: 2rem;
		background-color: #ffffff34;

		input {
			width: 100%;
			background-color: transparent;
			color: white;
			border: none;
			padding-left: 1rem;
			font-size: 1.2rem;

			&::selection {
				background-color: #9a86f3;
			}

			&::focus {
				outline: none;
			}
		}

		button {
			padding: 0.3rem 2rem;
			border-radius: 2rem;
			display: flex;
			justify-content: center;
			align-items: center;
			background-color: #9a86f3;
			border: none;

			svg {
				font-size: 2rem;
				color: white;
			}

			@media screen and (min-width: 720px) and (max-width: 1080px) {
				padding: 0.3rem 1rem;
				
				svg {
					font-size: 1rem;
				}
			}
		}
	}

	@media screen and (min-width: 720px) and (max-width: 1080px) {
		padding: 0.1rem;
		gap: 1rem;
	}
`;

export default ChatInput;