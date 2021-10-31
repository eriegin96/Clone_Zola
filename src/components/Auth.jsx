import React, { useEffect } from 'react';
import { CircularProgress, Typography } from '@mui/material';
import './auth.scss';
import Carousel from 'react-material-ui-carousel';

export default function Auth() {
	return (
		<div className="auth">
			<Carousel className='none'></Carousel>
			<Typography variant="h1" component="h1" className="auth__logo">
				Zola
			</Typography>
			<div>
				<CircularProgress size={24} className="auth__progress" />
				<Typography variant="body1" component="p">
					Đang đăng nhập ...
				</Typography>
			</div>
		</div>
	);
}
