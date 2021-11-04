import React, { useContext } from 'react';
import { Avatar } from '@mui/material';
import { AuthContext } from 'context/AuthProvider';
import moment from 'moment';

export default function Message(props) {
	const { user } = useContext(AuthContext);
	const { text, photoURL, createdAt, uid } = props;

	function formatDate(seconds) {
		let formattedDate = '';

		if (seconds) {
			formattedDate = moment(new Date(seconds * 1000), 'h:mm A').format('h:mm A');
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
