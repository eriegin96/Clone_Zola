import React, { useContext, useState } from 'react';
import {
	Chip,
	Divider,
	List,
	ListItem,
	ListItemIcon,
	Avatar,
	ListItemText,
	IconButton,
	Accordion,
	Typography,
	AccordionDetails,
	Button,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import SettingsApplicationsOutlinedIcon from '@mui/icons-material/SettingsApplicationsOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import img from '../../../../../resources/img/conv-list/label.png';
import { AppContext } from '../../../../../context/AppProvider';
import ChatMenu from './ChatMenu';

const cates = [
	{
		label: 'Tất cả',
		type: 'all',
	},
	{
		label: 'Khách hàng',
		type: 'client',
	},
	{
		label: 'Gia đình',
		type: 'family',
	},
	{
		label: 'Công việc',
		type: 'work',
	},
	{
		label: 'Bạn bè',
		type: 'friends',
	},
	{
		label: 'Trả lời sau',
		type: 'later',
	},
];

const AccordionSummary = styled((props) => <MuiAccordionSummary {...props} />)(() => ({
	flexDirection: 'row-reverse',
	'& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
		transform: 'rotate(90deg)',
	},
}));

export default function ConvListChat() {
	const { recentChatList, initialActiveChatWindow, setActiveChatWindow } = useContext(AppContext);
	const initialActiveCate = {
		all: false,
		client: false,
		family: false,
		work: false,
		friends: false,
		later: false,
	};
	const [activeCate, setActiveCate] = useState({ ...initialActiveCate, all: true });
	const [height, setHeight] = useState('48px');
	const [anchorEl, setAnchorEl] = useState(() => Array(recentChatList.length).fill(null));
	const [open, setOpen] = useState(() => Array(recentChatList.length).fill(false));

	const handleOpen = (event, i) => {
		const newAnchorEl = [...anchorEl];
		newAnchorEl[i] = event.currentTarget;
		setAnchorEl(newAnchorEl);
		open[i] = true;
		setOpen(open);
	};
	const handleClose = (i) => {
		const newAnchorEl = [...anchorEl];
		newAnchorEl[i] = null;
		setAnchorEl(newAnchorEl);
		open[i] = false;
		setOpen(open);
	};

	return (
		<div className="conv-list__chat">
			<div className="conv-list__chat__category">
				<Accordion disableGutters>
					<AccordionSummary
						expandIcon={<ArrowRightIcon sx={{ fontSize: '24px' }} />}
						aria-controls="panel1a-content"
						id="panel1a-header"
						sx={{ padding: '0' }}
						onClick={() => {
							height === '48px' ? setHeight('112px') : setHeight('48px');
						}}
					>
						<Typography sx={{ fontSize: '15px' }}>Phân loại</Typography>
					</AccordionSummary>
					<AccordionDetails>
						{cates.map((cate, i) => (
							<Chip
								key={i}
								label={cate.label}
								color={activeCate[cate.type] ? 'primary' : 'default'}
								size="small"
								onClick={() => {
									const active = { ...initialActiveCate };
									active[cate.type] = true;
									setActiveCate(active);
								}}
								sx={{ margin: '4px 2px' }}
							/>
						))}
						<Chip
							label={<SettingsApplicationsOutlinedIcon />}
							size="small"
							onClick={() => {
								return;
							}}
						/>
					</AccordionDetails>
				</Accordion>
			</div>
			<Divider sx={{ marginTop: '4px' }} />
			<div className="conv-list__chat__list">
				<div className="conv-list__chat__list-header">
					<span>
						Tất cả tin nhắn <ExpandMoreIcon />
					</span>
					<span>Đánh dấu đã đọc</span>
				</div>
				{activeCate.all ? (
					<List
						sx={{
							height: `calc(536px - ${height})`,
							width: '100%',
							bgcolor: 'background.paper',
							overflow: 'auto',
						}}
						dense
						component="div"
						role="list"
						className="conv-list__contact__list"
					>
						{recentChatList.map((value, i) => {
							const labelId = `item-${value}-label`;
							return (
								<React.Fragment key={i}>
									<ListItem
										role="listitem"
										button
										disableRipple
										onClick={() => {
											setActiveChatWindow({
												...initialActiveChatWindow,
												chat: true,
											});
										}}
										secondaryAction={
											<IconButton
												edge="end"
												aria-label="settings"
												disableRipple
												onClick={(e) => handleOpen(e, i)}
											>
												<MoreHorizOutlinedIcon />
											</IconButton>
										}
										sx={{ padding: '10px 0 10px 10px', width: '100%' }}
									>
										<ListItemIcon>
											<Avatar sx={{ width: '48px', height: '48px' }} />
										</ListItemIcon>
										<ListItemText id={labelId} primary={`Mới đây ${value}`} />
									</ListItem>
									<ChatMenu
										anchorEl={anchorEl}
										open={open}
										handleClose={handleClose}
										i={i}
									/>
								</React.Fragment>
							);
						})}
					</List>
				) : (
					<div className="conv-list__chat__list--empty">
						<img src={img} alt="empty" />
						<div>Phân loại hội thoại để ghi nhớ và nhận biết dễ dàng hơn</div>
						<Button variant="contained" color="secondary">
							Thêm hội thoại
						</Button>
					</div>
				)}
			</div>
		</div>
	);
}
