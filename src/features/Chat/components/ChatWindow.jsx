import React, { useContext } from 'react';
import './ChatWindow/chatWindow.scss';
import { AppContext } from '../../../context/AppProvider';
import ChatWindowStart from './ChatWindow/ChatWindowStart';
import ChatWindowChat from './ChatWindow/ChatWindowChat';
import ChatWindowAdd from './ChatWindow/ChatWindowAdd';

export default function ChatWindow() {
	const { activeChatWindow } = useContext(AppContext);
	const {start, chat, addFriend, addGroup} = activeChatWindow

	return (
		<div className="chat-window">
			{start && <ChatWindowStart />}
			{chat && <ChatWindowChat />}
			{(addFriend || addGroup) && <ChatWindowAdd add={addFriend}/>}
		</div>
	);
}
