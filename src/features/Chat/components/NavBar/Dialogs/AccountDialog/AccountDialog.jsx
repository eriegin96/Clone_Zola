import React, { useContext, useState } from 'react';
import {
	Avatar,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Divider,
	IconButton,
} from '@mui/material';
import { DatePicker, Input, Radio, Space, Typography } from 'antd';
import CloseIcon from '@mui/icons-material/Close';
import { AuthContext } from 'context/AuthProvider';
import { updateUser } from 'firebase/services';
import moment from 'moment';

export default function AccountDialog({ open, setOpen }) {
	const { user } = useContext(AuthContext);
	const [cellValue, setCellValue] = useState(user?.cell);
	const [dateValue, setDateValue] = useState(() => {
		const day = moment(new Date(user?.date)).format('DD/MM/YYYY');
		if (day === 'Invalid date') {
			const defaultDay = moment().format('DD/MM/YYYY');
			return moment(defaultDay, 'DD/MM/YYYY');
		}
		return moment(day, 'DD/MM/YYYY')
	});
	const [genderValue, setGenderValue] = useState(user?.gender);

	const handleUpdate = () => {
		updateUser(user.uid, {
			cell: cellValue,
			date: dateValue,
			gender: genderValue,
		});
		setOpen(false);
	};

	const handleCloseDialog = () => {
		setOpen(false);
	};

	return (
		<Dialog
			onClose={handleCloseDialog}
			open={open}
			className="account-dialog"
			PaperProps={{
				sx: {
					width: '376px',
					maxHeight: 'calc(100% - 20px)',
				},
			}}
		>
			<DialogTitle
				className="account-dialog-title"
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
				Cập nhật thông tin
				<IconButton aria-label="close" onClick={handleCloseDialog}>
					<CloseIcon />
				</IconButton>
			</DialogTitle>
			<Divider />
			<DialogContent>
				<div style={{ textAlign: 'center' }}>
					<Avatar
						src={user.photoURL}
						sx={{ width: 80, height: 80, margin: '0 auto 8px' }}
					>
						{user.displayName.charAt(0)}
					</Avatar>
					<Typography.Title level={5}>{user.displayName}</Typography.Title>
				</div>
				<Space
					direction="vertical"
					size="middle"
					style={{ width: '100%', marginTop: '16px' }}
				>
					<div>
						Số điện thoại đăng ký
						<Input
							value={cellValue}
							style={{ width: '100%' }}
							onChange={(e) => setCellValue(e.target.value)}
						/>
					</div>
					<Space size="large">
						Ngày sinh
						<DatePicker
							placeholder="Ngày sinh"
							defaultValue={dateValue}
							format="DD/MM/YYYY"
							onChange={(date) => setDateValue(date._d)}
						/>
					</Space>
					<Space size="large">
						Giới tính
						<Radio.Group
							onChange={(e) => setGenderValue(e.target.value)}
							value={genderValue}
						>
							<Radio value="male">Nam</Radio>
							<Radio value="female">Nữ</Radio>
						</Radio.Group>
					</Space>
				</Space>
			</DialogContent>
			<DialogActions>
				<Button
					color="default"
					variant="contained"
					disableElevation
					onClick={handleCloseDialog}
					sx={{ fontWeight: 600 }}
				>
					Hủy
				</Button>
				<Button
					color="primary"
					variant="contained"
					disableElevation
					onClick={handleUpdate}
					sx={{ fontWeight: 600 }}
				>
					Cập nhật
				</Button>
			</DialogActions>
		</Dialog>
	);
}
