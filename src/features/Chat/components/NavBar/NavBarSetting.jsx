import React, { useState } from 'react';
import { Menu, MenuItem, Divider, Tooltip } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';


export default function NavBarSetting({setOpenAccountDialog, setOpenLogoutDialog}) {
	const [isActive, setIsActive] = useState(false);
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);

	const handleClick = (event) => {
		setIsActive(true);
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setIsActive(false);
		setAnchorEl(null);
	};

	return (
		<>
			<button
				title="Cài đặt"
				className={isActive ? 'navbar__btn--active' : 'navbar__btn'}
				onClick={handleClick}
			>
				{isActive ? (
					<SettingsIcon sx={{ fontSize: '30px' }} />
				) : (
					<SettingsOutlinedIcon sx={{ fontSize: '30px' }} />
				)}
			</button>
			<Menu
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				onClick={handleClose}
				PaperProps={{
					elevation: 3,
					sx: {
						width: '158px',
					},
				}}
				transformOrigin={{ horizontal: 'right', vertical: 'bottom' }}
				anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
			>
				<MenuItem
					className="navbar__setting__menu__item"
					onClick={() => setOpenAccountDialog(true)}
				>
					<PermIdentityIcon fontSize="small" />
					<span className="navbar__setting__text">Tài khoản</span>
				</MenuItem>
				<MenuItem className="navbar__setting__menu__item">
					<SettingsOutlinedIcon fontSize="small" />
					<span className="navbar__setting__text">Cài đặt</span>
				</MenuItem>
				<Divider variant="middle" sx={{ margin: '4px 16px !important' }} />
				<Tooltip
					title={
						<MenuItem className="navbar__setting__menu__item" sx={{ fontSize: '13px' }}>
							<span className="navbar__setting__text">Quản lý file</span>
						</MenuItem>
					}
					placement="right"
				>
					<MenuItem className="navbar__setting__menu__item navbar__setting__menu__save">
						<SaveOutlinedIcon fontSize="small" />
						<span className="navbar__setting__text">Lưu trữ</span>
						<ChevronRightOutlinedIcon
							fontSize="small"
							className="navbar__setting__arrow-right"
						/>
					</MenuItem>
				</Tooltip>
				<MenuItem className="navbar__setting__menu__item">
					<LanguageOutlinedIcon fontSize="small" />
					<span className="navbar__setting__text">Ngôn ngữ</span>
					<ChevronRightOutlinedIcon
						fontSize="small"
						className="navbar__setting__arrow-right"
					/>
				</MenuItem>
				<MenuItem className="navbar__setting__menu__item">
					<InfoOutlinedIcon fontSize="small" />
					<span className="navbar__setting__text">Giới thiệu</span>
					<ChevronRightOutlinedIcon
						fontSize="small"
						className="navbar__setting__arrow-right"
					/>
				</MenuItem>
				<Divider variant="middle" sx={{ margin: '4px 16px !important' }} />
				<MenuItem
					className="navbar__setting__menu__item"
					onClick={() => {
						setOpenLogoutDialog(true);
					}}
				>
					<div className="navbar__setting__logout">Đăng xuất</div>
				</MenuItem>
			</Menu>
		</>
	);
}
