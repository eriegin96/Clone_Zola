import React, { useContext } from 'react';
import { Avatar } from '@mui/material';
import { AuthContext } from 'context/AuthProvider';
import { format } from 'date-fns/esm';

export default function Message(props) {
	const { user } = useContext(AuthContext);
	const { text, photoURL, createdAt, uid } = props;

	function formatDate(seconds) {
		let formattedDate = '';

		if (seconds) {
			formattedDate = format(new Date(seconds * 1000), 'h:mm a');
		}

		return formattedDate;
	}

	return (
		<div
			className={
				uid === user.uid
					? 'chat-window__chat__container__content-conv__mess--right'
					: 'chat-window__chat__container__content-conv__mess--left'
			}
		>
			<Avatar src={photoURL} />
			<div className="chat-window__chat__container__content-conv__mess__text">
				{text}
				<div>{formatDate(createdAt?.seconds) || 'Đang gửi'}</div>
			</div>
		</div>
	);
}
