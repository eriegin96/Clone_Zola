import React, { useContext, useState } from 'react';
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Avatar,
	Button,
	Divider,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Typography,
} from '@mui/material';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import imgAddFriend from 'resources/img/add-friend.png';
import imgAddGroup from 'resources/img/add-group.png';
import imgCloud from 'resources/img/cloud.jpg';
import { AppContext } from 'context/AppProvider';

export default function BoardContact(props) {
	const { contactList } = props;
	const { setActiveWindow, rooms, selectedRoomId, setSelectedRoomId, setMessages } =
		useContext(AppContext);
	const [activeBtn, setActiveBtn] = useState('addFriend');

	const openChatBox = (i) => {
		const selected = rooms.find((room) => room.members.includes(contactList[i].uid));
		setMessages((prevState) => {
			if (selected.id !== selectedRoomId) return null;
			return prevState;
		});
		setSelectedRoomId(selected.id);
		setActiveWindow('chat');
	};

	return (
		<div className="board__contact">
			<div className="board__contact__add">
				<Button
					variant="text"
					disableRipple
					startIcon={<PersonAddOutlinedIcon />}
					fullWidth
				>
					Thêm bạn bằng số điện thoại
				</Button>
				<Button
					variant="text"
					disableRipple
					fullWidth
					onClick={() => {
						setActiveWindow('addFriend');
						setActiveBtn('addFriend');
					}}
					className={activeBtn === 'addFriend' && 'board__contact__add__btn--active'}
				>
					<img src={imgAddFriend} alt="add friend" />
					<div className="board__contact__add__badge"></div>
					Danh sách kết bạn
				</Button>
				<Button
					variant="text"
					disableRipple
					fullWidth
					onClick={() => {
						setActiveWindow('addGroup');
						setActiveBtn('addGroup');
					}}
					className={activeBtn === 'addGroup' && 'board__contact__add__btn--active'}
				>
					<img src={imgAddGroup} alt="add group" />
					<div className="board__contact__add__badge"></div>
					Danh sách nhóm
				</Button>
				<Divider sx={{ marginBottom: '8px' }} />
				<Typography>Gửi File giữa di động và máy tính</Typography>
				<Button
					variant="text"
					disableRipple
					fullWidth
					onClick={() => {
						setActiveBtn('cloud');
					}}
					className={activeBtn === 'cloud' && 'board__contact__add__btn--active'}
				>
					<img src={imgCloud} alt="cloud" />
					Cloud của tôi
				</Button>
			</div>
			<Divider />
			<div className="board__contact__list-box">
				<Accordion disableGutters>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls="panel1a-content"
						id="panel1a-header"
					>
						<Typography sx={{ fontSize: '15px' }}>
							Bạn bè ({contactList.length})
						</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<List
							sx={{
								width: '100%',
								bgcolor: 'background.paper',
								overflow: 'auto',
							}}
							dense
							component="div"
							role="list"
							className="board__contact__list"
						>
							{contactList.map((user, i) => {
								const labelId = `item-${i}-label`;

								return (
									<ListItem
										key={i}
										role="listitem"
										button
										sx={{ padding: '6px 0 6px 10px', width: '100%' }}
										onClick={() => openChatBox(i)}
									>
										<ListItemIcon>
											<Avatar src={user.photoURL} />
										</ListItemIcon>
										<ListItemText id={labelId} primary={user.displayName} />
									</ListItem>
								);
							})}
						</List>
					</AccordionDetails>
				</Accordion>
			</div>
		</div>
	);
}
