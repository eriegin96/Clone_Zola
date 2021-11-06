import React, { useContext } from 'react';
import { Avatar, Typography, Paper, Grid, Button, AvatarGroup } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import CloseIcon from '@mui/icons-material/Close';
import imgAddFriend from 'resources/img/add-friend.png';
import imgAddGroup from 'resources/img/add-group.png';
import { AppContext } from 'context/AppProvider';
import { AuthContext } from 'context/AuthProvider';
import { addFriend as addToContact, createRooms } from 'firebase/services';

export default function ChatWindowAdd({ addFriend, suggestList }) {
	const { user } = useContext(AuthContext);
	const { groupList } = useContext(AppContext);

	const handleCloseSuggest = (i) => {
		suggestList.splice(i,1)
		return suggestList
	};

	const handleClick = (i) => {
		addToContact(user.uid, suggestList[i].uid);
		createRooms(user.uid, suggestList[i].uid);
	};

	return (
		<div className="chat-window__add">
			<div className="chat-window__add__header">
				<img src={addFriend ? imgAddFriend : imgAddGroup} alt="add" />
				<div className="chat-window__add__badge"></div>
				<Typography variant="h5" component="span">
					Danh sách {addFriend ? 'kết bạn' : 'nhóm'}
				</Typography>
			</div>
			<div className="chat-window__add__container">
				<div className="chat-window__add__title">
					<Typography variant="body1" component="span">
						{addFriend ? `Gợi ý kết bạn (${suggestList.length})` : 'Tất cả (18)'}
						{!addFriend && <ArrowDropDownIcon />}
					</Typography>
					{!addFriend && (
						<div>
							<ImportExportIcon />
							Theo tên nhóm (A-Z)
						</div>
					)}
				</div>
				{addFriend ? (
					<div className="chat-window__add__suggest-friend-list">
						<Grid container spacing={2}>
							{suggestList.map((item, i) => (
								<Grid item key={i} xs={12} md={6}>
									<Paper elevation={0} className="chat-window__add__suggest-item">
										<Avatar
											sx={{ width: 96, height: 96 }}
											src={item.photoURL}
										/>
										<div>{item.displayName}</div>
										<div>Từ số điện thoại</div>
										<div>Chưa có nhóm chung</div>
										<Button variant="outlined" onClick={() => handleClick(i)}>
											KẾT BẠN
										</Button>
										<CloseIcon
											className="chat-window__add__close-suggest"
											onClick={() => handleCloseSuggest(i)}
										/>
									</Paper>
								</Grid>
							))}
						</Grid>
					</div>
				) : (
					<div className="chat-window__add__group-list">
						<Grid container spacing={2}>
							{groupList.map((item, i) => (
								<Grid item key={i} xs={12} md={6}>
									<Paper elevation={0} className="chat-window__add__group-item">
										<AvatarGroup max={4}>
											<Avatar />
											<Avatar />
											<Avatar />
											<Avatar />
											<Avatar />
										</AvatarGroup>
										<div>Nhóm {i}</div>
										<div>5 thành viên</div>
									</Paper>
								</Grid>
							))}
						</Grid>
					</div>
				)}
			</div>
		</div>
	);
}
