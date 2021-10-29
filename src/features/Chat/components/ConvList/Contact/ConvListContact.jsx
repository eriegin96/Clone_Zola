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
import imgAddFriend from '../../../../../resources/img/add-friend.png';
import imgAddGroup from '../../../../../resources/img/add-group.png';
import imgCloud from '../../../../../resources/img/cloud.jpg';
import { AppContext } from '../../../../../context/AppProvider';

export default function ConvListContact() {
	const { initialActiveChatWindow, setActiveChatWindow, contactList } = useContext(AppContext);
	const initialActiveBtn = { addFriend: false, addGroup: false, cloud: false };
	const [activeBtn, setActiveBtn] = useState({ ...initialActiveBtn, addFriend: true });

	return (
		<div className="conv-list__contact">
			<div className="conv-list__contact__add">
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
						setActiveChatWindow({ ...initialActiveChatWindow, addFriend: true });
						setActiveBtn({ ...initialActiveBtn, addFriend: true });
					}}
					className={activeBtn.addFriend && 'conv-list__contact__add__btn--active'}
				>
					<img src={imgAddFriend} alt="add friend" />
					<div className="conv-list__contact__add__badge"></div>
					Danh sách kết bạn
				</Button>
				<Button
					variant="text"
					disableRipple
					fullWidth
					onClick={() => {
						setActiveChatWindow({ ...initialActiveChatWindow, addGroup: true });
						setActiveBtn({ ...initialActiveBtn, addGroup: true });
					}}
					className={activeBtn.addGroup && 'conv-list__contact__add__btn--active'}
				>
					<img src={imgAddGroup} alt="add group" />
					<div className="conv-list__contact__add__badge"></div>
					Danh sách nhóm
				</Button>
				<Divider sx={{ marginBottom: '8px' }} />
				<Typography>Gửi File giữa di động và máy tính</Typography>
				<Button
					variant="text"
					disableRipple
					fullWidth
					onClick={() => {
						setActiveBtn({ ...initialActiveBtn, cloud: true });
					}}
					className={activeBtn.cloud && 'conv-list__contact__add__btn--active'}
				>
					<img src={imgCloud} alt="cloud" />
					Cloud của tôi
				</Button>
			</div>
			<Divider />
			<div className="conv-list__contact__list-box">
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
							className="conv-list__contact__list"
						>
							{contactList.map((value) => {
								const labelId = `item-${value}-label`;

								return (
									<ListItem
										key={value}
										role="listitem"
										button
										sx={{ padding: '6px 0 6px 10px', width: '100%' }}
									>
										<ListItemIcon>
											<Avatar />
										</ListItemIcon>
										<ListItemText id={labelId} primary={`Danh bạ ${value}`} />
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
