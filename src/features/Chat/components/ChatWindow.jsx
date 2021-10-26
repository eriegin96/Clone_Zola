import React, { useContext } from 'react';
import './ChatWindow/chatWindow.scss';
import { AppContext } from '../../../context/AppProvider';
import ChatWindowStart from './ChatWindow/ChatWindowStart';
import ChatWindowChat from './ChatWindow/ChatWindowChat';
import ChatWindowAddFriend from './ChatWindow/ChatWindowAddFriend';

export default function ChatWindow() {
	const { activeChatWindow } = useContext(AppContext);

	return (
		<div className="chat-window">
			{activeChatWindow.start && <ChatWindowStart />}
			{activeChatWindow.chat && <ChatWindowChat />}
			{activeChatWindow.addFriend && <ChatWindowAddFriend />}
		</div>
	);
}
