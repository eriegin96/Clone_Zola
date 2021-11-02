import React, { useContext, useEffect, useMemo, useRef, useLayoutEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import imgCloud from 'resources/img/cloud.jpg';
import { AppContext } from 'context/AppProvider';
import { AuthContext } from 'context/AuthProvider';
import Message from './Message';
import { useFirestoreMessages } from 'hooks/useFirestore';

export default function WindowChatContent() {
	const { selectedRoomId, members, messages, setMessages } = useContext(AppContext);
	const overlayRef = useRef(null);
	const messagesFetch = useFirestoreMessages(selectedRoomId);

	useEffect(() => {
		overlayRef?.current?.osInstance().scroll({ y: '100%' });
		setMessages(messagesFetch);
	}, [messagesFetch]);

	return (
		<div className="chat-window__chat__container__content">
			<div
				className="chat-window__chat__container__content-bg"
				style={{ backgroundImage: `url(${members?.photoURL || imgCloud})` }}
			></div>
			<div className="chat-window__chat__container__content-conv">
				<OverlayScrollbarsComponent
					ref={overlayRef}
					options={{
						autoUpdate: true,
						callbacks: {
							onContentSizeChanged: () => {
								overlayRef?.current?.osInstance().scroll({ y: '100%' });
							},
						},
					}}
					className="chat-window__chat__container__content-conv__overlay"
				>
					<div className="chat-window__chat__container__content-conv__mess">
						<div style={{ height: '8px' }}></div>
						{messages.length === 0 && (
							<div style={{ textAlign: 'center' }}>
								<CircularProgress sx={{ color: '#fff' }} />
							</div>
						)}
						{messages.map((mes, id) => (
							<Message
								key={id}
								uid={mes.uid}
								text={mes.text}
								photoURL={mes.photoURL}
								displayName={mes.displayName}
								createdAt={mes.createdAt}
							/>
						))}
						<div style={{ minHeight: '8px', maxHeight: '24px' }}></div>
					</div>
				</OverlayScrollbarsComponent>
			</div>
		</div>
	);
}
