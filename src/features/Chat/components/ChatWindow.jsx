import React, { useContext } from 'react';
import './ChatWindow/chatWindow.scss';
import ChatWindowStart from './ChatWindow/ChatWindowStart/ChatWindowStart';
import ChatWindowChat from './ChatWindow/ChatWindowChat/ChatWindowChat';
import ChatWindowAdd from './ChatWindow/ChatWindowAdd/ChatWindowAdd';
import { AuthContext } from 'context/AuthProvider';
import { AppContext } from 'context/AppProvider';
import { useFirestoreSuggestList } from 'hooks/useFirestore';

export default function ChatWindow() {
	const { user } = useContext(AuthContext);
	const { activeWindow } = useContext(AppContext);
	const suggestList = useFirestoreSuggestList(user.uid);

	return (
		<div className="chat-window">
			{activeWindow === 'start' && <ChatWindowStart />}
			{activeWindow === 'chat' && <ChatWindowChat />}
			{(activeWindow === 'addFriend' || activeWindow === 'addGroup') && (
				<ChatWindowAdd addFriend={activeWindow === 'addFriend'} suggestList={suggestList} />
			)}
		</div>
	);
}
