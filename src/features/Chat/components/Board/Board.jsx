import React, { useContext } from 'react';
import './board.scss';
import BoardSearch from './BoardSearch';
import BoardChat from './Chat/BoardChat';
import BoardContact from './Contact/BoardContact';
import BoardNoti from './Noti/BoardNoti';
import BoardTodo from './Todo/BoardTodo';
import BoardStar from './Star/BoardStar';
import { useFirestoreContactList } from 'hooks/useFirestore';
import { AuthContext } from 'context/AuthProvider';
import { AppContext } from 'context/AppProvider';

export default function Board() {
	const { user } = useContext(AuthContext);
	const { activeTab } = useContext(AppContext);
	const contactList = useFirestoreContactList(user.uid);

	return (
		<div className="board">
			<BoardSearch />
			{activeTab === 'chat' && <BoardChat contactList={contactList} />}
			{activeTab === 'contact' && <BoardContact contactList={contactList} />}
			{activeTab === 'noti' && <BoardNoti />}
			{activeTab === 'todo' && <BoardTodo />}
			{activeTab === 'star' && <BoardStar />}
			<div></div>
		</div>
	);
}
