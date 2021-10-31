import React, { useContext } from 'react';
import { Typography, Paper } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import img1 from 'resources/img/chat-window/chat-window-1.png';
import img2 from 'resources/img/chat-window/chat-window-2.png';
import img3 from 'resources/img/chat-window/chat-window-3.jpg';
import img4 from 'resources/img/chat-window/chat-window-4.jpg';
import img5 from 'resources/img/chat-window/chat-window-5.png';
import img6 from 'resources/img/chat-window/chat-window-6.jpg';
import img7 from 'resources/img/chat-window/chat-window-7.jpg';

const items = [
	{
		img: img1,
		title: 'Nhắn tin nhiều hơn, soạn thảo ít hơn',
		description: 'Sử dụng',
		strong: ' Tin Nhắn Nhanh ',
		description2: 'để lưu sẵn các tin nhắn thường dùng và gửi nhanh trong hội thoại bất kỳ',
	},
	{
		img: img2,
		title: 'Tin nhắn tự xóa',
		description: 'Từ giờ tin nhắn đã có thể tự động tự xóa sau khoảng thời gian nhất định.',
	},
	{
		img: img3,
		title: 'Gọi nhóm và làm việc hiệu quả với Zalo Group Call',
		description: 'Trao đổi công việc mọi lúc mọi nơi',
	},
	{
		img: img4,
		title: 'Trải nghiệm xuyên suốt',
		description:
			'Kết nối và giải quyết công việc trên mọi thiết bị với dữ liệu luôn được đồng bộ',
	},
	{
		img: img5,
		title: 'Gửi File nặng?',
		description: 'Đã có Zola PC "xử" hết',
	},
	{
		img: img6,
		title: 'Chat nhóm với đồng nghiệp',
		description: 'Tiện lợi hơn, nhờ các công cụ hỗ trợ chat trên máy tính',
	},
	{
		img: img7,
		title: 'Giải quyết công việc hiệu quả hơn, lên đến 40%',
		description: 'Với Zola PC',
	},
];

function Item({ item }) {
	return (
		<Paper elevation={0} sx={{ height: '325px' }}>
			<img src={item.img} alt="" className="chat-window__carousel__img" />
			<Typography variant="body1" component="div" className="chat-window__carousel__title">
				{item.title}
			</Typography>
			<Typography variant="body2" component="div" className="chat-window__carousel__des">
				{item.description}
				{item.strong ? <strong>{item.strong}</strong> : <></>}
				{item?.description2}
			</Typography>
		</Paper>
	);
}

export default function ChatWindowCarousel() {
	return (
		<Carousel
			animation="slide"
			NextIcon={<ChevronRightIcon />}
			PrevIcon={<ChevronLeftIcon />}
			fullHeightHover={false}
			navButtonsAlwaysVisible={true}
			navButtonsWrapperProps={{
				style: {
					top: 'calc(50% - 20px)',
					height: 'unset',
				},
			}}
			navButtonsProps={{
				className: 'chat-window__carousel__nav-btn',
				style: {
					padding: '4px',
					color: '#001a33',
					backgroundColor: 'transparent',
				},
			}}
			indicatorIconButtonProps={{
				style: {
					margin: '0 5px',
					color: '#eeeff2',
				},
			}}
			activeIndicatorIconButtonProps={{
				style: {
					color: '#0068ff',
				},
			}}
		>
			{items.map((item, i) => (
				<Item key={i} item={item} />
			))}
		</Carousel>
	);
}
