import React from 'react';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	IconButton,
	Typography,
	Divider,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { signOut } from 'firebase/auth';
import { auth } from 'firebase/config';

export default function LogoutDialog({ open, setOpen }) {
	const logout = () => {
		signOut(auth);
	};

	const handleCloseDialog = () => {
		setOpen(false);
	};

	return (
		<Dialog
			onClose={handleCloseDialog}
			open={open}
			className="logout-dialog"
			PaperProps={{
				sx: {
					width: '376px',
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
				Xác nhận
				<IconButton aria-label="close" onClick={handleCloseDialog}>
					<CloseIcon />
				</IconButton>
			</DialogTitle>
			<Divider />
			<DialogContent>
				<Typography variant="body1" component="span" sx={{ fontSize: '15px' }}>
					Bạn có muốn đăng xuất khỏi Zalo?
				</Typography>
			</DialogContent>
			<DialogActions sx={{ padding: '14px' }}>
				<Button
					color="default"
					variant="contained"
					disableElevation
					onClick={handleCloseDialog}
					sx={{ fontWeight: 600 }}
				>
					Không
				</Button>
				<Button
					color="primary"
					variant="contained"
					disableElevation
					onClick={logout}
					sx={{ fontWeight: 600 }}
				>
					Đăng xuất
				</Button>
			</DialogActions>
		</Dialog>
	);
}
