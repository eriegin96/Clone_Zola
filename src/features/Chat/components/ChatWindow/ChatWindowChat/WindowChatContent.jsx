import React, { useContext, useEffect, useMemo, useRef, useLayoutEffect, useState } from 'react';
import { Skeleton, Card, Avatar, CardHeader, CardMedia, Stack, Box } from '@mui/material';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import imgCloud from 'resources/img/cloud.jpg';
import imgNewFriend from 'resources/img/chat-window/new-friend.png';
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
						{messages === null && (
							<>
							<Stack direction='row'>
								<Skeleton variant="circular" width={40} height={40} sx={{marginRight: '8px'}}/>
								<Skeleton variant="rectangular" width={210} height={118} sx={{borderRadius : '4px'}}/>
							</Stack>
							<Stack direction='row'>
								<Box flexGrow={1}/>
								<Skeleton variant="rectangular" width={210} height={118} sx={{borderRadius : '4px'}}/>
								<Skeleton variant="circular" width={40} height={40} sx={{marginLeft: '8px'}}/>
							</Stack>
							</>
						)}
						{messages !== null && messages.length === 0 ? (
							<div>
								<Card sx={{ width: '340px', margin: 'auto' }}>
									<CardHeader
										avatar={<Avatar src={members.photoURL} />}
										title={members.displayName}
										subheader="Hãy bắt đầu cùng nhau chia sẻ những câu chuyện thú vị cùng nhau"
									/>
									<CardMedia component="img" height="140" image={imgNewFriend} />
								</Card>
							</div>
						) : (
							messages !== null && messages.map((mes, id) => (
								<Message
									key={id}
									uid={mes.uid}
									text={mes.text}
									photoURL={mes.photoURL}
									displayName={mes.displayName}
									createdAt={mes.createdAt}
								/>
							))
						)}
						<div style={{ minHeight: '8px', maxHeight: '24px' }}></div>
					</div>
				</OverlayScrollbarsComponent>
			</div>
		</div>
	);
}
