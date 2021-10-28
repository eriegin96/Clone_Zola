import React, { useMemo, useState } from 'react';
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
	Menu,
	MenuItem,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import SettingsApplicationsOutlinedIcon from '@mui/icons-material/SettingsApplicationsOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';

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
	const contactList = useMemo(() => {
		const arr = [];
		for (let i = 0; i < 20; i++) {
			arr.push(i);
		}
		return arr;
	}, []);
	const [anchorEl, setAnchorEl] = useState(() => Array(contactList.length).fill(null));
	const [open, setOpen] = useState(() => Array(contactList.length).fill(false));

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
					{contactList.map((value, i) => {
						const labelId = `item-${value}-label`;
						return (
							<React.Fragment key={i}>
								<ListItem
									role="listitem"
									button
									disableRipple
									secondaryAction={
										<IconButton
											edge="end"
											aria-label="comments"
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
									<ListItemText id={labelId} primary={`Danh bạ ${value}`} />
								</ListItem>
								<Menu
									anchorEl={anchorEl[i]}
									open={open[i]}
									onClose={() => handleClose(i)}
									onClick={() => handleClose(i)}
									PaperProps={{
										elevation: 2,
										sx: {
											width: '158px',
										},
									}}
									transformOrigin={{ horizontal: 'left', vertical: 'bottom' }}
									anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
								>
									<MenuItem className="conv-list__chat__menu__item">
										<span className="conv-list__chat__text">Phân loại {i}</span>
										<ChevronRightOutlinedIcon
											fontSize="small"
											className="conv-list__chat__arrow-right"
										/>
									</MenuItem>
									<MenuItem className="conv-list__chat__menu__item">
										<span className="conv-list__chat__text">
											Đánh dấu chưa đọc
										</span>
									</MenuItem>
									<Divider
										variant="middle"
										sx={{ margin: '4px 16px !important' }}
									/>
									<MenuItem className="conv-list__chat__menu__item conv-list__chat__menu__save">
										<span className="conv-list__chat__text">Thêm vào nhóm</span>
									</MenuItem>
									<MenuItem className="conv-list__chat__menu__item">
										<span className="conv-list__chat__text">Tắt thông báo</span>
										<ChevronRightOutlinedIcon
											fontSize="small"
											className="conv-list__chat__arrow-right"
										/>
									</MenuItem>
									<MenuItem className="conv-list__chat__menu__item">
										<span className="conv-list__chat__text">Ẩn trò chuyện</span>
									</MenuItem>
									<MenuItem className="conv-list__chat__menu__item">
										<span className="conv-list__chat__text">
											Tin nhắn tự xóa
										</span>
										<ChevronRightOutlinedIcon
											fontSize="small"
											className="conv-list__chat__arrow-right"
										/>
									</MenuItem>
									<Divider
										variant="middle"
										sx={{ margin: '4px 16px !important' }}
									/>
									<MenuItem className="conv-list__chat__menu__item">
										<div className="conv-list__chat__delete">Xóa hội thoại</div>
									</MenuItem>
									<Divider
										variant="middle"
										sx={{ margin: '4px 16px !important' }}
									/>
									<MenuItem className="conv-list__chat__menu__item">
										<span className="conv-list__chat__text">Báo xấu</span>
									</MenuItem>
								</Menu>
							</React.Fragment>
						);
					})}
				</List>
			</div>
		</div>
	);
}
