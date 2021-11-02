import React, { useContext } from 'react';
import './convList.scss';
import ConvSearch from './ConvSearch';
import ConvListChat from './Chat/ConvListChat';
import ConvListContact from './Contact/ConvListContact';
import ConvListNoti from './Noti/ConvListNoti';
import ConvListTodo from './Todo/ConvListTodo';
import ConvListStar from './Star/ConvListStar';
import { useFirestoreContactList } from 'hooks/useFirestore';
import { AuthContext } from 'context/AuthProvider';
import { AppContext } from 'context/AppProvider';

export default function ConvList() {
	const { user } = useContext(AuthContext);
	const { activeTab } = useContext(AppContext);
	const contactList = useFirestoreContactList(user.uid);

	return (
		<div className="conv-list">
			<ConvSearch />
			{activeTab.chat && <ConvListChat contactList={contactList}/>}
			{activeTab.contact && <ConvListContact contactList={contactList}/>}
			{activeTab.noti && <ConvListNoti />}
			{activeTab.todo && <ConvListTodo />}
			{activeTab.star && <ConvListStar />}
			<div></div>
		</div>
	);
}
