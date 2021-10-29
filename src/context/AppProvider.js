import React, { createContext, useContext, useMemo, useState } from 'react';
import { AuthContext } from './AuthProvider';

export const AppContext = createContext();

export default function AppProvider({ children }) {
	// const { user } = useContext(AuthContext);
	const [isVN, setIsVN] = useState(true);
	const initialActiveTab = {
		chat: false,
		contact: false,
		noti: false,
		todo: false,
		bookmark: false,
		setting: false,
	};
	const initialActiveChatWindow = {
		start: false,
		chat: false,
		addFriend: false,
		addGroup: false,
	};
	const [activeTab, setActiveTab] = useState({ ...initialActiveTab, chat: true });
	const [activeChatWindow, setActiveChatWindow] = useState({
		...initialActiveChatWindow,
		start: true,
	});

	// ConvListChat
	const recentChatList = useMemo(() => {
		const arr = [];
		for (let i = 0; i < 20; i++) {
			arr.push(i);
		}
		return arr;
	}, []);

	// ConvListContact
	const contactList = useMemo(() => {
		const arr = [];
		for (let i = 0; i < 20; i++) {
			arr.push(i);
		}
		return arr;
	}, []);

	// ChatWindowAdd
	const suggestList = useMemo(() => {
		const arr = [];
		for (let i = 1; i <= 50; i++) {
			arr.push(i);
		}
		return arr;
	}, []);
	const groupList = useMemo(() => {
		const arr = [];
		for (let i = 0; i < 18; i++) {
			arr.push(i);
		}
		return arr;
	}, []);

	return (
		<AppContext.Provider
			value={{
				isVN,
				setIsVN,
				initialActiveTab,
				activeTab,
				setActiveTab,
				initialActiveChatWindow,
				activeChatWindow,
				setActiveChatWindow,
				recentChatList,
				contactList,
				suggestList,
				groupList,
			}}
		>
			{children}
		</AppContext.Provider>
	);
}
