import React from 'react';
import SidebarNav from '../components/SidebarNav';
import ChatWindow from '../components/ChatWindow';
import './chatPage.scss'
import '../components/Dialogs/dialogs.scss'

export default function ChatPage() {

	return (
		<div className='chat-page'>
			<ChatWindow />
			<SidebarNav />
		</div>
	);
}
