import React, { useContext } from 'react';
import { Typography, Avatar } from '@mui/material';
import LabelOutlinedIcon from '@mui/icons-material/LabelOutlined';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import SearchIcon from '@mui/icons-material/Search';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import ViewWeekOutlinedIcon from '@mui/icons-material/ViewWeekOutlined';
import imgCloud from 'resources/img/cloud.jpg';
import { AppContext } from 'context/AppProvider';

export default function WindowChatHeader() {
	const { members } = useContext(AppContext);

	return (
		<div className="chat-window__chat__header">
			<div className="chat-window__chat__header__title">
				<Avatar src={members?.photoURL}>{members?.displayName?.charAt(0)}</Avatar>
				<div>
					<Typography variant="body1" component="div">
						{members?.displayName || 'Cloud của tôi'}
					</Typography>
					<LabelOutlinedIcon />
				</div>
			</div>
			<div className="chat-window__chat__header__actions">
				<span title="Thêm bạn vào trò chuyện">
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
