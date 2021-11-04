import React, { useContext } from 'react';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Divider,
	IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { AppContext } from 'context/AppProvider';

export default function UserNotFoundDialog(props) {
	const { open, setOpen, setOpenRegisterDialog } = props;
	const { isVN } = useContext(AppContext);

	const handleCloseDialog = () => {
		setOpen(false);
	};

	return (
		<Dialog
			onClose={handleCloseDialog}
			open={open}
			PaperProps={{
				sx: {
					width: '376px',
					maxHeight: 'calc(100% - 20px)',
				},
			}}
		>
			<DialogTitle
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
				{isVN ? 'Đăng nhập thất bại' : 'Login failed'}
				<IconButton aria-label="close" onClick={handleCloseDialog}>
					<CloseIcon />
				</IconButton>
			</DialogTitle>
			<Divider />
			<DialogContent>
				{isVN
					? 'Email chưa được đăng ký. Bạn có muốn đăng ký tài khoản mới?'
					: 'Email not found. Register new account?'}
			</DialogContent>
			<DialogActions>
				<Button
					color="default"
					variant="contained"
					disableElevation
					onClick={handleCloseDialog}
					sx={{ fontWeight: 600 }}
				>
					{isVN ? 'Hủy' : 'Cancel'}
				</Button>
				<Button
					color="primary"
					variant="contained"
					disableElevation
					onClick={() => {
						handleCloseDialog();
						setOpenRegisterDialog(true);
					}}
					sx={{ fontWeight: 600 }}
				>
					OK
				</Button>
			</DialogActions>
		</Dialog>
	);
}
