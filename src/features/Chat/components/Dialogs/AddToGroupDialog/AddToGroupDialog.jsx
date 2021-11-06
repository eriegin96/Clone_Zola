import React, { useContext, useState } from 'react';
import {
	Button,
	Dialog,
	DialogTitle,
	DialogActions,
	IconButton,
	Chip,
	Stack,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { Input } from 'antd';
import ContactList from './ContactList';
import { AuthContext } from 'context/AuthProvider';
import { useFirestoreContactList } from 'hooks/useFirestore';
import { addUserToGroup } from 'firebase/services';
import { AppContext } from 'context/AppProvider';

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

export default function AddToGroupDialog({ open, setOpen }) {
	const { user } = useContext(AuthContext);
	const { selectedRoom } = useContext(AppContext);
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
		setSelectedList([])
	};

	const handleAddToGroup = () => {
		const selectedIds = []
		for (let i = 0; i < selectedList.length; i++) {
			selectedIds.push(selectedList[i].uid)	
		}
		addUserToGroup(selectedRoom.id, selectedIds);
		handleCloseDialog()
	};

	return (
		<div>
			<Dialog
				onClose={handleCloseDialog}
				aria-labelledby="dialog-title"
				open={open}
				className="addToGroup-dialog"
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
					Thêm thành viên
					<IconButton
						aria-label="close"
						onClick={handleCloseDialog}
						className="addToGroup-dialog__close-btn"
					>
						<CloseIcon />
					</IconButton>
				</DialogTitle>
				<div className="addToGroup-dialog__search-box">
					<Input
						size="large"
						placeholder="Nhập tên, số điện thoại, hoặc danh sách số điện thoại"
						prefix={<SearchIcon />}
						style={{ borderRadius: '20px' }}
					/>
					<Stack direction="row" className="addToGroup-dialog__chip-box">
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
				<div className="addToGroup-dialog__add-box">
					{chipActive.all ? (
						<ContactList
							left={contactList}
							right={selectedList}
							setRight={setSelectedList}
						/>
					) : (
						<FormatListBulletedIcon />
					)}
				</div>
				<DialogActions sx={{ padding: '14px' }}>
					<Button
						color="default"
						variant="contained"
						disableElevation
						onClick={handleCloseDialog}
						className="addToGroup-dialog__btn"
					>
						Hủy
					</Button>
					<Button
						disabled={selectedList.length === 0}
						variant="contained"
						disableElevation
						onClick={handleAddToGroup}
						className="addToGroup-dialog__btn"
					>
						Xác nhận
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
