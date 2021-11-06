import React, { useContext, useEffect, useState } from 'react';
import { Tabs, Tab, Typography, Box } from '@mui/material';
import { AppContext } from 'context/AppProvider';
import LoginForm from './LoginForm';
import LoginQrError from './LoginQrError';
import img from 'resources/img/qr.png';

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`tabpanel-${index}`}
			aria-labelledby={`tab-${index}`}
			{...other}
		>
			{value === index && <>{children}</>}
		</div>
	);
}

function tabProps(index) {
	return {
		id: `tab-${index}`,
		'aria-controls': `tabpanel-${index}`,
	};
}

export default function LoginTabs({ setOpenUserNotFoundDialog }) {
	const { isVN } = useContext(AppContext);
	const [value, setValue] = useState(0);
	const [isQrError, setIsQrError] = useState(false);
	const [imgQr, setImgQr] = useState(img);

	useEffect(() => {
		const time = setTimeout(() => {
			setIsQrError(true);
		}, 10000);

		return () => {
			clearTimeout(time);
		};
	}, [isQrError]);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<Box className="login__form-wrapper">
			<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
				<Tabs
					value={value}
					onChange={handleChange}
					aria-label="login tabs"
					variant="fullWidth"
					TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
				>
					<Tab
						label={isVN ? 'Với mã QR' : 'With qr code'}
						{...tabProps(0)}
						className="login__form__tab"
					/>
					<Tab
						label={isVN ? 'Với tài khoản' : 'With accounts'}
						{...tabProps(1)}
						className="login__form__tab"
					/>
				</Tabs>
			</Box>
			<TabPanel value={value} index={0} className="login__form__tab-panel">
				<div className="login__qr__wrapper">
					{isQrError ? (
						<LoginQrError setIsQrError={setIsQrError} imgQr={imgQr} setImgQr={setImgQr} />
					) : (
						<img src={imgQr} alt="qrcode" className="login__qr__img" />
					)}
					<Typography variant="body2" component="p" sx={{ color: '#888' }}>
						{isVN ? 'Quét mã QR bằng Zalo để đăng nhập' : 'Scan the QR code with Zalo to log in'}
					</Typography>
				</div>
			</TabPanel>
			<TabPanel value={value} index={1} className="login__form__tab-panel">
				<LoginForm setOpenUserNotFoundDialog={setOpenUserNotFoundDialog} />
			</TabPanel>
		</Box>
	);
}
