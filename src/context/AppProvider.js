import { createRooms } from 'firebase/services';
import { useFirestore, useFirestoreObject } from 'hooks/useFirestore';
import React, { createContext, useContext, useMemo, useState } from 'react';
import { AuthContext } from './AuthProvider';

export const AppContext = createContext();

export default function AppProvider({ children }) {
	const { user } = useContext(AuthContext);
	const [isVN, setIsVN] = useState(true);
	const [selectedRoomId, setSelectedRoomId] = useState('');

	// Navbar Tab Selection
	const initialActiveTab = {
		chat: false,
		contact: false,
		noti: false,
		todo: false,
		bookmark: false,
		setting: false,
	};
	const [activeTab, setActiveTab] = useState({ ...initialActiveTab, chat: true });

	// Chat Window Selection
	const initialActiveChatWindow = {
		start: false,
		chat: false,
		addFriend: false,
		addGroup: false,
	};
	const [activeChatWindow, setActiveChatWindow] = useState({
		...initialActiveChatWindow,
		start: true,
	});

	// Conversation Selection
	const initialActiveConversation = {
		user: false,
		cloud: false,
		zalopay: false,
		gamecenter: false,
	};
	const [activeConversation, setActiveConversation] = useState({
		...initialActiveConversation,
		cloud: true,
	});

	// ChatWindowAdd Suggest List + Group List
	const suggestCondition = useMemo(() => {
		if (user.friends) {
			return {
				fieldName: 'uid',
				operator: 'not-in',
				compareValue: [...user.friends, user.uid],
			};
		}
	}, [user]);
	const suggestList = useFirestore('users', suggestCondition);

	const groupList = useMemo(() => {
		const arr = [];
		for (let i = 0; i < 18; i++) {
			arr.push(i);
		}
		return arr;
	}, []);

	const contactCondition = useMemo(() => {
		return {
			fieldName: 'uid',
			operator: 'in',
			compareValue: user.friends,
		};
	}, [user]);
	const contactList = useFirestore('users', contactCondition);

	// Room
	const roomsCondition = useMemo(() => {
		return {
			fieldName: 'members',
			operator: 'array-contains',
			compareValue: user.uid,
		};
	}, [user]);
	const rooms = useFirestore('rooms', roomsCondition);
	const selectedRoom = useMemo(
		() => rooms.find((room) => room.id === selectedRoomId) || {},
		[rooms, selectedRoomId]
	);

	// Members
	const membersCondition = useMemo(() => {
		const newArr = selectedRoom?.members?.slice();
		const index = newArr?.indexOf(user.uid);
		newArr?.splice(index, 1);
		return {
			fieldName: 'uid',
			operator: 'in',
			compareValue: newArr,
			// compareValue: selectedRoom.members,
		};
	}, [selectedRoom.members]);
	const members = useFirestoreObject('users', membersCondition);

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
				initialActiveConversation,
				activeConversation,
				setActiveConversation,
				contactList,
				suggestList,
				groupList,
				rooms,
				selectedRoom,
				selectedRoomId,
				setSelectedRoomId,
				members,
			}}
		>
			{children}
		</AppContext.Provider>
	);
}
