import React, { useContext } from 'react';
import { AppContext } from '../../../../context/AppProvider';
import './convList.scss';
import ConvSearch from './ConvSearch';
import ConvListChat from './ConvListChat';
import ConvListContact from './ConvListContact';
import ConvListNoti from './ConvListNoti';
import ConvListTodo from './ConvListTodo';
import ConvListStar from './ConvListStar';

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
