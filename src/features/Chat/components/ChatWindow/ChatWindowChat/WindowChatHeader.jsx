import React, { useContext } from 'react';
import { Typography, Avatar } from '@mui/material';
import LabelOutlinedIcon from '@mui/icons-material/LabelOutlined';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import SearchIcon from '@mui/icons-material/Search';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import ViewWeekOutlinedIcon from '@mui/icons-material/ViewWeekOutlined';
import imgCloud from 'resources/img/cloud.jpg';
import { AppContext } from 'context/AppProvider';

export default function WindowChatHeader({ setOpenAddGroupDialog, setOpenAddToGroupDialog }) {
	const { members, selectedRoom } = useContext(AppContext);

	return (
		<div className="chat-window__chat__header">
			<div className="chat-window__chat__header__title">
				<Avatar src={selectedRoom.photoURL || members?.photoURL}>
					{members?.displayName?.charAt(0)}
				</Avatar>
				<div>
					<Typography variant="body1" component="div">
						{selectedRoom.name || members?.displayName || 'Cloud của tôi'}
					</Typography>
					<div>
						{selectedRoom.members.length !== 2 && (
							<span>{`${selectedRoom.members.length} thành viên`}</span>
						)}
						<LabelOutlinedIcon />
					</div>
				</div>
			</div>
			<div className="chat-window__chat__header__actions">
				<span
					title="Thêm bạn vào trò chuyện"
					onClick={() => {
						if (selectedRoom.members.length === 2) {
							setOpenAddGroupDialog(true);
						} else {
							setOpenAddToGroupDialog(true);
						}
					}}
				>
					<GroupAddOutlinedIcon />
				</span>
				<span title="Tìm kiếm tin nhắn">
					<SearchIcon />
				</span>
				<span title="Cuộc gọi video">
					<VideocamOutlinedIcon />
				</span>
				<span title="Thông tin hội thoại">
					<ViewWeekOutlinedIcon />
				</span>
			</div>
		</div>
	);
}
