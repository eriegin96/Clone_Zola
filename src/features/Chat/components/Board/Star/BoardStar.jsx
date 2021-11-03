import React from 'react';
import { Typography } from '@mui/material';
import img from 'resources/img/board/star.png';

export default function BoardStar() {
	return (
		<div>
			<Typography
				variant="h6"
				component="div"
				sx={{ marginTop: '14px', padding: '0 0 7px 14px' }}
			>
				Tin Đánh Dấu
			</Typography>
			<div className='board__star__img-box'>
				<img src={img} alt="star" className='board__star__img'/>
				<Typography variant="body2" component="p">
					Đánh dấu tin nhắn để có thể tìm lại một cách nhanh chóng. Các tin nhắn được đánh
					dấu sẽ xuất hiện ở đây.
				</Typography>
			</div>
		</div>
	);
}
