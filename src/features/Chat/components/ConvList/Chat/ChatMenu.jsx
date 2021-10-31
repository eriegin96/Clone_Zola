import React from 'react';
import { Menu, MenuItem, Divider } from '@mui/material';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';

export default function ChatMenu(props) {
	const { anchorEl, open, handleClose, i } = props;

	return (
		<Menu
			anchorEl={anchorEl[i]}
			open={open[i] ?? false}
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
				<span className="conv-list__chat__text">Đánh dấu chưa đọc</span>
			</MenuItem>
			<Divider variant="middle" sx={{ margin: '4px 16px !important' }} />
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
				<span className="conv-list__chat__text">Tin nhắn tự xóa</span>
				<ChevronRightOutlinedIcon
					fontSize="small"
					className="conv-list__chat__arrow-right"
				/>
			</MenuItem>
			<Divider variant="middle" sx={{ margin: '4px 16px !important' }} />
			<MenuItem className="conv-list__chat__menu__item">
				<div className="conv-list__chat__delete">Xóa hội thoại</div>
			</MenuItem>
			<Divider variant="middle" sx={{ margin: '4px 16px !important' }} />
			<MenuItem className="conv-list__chat__menu__item">
				<span className="conv-list__chat__text">Báo xấu</span>
			</MenuItem>
		</Menu>
	);
}
