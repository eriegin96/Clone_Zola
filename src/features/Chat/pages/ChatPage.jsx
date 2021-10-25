import React from 'react';
import LogoutDialog from '../components/LogoutDialog';
import SidebarNav from '../components/SidebarNav';
import ChatWindow from '../components/ChatWindow/ChatWindow';
import ResizeHandler from '../components/ResizeHandler';
import './chatPage.scss'

export default function ChatPage() {
	return (
		<div className='chat-page'>
			{/* <LogoutDialog /> */}
			<SidebarNav />
      {/* <ResizeHandler /> */}
			<ChatWindow />
		</div>
	);
}
