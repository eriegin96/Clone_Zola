import React, { useContext } from 'react';
import WindowChatHeader from './WindowChatHeader';
import WindowChatContent from './WindowChatContent';
import WindowChatInput from './WindowChatInput';
import { AppContext } from 'context/AppProvider';

export default function ChatWindowChat() {
	const { selectedRoom } = useContext(AppContext);

	return (
		<>
			{selectedRoom.id && (
				<div className="chat-window__chat">
					<WindowChatHeader />
					<div className="chat-window__chat__container">
						<WindowChatContent />
						<WindowChatInput />
					</div>
				</div>
			)}
		</>
	);
}
