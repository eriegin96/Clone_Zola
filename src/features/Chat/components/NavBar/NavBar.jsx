import React, { useContext, useState } from 'react';
import './navBar.scss';
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
import LogoutDialog from '../Dialogs/LogoutDialog/LogoutDialog';
import AccountDialog from '../Dialogs/AccountDialog/AccountDialog';
import { AppContext } from 'context/AppProvider';

export default function NavBar() {
	const { activeTab, setActiveTab, setActiveWindow } = useContext(AppContext);
	const [openAccountDialog, setOpenAccountDialog] = useState(false);
	const [openLogoutDialog, setOpenLogoutDialog] = useState(false);

	return (
		<React.Fragment>
			<Stack className="navbar">
				<NavBarAvatar
					setOpenAccountDialog={setOpenAccountDialog}
					setOpenLogoutDialog={setOpenLogoutDialog}
				/>
				<button
					title="Tin nhắn"
					className={activeTab === 'chat' ? 'navbar__btn--active' : 'navbar__btn'}
					onClick={() => {
						setActiveTab('chat');
						setActiveWindow('start');
					}}
				>
					{activeTab === 'chat' ? (
						<ChatIcon sx={{ fontSize: '30px' }} />
					) : (
						<ChatOutlinedIcon sx={{ fontSize: '30px' }} />
					)}
				</button>
				<button
					title="Danh bạ"
					className={activeTab === 'contact' ? 'navbar__btn--active' : 'navbar__btn'}
					onClick={() => {
						setActiveTab('contact');
						setActiveWindow('addFriend');
					}}
				>
					{activeTab === 'contact' ? (
						<ContactsIcon sx={{ fontSize: '30px' }} />
					) : (
						<ContactsOutlinedIcon sx={{ fontSize: '30px' }} />
					)}
				</button>
				<button
					title="Thông báo"
					className={activeTab === 'noti' ? 'navbar__btn--active' : 'navbar__btn'}
					onClick={() => {
						setActiveTab('noti');
					}}
				>
					{activeTab === 'noti' ? (
						<NotificationsIcon sx={{ fontSize: '30px' }} />
					) : (
						<NotificationsNoneIcon sx={{ fontSize: '30px' }} />
					)}
				</button>
				<button
					title="To-Do"
					className={activeTab === 'todo' ? 'navbar__btn--active' : 'navbar__btn'}
					onClick={() => {
						setActiveTab('todo');
					}}
				>
					{activeTab === 'todo' ? (
						<CheckBoxIcon sx={{ fontSize: '30px' }} />
					) : (
						<CheckBoxOutlinedIcon sx={{ fontSize: '30px' }} />
					)}
				</button>
				<Box sx={{ flexGrow: 1 }} />
				<button
					title="Cloud của tôi"
					className={activeTab === 'cloud' ? 'navbar__btn--active' : 'navbar__btn'}
					onClick={() => {
						setActiveTab('chat');
						setActiveWindow('chat');
					}}
				>
					<CloudQueueIcon sx={{ fontSize: '30px' }} />
				</button>
				<button
					title="Đánh dấu"
					className={activeTab === 'star' ? 'navbar__btn--active' : 'navbar__btn'}
					onClick={() => {
						setActiveTab('star');
					}}
				>
					{activeTab === 'star' ? (
						<StarIcon sx={{ fontSize: '30px' }} />
					) : (
						<StarBorderIcon sx={{ fontSize: '30px' }} />
					)}
				</button>
				<NavBarSetting
					setOpenAccountDialog={setOpenAccountDialog}
					setOpenLogoutDialog={setOpenLogoutDialog}
				/>
			</Stack>
			<AccountDialog open={openAccountDialog} setOpen={setOpenAccountDialog} />
			<LogoutDialog open={openLogoutDialog} setOpen={setOpenLogoutDialog} />
		</React.Fragment>
	);
}
