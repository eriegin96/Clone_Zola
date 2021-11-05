import React, { useContext, useState } from 'react';
import WindowChatHeader from './WindowChatHeader';
import WindowChatContent from './WindowChatContent';
import WindowChatInput from './WindowChatInput';
import AddGroupDialog from '../../Dialogs/AddGroupDialog/AddGroupDialog';
import AddToGroupDialog from '../../Dialogs/AddToGroupDialog/AddToGroupDialog';
import { AppContext } from 'context/AppProvider';

export default function ChatWindowChat() {
	const { selectedRoom } = useContext(AppContext);
	const [openAddGroupDialog, setOpenAddGroupDialog] = useState(false);
	const [openAddToGroupDialog, setOpenAddToGroupDialog] = useState(false);

	return (
		<>
			{selectedRoom.id && (
				<>
					<div className="chat-window__chat">
						<WindowChatHeader
							setOpenAddGroupDialog={setOpenAddGroupDialog}
							setOpenAddToGroupDialog={setOpenAddToGroupDialog}
						/>
						<div className="chat-window__chat__container">
							<WindowChatContent />
							<WindowChatInput />
						</div>
					</div>
					<AddGroupDialog open={openAddGroupDialog} setOpen={setOpenAddGroupDialog} />
					<AddToGroupDialog
						open={openAddToGroupDialog}
						setOpen={setOpenAddToGroupDialog}
					/>
				</>
			)}
		</>
	);
}
