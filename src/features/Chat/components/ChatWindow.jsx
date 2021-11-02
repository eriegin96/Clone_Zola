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
	const { activeChatWindow } = useContext(AppContext);
	const { start, chat, addFriend, addGroup } = activeChatWindow;
	const suggestList = useFirestoreSuggestList(user.uid);

	return (
		<div className="chat-window">
			{start && <ChatWindowStart />}
			{chat && <ChatWindowChat />}
			{(addFriend || addGroup) && (
				<ChatWindowAdd addFriend={addFriend} suggestList={suggestList} />
			)}
		</div>
	);
}
