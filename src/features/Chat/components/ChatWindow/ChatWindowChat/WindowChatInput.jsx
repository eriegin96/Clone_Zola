import React from 'react';
import { Input } from 'antd';
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

export default function WindowChatInput() {
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
					{/* <textarea name="textarea" id="textarea">
								HI
							</textarea> */}
					<Input.TextArea
						id="textarea"
						placeholder="Nhập @, tin nhắn tới Cloud của tôi"
						bordered={false}
						autoSize={{ minRows: 2, maxRows: 8 }}
					/>
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
					<span title="Gửi nhanh biểu tượng cảm xúc">
						<div style={{ background: `url(${imgEmoji}) 84% 82.5% / 5100%` }}></div>
					</span>
				</div>
			</div>
		</div>
	);
}
