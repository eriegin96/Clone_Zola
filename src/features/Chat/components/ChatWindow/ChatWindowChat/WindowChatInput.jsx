import React, { useContext, useState } from 'react';
import { Button } from '@mui/material';
import { Input, Form } from 'antd';
import MoodOutlinedIcon from '@mui/icons-material/MoodOutlined';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import SmsOutlinedIcon from '@mui/icons-material/SmsOutlined';
import FaceOutlinedIcon from '@mui/icons-material/FaceOutlined';
import PhotoOutlinedIcon from '@mui/icons-material/PhotoOutlined';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import AlarmOutlinedIcon from '@mui/icons-material/AlarmOutlined';
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import CropFreeIcon from '@mui/icons-material/CropFree';
import imgEmoji from 'resources/img/chat-window/emoji.png';
import { AppContext } from 'context/AppProvider';
import { AuthContext } from 'context/AuthProvider';
import { addMessage } from 'firebase/services';

export default function WindowChatInput() {
	const {
		user: { uid, photoURL, displayName },
	} = useContext(AuthContext);
	const { selectedRoom, members } = useContext(AppContext);
	const [inputValue, setInputValue] = useState('');
	const [typing, setTyping] = useState(false);
	const [form] = Form.useForm();

	const handleInputChange = (e) => {
		if (e.target.value === '') {
			setTyping(false);
			return;
		}
		setInputValue(e.target.value);
		setTyping(true);
	};

	const handleOnSubmit = () => {
		form.resetFields(['message']);

		addMessage(selectedRoom.id, {
			text: inputValue,
			uid,
			photoURL,
			displayName,
			roomId: selectedRoom.id,
		});

		setTyping(false);
	};

	return (
		<div className="chat-window__chat__input-box">
			<div className="chat-window__chat__input__extra">
				<span title="Gửi Sticker">
					<FaceOutlinedIcon />
				</span>
				<span title="Gửi hình ảnh">
					<PhotoOutlinedIcon />
				</span>
				<span title="Gửi File lên đến 1GB">
					<AttachFileOutlinedIcon />
				</span>
				<span title="Chụp màn hình (Alt + PrtScn)">
					<CropFreeIcon />
				</span>
				<span title="Gửi danh thiếp">
					<BadgeOutlinedIcon />
				</span>
				<span title="Tạo nhắc hẹn">
					<AlarmOutlinedIcon />
				</span>
				<span title="Giao việc">
					<FactCheckOutlinedIcon />
				</span>
				<span title="Định dạng tin nhắn">
					<EditOutlinedIcon />
				</span>
				<span tilte="Tin nhắn ưu tiên">
					<PriorityHighIcon />
				</span>
			</div>
			<div className="chat-window__chat__input__text-box">
				<div className="chat-window__chat__input__text">
					<Form form={form}>
						<Form.Item name="message">
							<Input.TextArea
								autoFocus
								onChange={handleInputChange}
								onPressEnter={(e) => {
									e.preventDefault();
									handleOnSubmit();
								}}
								id="textarea"
								placeholder={`Nhập @, tin nhắn tới ${
									members.displayName || 'Cloud của tôi'
								}`}
								bordered={false}
								autoSize={{ minRows: 2, maxRows: 8 }}
							/>
						</Form.Item>
					</Form>
				</div>
				<div className="chat-window__chat__input__effect">
					<span title="Chèn tin nhắn nhanh">
						<SmsOutlinedIcon />
					</span>
					<span title="Biểu cảm">
						<MoodOutlinedIcon />
					</span>
					<span title="Gợi ý tiện ích">
						<AlternateEmailIcon />
					</span>
					{typing ? (
						<Button
							variant="text"
							sx={{ width: '45px', minWidth: 'unset', fontSize: 'unset' }}
							onClick={handleOnSubmit}
						>
							GỬI
						</Button>
					) : (
						<span title="Gửi nhanh biểu tượng cảm xúc">
							<div style={{ background: `url(${imgEmoji}) 84% 82.5% / 5100%` }}></div>
						</span>
					)}
				</div>
			</div>
		</div>
	);
}
