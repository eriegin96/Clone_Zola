import React, { useContext } from 'react';
import { AppContext } from '../../../../context/AppProvider';
import './convList.scss';
import ConvSearch from './ConvSearch';
import ConvListChat from './Chat/ConvListChat';
import ConvListContact from './Contact/ConvListContact';
import ConvListNoti from './Noti/ConvListNoti';
import ConvListTodo from './Todo/ConvListTodo';
import ConvListStar from './Star/ConvListStar';

export default function ConvList() {
	const { activeTab } = useContext(AppContext);
	return (
		<div className="conv-list">
			<ConvSearch />
			{activeTab.chat && <ConvListChat />}
			{activeTab.contact && <ConvListContact />}
			{activeTab.noti && <ConvListNoti />}
			{activeTab.todo && <ConvListTodo />}
			{activeTab.star && <ConvListStar />}
			<div></div>
		</div>
	);
}
