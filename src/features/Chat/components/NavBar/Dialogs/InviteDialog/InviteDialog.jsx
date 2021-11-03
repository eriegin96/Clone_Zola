import React, { useContext, useState } from 'react';
import {
	Button,
	Dialog,
	DialogTitle,
	DialogActions,
	IconButton,
	Typography,
	Chip,
	Stack,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { Input } from 'antd';
import img from 'resources/img/invite-dialog.png';
import ShareList from './ShareList';
import { AuthContext } from 'context/AuthProvider';
import { useFirestoreContactList } from 'hooks/useFirestore';

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

export default function InviteDialog({ open, setOpen }) {
	const { user } = useContext(AuthContext);
	const contactList = useFirestoreContactList(user.uid);
	const initialChipActive = {
		all: false,
		client: false,
		family: false,
		work: false,
		friends: false,
		later: false,
	};
	const [chipActive, setChipActive] = useState({ ...initialChipActive, all: true });
	const [selectedList, setSelectedList] = useState([]);

	const handleCloseDialog = () => {
		setOpen(false);
	};

	return (
		<div>
			<Dialog
				onClose={handleCloseDialog}
				aria-labelledby="dialog-title"
				open={open}
				className="invite-dialog"
				PaperProps={{
					sx: {
						width: '520px',
						maxHeight: 'calc(100% - 20px)',
					},
				}}
			>
				<DialogTitle
					id="dialog-title"
					onClose={handleCloseDialog}
					sx={{
						height: '50px',
						padding: '6px 8px 6px 16px',
						fontSize: '17px',
						fontWeight: 600,
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
					}}
				>
					Mời bạn bè
					<IconButton
						aria-label="close"
						onClick={handleCloseDialog}
						className="invite-dialog__close-btn"
					>
						<CloseIcon />
					</IconButton>
				</DialogTitle>
				<div className="invite-dialog__search-box">
					<Input
						size="large"
						placeholder="Tìm kiếm hội thoại cần chia sẻ"
						prefix={<SearchIcon />}
						style={{ borderRadius: '20px' }}
					/>
					<Stack direction="row" className="invite-dialog__chip-box">
						{cates.map((cate, i) => (
							<Chip
								key={i}
								label={cate.label}
								color={chipActive[cate.type] ? 'primary' : 'default'}
								size="small"
								sx={{ margin: '0 3px' }}
								onClick={() => {
									const active = { ...initialChipActive };
									active[cate.type] = true;
									setChipActive(active);
								}}
							/>
						))}
					</Stack>
				</div>
				<div className="invite-dialog__share-box">
					{chipActive.all ? (
						<ShareList
							left={contactList}
							right={selectedList}
							setRight={setSelectedList}
						/>
					) : (
						<FormatListBulletedIcon />
					)}
				</div>
				<div className="invite-dialog__content-box">
					<Typography variant="body2" component="span">
						Nội dung chia sẻ
					</Typography>
					<div className="invite-dialog__img-box">
						<img src={img} alt="" className="invite-dialog__img" />
						<div>
							<div>Link</div>
							<div>Zola cho máy tính – Windows, Mac, Ubuntu</div>
						</div>
					</div>
					<Input
						placeholder="Thêm mô tả..."
						bordered={false}
						style={{ padding: '10px 10px 0' }}
					/>
				</div>
				<DialogActions sx={{ padding: '14px' }}>
					<Button
						color="default"
						variant="contained"
						disableElevation
						onClick={handleCloseDialog}
						className="invite-dialog__btn"
					>
						Hủy
					</Button>
					<Button
						disabled={selectedList.length === 0}
						variant="contained"
						disableElevation
						onClick={handleCloseDialog}
						className="invite-dialog__btn"
					>
						Chia sẻ
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
