import React, { useState } from 'react';
import { Tabs, Tab, Typography, Box } from '@mui/material';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import img from 'resources/img/board/noti.png';

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`tabpanel-${index}`}
			aria-labelledby={`tab-${index}`}
			{...other}
		>
			{value === index && <>{children}</>}
		</div>
	);
}

function tabProps(index) {
	return {
		id: `tab-${index}`,
		'aria-controls': `tabpanel-${index}`,
	};
}

export default function BoardNoti() {
	const [value, setValue] = useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<Box className="board__noti">
			<Typography variant="h5" component="div" className="board__noti__title">
				Thông báo
			</Typography>
			<Tabs
				value={value}
				onChange={handleChange}
				aria-label="noti tabs"
				variant="fullWidth"
				TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
				className="board__noti__tabs"
			>
				<Tab label="Ưu tiên" {...tabProps(0)} className="board__noti__tab" />
				<Tab label="Khác" {...tabProps(1)} className="board__noti__tab" />
				<Tab disabled className="board__noti__tab" />
				<Tab disabled className="board__noti__tab" />
			</Tabs>
			<div className="board__noti__select">
				<span>Tất cả</span>
				<ArrowDropDownOutlinedIcon />
			</div>
			<TabPanel value={value} index={0} className="board__noti__tab-panel">
				<img src={img} alt="noti" />
				<Typography variant="body2" component="div">
					Danh sách bạn chọn đang trống.
				</Typography>
			</TabPanel>
			<TabPanel value={value} index={1} className="board__noti__tab-panel">
				<img src={img} alt="noti" />
				<Typography variant="body2" component="div">
					Danh sách này sẽ gồm thông báo bày tỏ cảm xúc của mọi người cho tin nhắn của
					bạn.
				</Typography>
			</TabPanel>
		</Box>
	);
}
