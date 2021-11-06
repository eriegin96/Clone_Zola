import { Button } from '@mui/material';
import React, { useContext } from 'react';
import { AppContext } from 'context/AppProvider';

export default function LoginQrError({ setIsQrError, imgQr, setImgQr }) {
	const { isVN } = useContext(AppContext);

	return (
		<div className="login__qr__wrapper--error">
			<div className="login__qr__title--error">
				{isVN
					? 'Mã QR đã hết hạn, vui lòng tải lại mã mới'
					: 'The QR code has expired, please reload the code'}
			</div>
			<div className="login__qr__message--error">
				<img src={imgQr} alt="qrcode" className="login__qr__img login__qr__img--error" />
				<div>
					<p>{isVN ? 'Mã QR hết hạn' : 'QR code was expired'}</p>
					<Button
						variant="contained"
						size="small"
						onClick={() => {
							const data = Math.floor(Math.random() * 100);
							setImgQr(`https://api.qrserver.com/v1/create-qr-code/?size=218x218&data=${data}`);
							setIsQrError(false);
						}}
					>
						{isVN ? 'Lấy mã mới' : 'Regenerate'}
					</Button>
				</div>
			</div>
		</div>
	);
}
