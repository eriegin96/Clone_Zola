import React, { createContext, useContext, useState } from 'react';
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
	const initialActiveChatWindow = { start: false, chat: false, addFriend: false };
	const [activeTab, setActiveTab] = useState({ ...initialActiveTab, chat: true });
	const [activeChatWindow, setActiveChatWindow] = useState({
		...initialActiveChatWindow,
		start: true,
	});

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
			}}
		>
			{children}
		</AppContext.Provider>
	);
}
