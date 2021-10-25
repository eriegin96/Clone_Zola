import React, { useState } from 'react';
import './navBar.scss';
import './Dialogs/navbarDialogs.scss';
import { Box, Stack } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import ContactsIcon from '@mui/icons-material/Contacts';
import ContactsOutlinedIcon from '@mui/icons-material/ContactsOutlined';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import CloudIcon from '@mui/icons-material/Cloud';
import CloudQueueIcon from '@mui/icons-material/CloudQueue';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import SettingsIcon from '@mui/icons-material/Settings';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import NavBarAvatar from './NavBarAvatar';

export default function NavBar() {
	const initialActiveTab = {
		chatTab: false,
		contactTab: false,
		notiTab: false,
		todoTab: false,
		cloudTab: false,
		bookmarkTab: false,
		settingTab: false,
	};
	const [activeTab, setActiveTab] = useState({ ...initialActiveTab, chatTab: true });

	return (
		<React.Fragment>
			<Stack className="navbar">
				<NavBarAvatar />
				<button
					title="Tin nhắn"
					className={activeTab.chatTab ? 'navbar__btn--active' : 'navbar__btn'}
					onClick={() => {
						setActiveTab({ ...initialActiveTab, chatTab: true });
					}}
				>
					{activeTab.chatTab ? (
						<ChatIcon sx={{ fontSize: '30px' }} />
					) : (
						<ChatOutlinedIcon sx={{ fontSize: '30px' }} />
					)}
				</button>
				<button
					title="Danh bạ"
					className={activeTab.contactTab ? 'navbar__btn--active' : 'navbar__btn'}
					onClick={() => {
						setActiveTab({ ...initialActiveTab, contactTab: true });
					}}
				>
					{activeTab.contactTab ? (
						<ContactsIcon sx={{ fontSize: '30px' }} />
					) : (
						<ContactsOutlinedIcon sx={{ fontSize: '30px' }} />
					)}
				</button>
				<button
					title="Thông báo"
					className={activeTab.notiTab ? 'navbar__btn--active' : 'navbar__btn'}
					onClick={() => {
						setActiveTab({ ...initialActiveTab, notiTab: true });
					}}
				>
					{activeTab.notiTab ? (
						<NotificationsIcon sx={{ fontSize: '30px' }} />
					) : (
						<NotificationsNoneIcon sx={{ fontSize: '30px' }} />
					)}
				</button>
				<button
					title="To-Do"
					className={activeTab.todoTab ? 'navbar__btn--active' : 'navbar__btn'}
					onClick={() => {
						setActiveTab({ ...initialActiveTab, todoTab: true });
					}}
				>
					{activeTab.todoTab ? (
						<CheckBoxIcon sx={{ fontSize: '30px' }} />
					) : (
						<CheckBoxOutlinedIcon sx={{ fontSize: '30px' }} />
					)}
				</button>
				<Box sx={{ flexGrow: 1 }} />
				<button
					title="Cloud của tôi"
					className={activeTab.cloudTab ? 'navbar__btn--active' : 'navbar__btn'}
					onClick={() => {
						setActiveTab({ ...initialActiveTab, cloudTab: true });
					}}
				>
					{activeTab.cloudTab ? (
						<CloudIcon sx={{ fontSize: '30px' }} />
					) : (
						<CloudQueueIcon sx={{ fontSize: '30px' }} />
					)}
				</button>
				<button
					title="Đánh dấu"
					className={activeTab.starTab ? 'navbar__btn--active' : 'navbar__btn'}
					onClick={() => {
						setActiveTab({ ...initialActiveTab, starTab: true });
					}}
				>
					{activeTab.starTab ? (
						<StarIcon sx={{ fontSize: '30px' }} />
					) : (
						<StarBorderIcon sx={{ fontSize: '30px' }} />
					)}
				</button>
				<button
					title="Cài đặt"
					className={activeTab.settingTab ? 'navbar__btn--active' : 'navbar__btn'}
					onClick={() => {
						setActiveTab({ ...initialActiveTab, settingTab: true });
					}}
				>
					{activeTab.settingTab ? (
						<SettingsIcon sx={{ fontSize: '30px' }} />
					) : (
						<SettingsOutlinedIcon sx={{ fontSize: '30px' }} />
					)}
				</button>
			</Stack>
		</React.Fragment>
	);
}
