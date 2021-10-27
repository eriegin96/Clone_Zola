import React, { useContext } from 'react';
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
import CloudQueueIcon from '@mui/icons-material/CloudQueue';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import NavBarAvatar from './NavBarAvatar';
import NavBarSetting from './NavBarSetting';
import { AppContext } from '../../../../context/AppProvider';

export default function NavBar() {
	const {
		initialActiveTab,
		activeTab,
		setActiveTab,
		initialActiveChatWindow,
		setActiveChatWindow,
	} = useContext(AppContext);

	return (
		<React.Fragment>
			<Stack className="navbar">
				<NavBarAvatar />
				<button
					title="Tin nhắn"
					className={activeTab.chat ? 'navbar__btn--active' : 'navbar__btn'}
					onClick={() => {
						setActiveTab({ ...initialActiveTab, chat: true });
					}}
				>
					{activeTab.chat ? (
						<ChatIcon sx={{ fontSize: '30px' }} />
					) : (
						<ChatOutlinedIcon sx={{ fontSize: '30px' }} />
					)}
				</button>
				<button
					title="Danh bạ"
					className={activeTab.contact ? 'navbar__btn--active' : 'navbar__btn'}
					onClick={() => {
						setActiveTab({ ...initialActiveTab, contact: true });
						setActiveChatWindow({ ...initialActiveChatWindow, addFriend: true });
					}}
				>
					{activeTab.contact ? (
						<ContactsIcon sx={{ fontSize: '30px' }} />
					) : (
						<ContactsOutlinedIcon sx={{ fontSize: '30px' }} />
					)}
				</button>
				<button
					title="Thông báo"
					className={activeTab.noti ? 'navbar__btn--active' : 'navbar__btn'}
					onClick={() => {
						setActiveTab({ ...initialActiveTab, noti: true });
					}}
				>
					{activeTab.noti ? (
						<NotificationsIcon sx={{ fontSize: '30px' }} />
					) : (
						<NotificationsNoneIcon sx={{ fontSize: '30px' }} />
					)}
				</button>
				<button
					title="To-Do"
					className={activeTab.todo ? 'navbar__btn--active' : 'navbar__btn'}
					onClick={() => {
						setActiveTab({ ...initialActiveTab, todo: true });
					}}
				>
					{activeTab.todo ? (
						<CheckBoxIcon sx={{ fontSize: '30px' }} />
					) : (
						<CheckBoxOutlinedIcon sx={{ fontSize: '30px' }} />
					)}
				</button>
				<Box sx={{ flexGrow: 1 }} />
				<button
					title="Cloud của tôi"
					className={activeTab.cloud ? 'navbar__btn--active' : 'navbar__btn'}
					onClick={() => {
						setActiveTab({ ...initialActiveTab, chat: true });
						setActiveChatWindow({ ...initialActiveChatWindow, chat: true });
					}}
				>
					<CloudQueueIcon sx={{ fontSize: '30px' }} />
				</button>
				<button
					title="Đánh dấu"
					className={activeTab.star ? 'navbar__btn--active' : 'navbar__btn'}
					onClick={() => {
						setActiveTab({ ...initialActiveTab, star: true });
					}}
				>
					{activeTab.star ? (
						<StarIcon sx={{ fontSize: '30px' }} />
					) : (
						<StarBorderIcon sx={{ fontSize: '30px' }} />
					)}
				</button>
				<NavBarSetting
					initialActiveTab={initialActiveTab}
					activeTab={activeTab}
					setActiveTab={setActiveTab}
				/>
			</Stack>
		</React.Fragment>
	);
}
