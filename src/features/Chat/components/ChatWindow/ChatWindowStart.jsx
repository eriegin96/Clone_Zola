import React from 'react';
import { Typography } from '@mui/material';
import ChatWindowCarousel from './Carousel';

export default function ChatWindowStart() {
	return (
		<div className="chat-window__start__wrapper">
			<ChatWindowCarousel />
			<div className="chat-window__start__container">
				<div className="chat-window__start__header">
					<Typography
						variant="h5"
						component="div"
						sx={{ marginBottom: '20px', fontSize: '22px' }}
					>
						Chào mừng đến với <strong>Zola PC!</strong>
					</Typography>
					<Typography variant="body2" component="span">
						Khám phá những tiện ích hỗ trợ làm việc và trò chuyện cùng người thân, bạn
						bè được tối ưu hoá cho máy tính của bạn.
					</Typography>
				</div>
			</div>
		</div>
	);
}
