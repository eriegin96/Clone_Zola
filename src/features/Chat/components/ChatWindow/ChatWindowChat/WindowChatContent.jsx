import React, { useContext } from 'react';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import imgCloud from 'resources/img/cloud.jpg';
import { AppContext } from 'context/AppProvider';

export default function WindowChatContent() {
	const { members } = useContext(AppContext);

	return (
		<div className="chat-window__chat__container__content">
			<div
				className="chat-window__chat__container__content-bg"
				style={{ backgroundImage: `url(${members?.photoURL || imgCloud})` }}
			></div>
			<div className="chat-window__chat__container__content-conv">
				<OverlayScrollbarsComponent>
					<div className="chat-window__chat__container__content-conv__mess">
						<div>Hihi1</div>
						<div>Hihi2</div>
						<div>Hihi3</div>
						<div>Hihi4</div>
					</div>
				</OverlayScrollbarsComponent>
			</div>
		</div>
	);
}
