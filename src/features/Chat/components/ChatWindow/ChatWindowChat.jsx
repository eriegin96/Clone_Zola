import React, { useState } from 'react';
import { Typography } from '@mui/material';
import { Input } from 'antd';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import LabelOutlinedIcon from '@mui/icons-material/LabelOutlined';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import SearchIcon from '@mui/icons-material/Search';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import ViewWeekOutlinedIcon from '@mui/icons-material/ViewWeekOutlined';
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
import imgCloud from '../../../../resources/img/cloud.jpg';
import imgEmoji from '../../../../resources/img/chat-window/emoji.png';

export default function ChatWindowChat() {
	const [value, setValue] = useState('');

	return (
		<div className="chat-window__chat">
			<div className="chat-window__chat__header">
				<div className="chat-window__chat__header__title">
					<img src={imgCloud} alt="avatar" />
					<div>
						<Typography variant="body1" component="div">
							Cloud của tôi
						</Typography>
						<LabelOutlinedIcon />
					</div>
				</div>
				<div className="chat-window__chat__header__actions">
					<span title="Thêm bạn vào trò chuyện">
						<GroupAddOutlinedIcon />
					</span>
					<span title="Tìm kiếm tin nhắn">
						<SearchIcon />
					</span>
					<span title="Cuộc gọi video">
						<VideocamOutlinedIcon />
					</span>
					<span title="Thông tin hội thoại">
						<ViewWeekOutlinedIcon />
					</span>
				</div>
			</div>
			<div className="chat-window__chat__container">
				<div className="chat-window__chat__container__content">
					<div
						className="chat-window__chat__container__content-bg"
						style={{ backgroundImage: `url(${imgCloud})` }}
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
								<div
									style={{ background: `url(${imgEmoji}) 84% 82.5% / 5100%` }}
								></div>
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
