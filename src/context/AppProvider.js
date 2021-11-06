import React, { createContext, useContext, useMemo, useState } from 'react';
import {
	useFirestore,
	useFirestoreObject,
} from 'hooks/useFirestore';
import { AuthContext } from './AuthProvider';

export const AppContext = createContext();

export default function AppProvider({ children }) {
	const { user } = useContext(AuthContext);
	const [isVN, setIsVN] = useState(true);
	const [selectedRoomId, setSelectedRoomId] = useState('');
	const [messages, setMessages] = useState([]);

	const [activeTab, setActiveTab] = useState('chat');
	const [activeWindow, setActiveWindow] = useState('start');

	const groupList = useMemo(() => {
		const arr = [];
		for (let i = 0; i < 18; i++) {
			arr.push(i);
		}
		return arr;
	}, []);

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
		};
	}, [selectedRoom, user]);
	const members = useFirestoreObject('users', membersCondition);

	return (
		<AppContext.Provider
			value={{
				isVN,
				setIsVN,
				activeTab,
				setActiveTab,
				activeWindow,
				setActiveWindow,
				groupList,
				rooms,
				members,
				selectedRoom,
				selectedRoomId,
				setSelectedRoomId,
				messages,
				setMessages,
			}}
		>
			{children}
		</AppContext.Provider>
	);
}
