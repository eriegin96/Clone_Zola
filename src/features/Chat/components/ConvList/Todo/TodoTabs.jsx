import React, { useState } from 'react';
import { Box, Tabs, Tab, Chip } from '@mui/material';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`tabpanel-${index}`}
			aria-labelledby={`tab-${index}`}
			className="conv-list__todo__sub-tab-panel"
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

export default function TodoTabs() {
	const [value, setValue] = useState(0);
	const [giveDone, setGiveDone] = useState(true);
	const [receiveDone, setReceiveDone] = useState(true);
	const [followDone, setFollowDone] = useState(true);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<div className="conv-list__todo__sub__wrapper">
			<Box>
				<Tabs
					value={value}
					onChange={handleChange}
					aria-label="todo tabs"
					variant="fullWidth"
				>
					<Tab label="TÔI GIAO" {...tabProps(0)} className="conv-list__todo__sub-tab" />
					<Tab label="CẦN LÀM" {...tabProps(1)} className="conv-list__todo__sub-tab" />
					<Tab label="THEO DÕI" {...tabProps(2)} className="conv-list__todo__sub-tab" />
				</Tabs>
			</Box>
			<TabPanel value={value} index={0}>
				<div className="conv-list__todo__sub-tab-panel__tab">
					<Chip
						label="Chưa xong: 0"
						size="small"
						color={giveDone ? 'primary' : 'default'}
						sx={{ padding: '0 3px', fontSize: '12px' }}
						onClick={() => setGiveDone(true)}
					/>
					<Chip
						label="Đã xong: 0"
						size="small"
						color={!giveDone ? 'primary' : 'default'}
						sx={{ padding: '0 3px', fontSize: '12px' }}
						onClick={() => setGiveDone(false)}
					/>
					<Chip label="Khác" size="small" color="default" sx={{ padding: '0 3px', fontSize: '12px' }} />
				</div>
				<div className="conv-list__todo__sub-tab-panel__job">
					<div className="conv-list__todo__sub-tab-panel__text">
						{giveDone
							? 'Danh sách này sẽ gồm các công việc bạn giao cho người khác mà họ chưa hoàn	thành.'
							: 'Danh sách này sẽ gồm các công việc bạn giao cho người khác mà họ đã hoàn thành.'}
					</div>
					<CheckBoxIcon />
					<div>Danh sách công việc đang trống</div>
				</div>
			</TabPanel>
			<TabPanel value={value} index={1}>
				<div className="conv-list__todo__sub-tab-panel__tab">
					<Chip
						label="Chưa xong: 0"
						size="small"
						color={receiveDone ? 'primary' : 'default'}
						sx={{ padding: '0 3px', fontSize: '12px' }}
						onClick={() => setReceiveDone(true)}
					/>
					<Chip
						label="Đã xong: 0"
						size="small"
						color={!receiveDone ? 'primary' : 'default'}
						sx={{ padding: '0 3px', fontSize: '12px' }}
						onClick={() => setReceiveDone(false)}
					/>
					<Chip label="Khác" size="small" color="default" sx={{ padding: '0 3px', fontSize: '12px' }} />
				</div>
				<div className="conv-list__todo__sub-tab-panel__job">
					<div className="conv-list__todo__sub-tab-panel__text">
						{receiveDone
							? 'Danh sách này sẽ gồm các công việc giao cho bạn mà bạn chưa hoàn thành.'
							: 'Danh sách này sẽ gồm các công việc giao cho bạn mà bạn đã hoàn thành.'}
					</div>
					<CheckBoxIcon />
					<div>Danh sách công việc đang trống</div>
				</div>
			</TabPanel>
			<TabPanel value={value} index={2}>
				<div className="conv-list__todo__sub-tab-panel__tab">
					<Chip
						label="Chưa xong: 0"
						size="small"
						color={followDone ? 'primary' : 'default'}
						sx={{ padding: '0 3px', fontSize: '12px' }}
						onClick={() => setFollowDone(true)}
					/>
					<Chip
						label="Đã xong: 0"
						size="small"
						color={!followDone ? 'primary' : 'default'}
						sx={{ padding: '0 3px', fontSize: '12px' }}
						onClick={() => setFollowDone(false)}
					/>
					<Chip label="Khác" size="small" color="default" sx={{ padding: '0 3px', fontSize: '12px' }} />
				</div>
				<div className="conv-list__todo__sub-tab-panel__job">
					<div className="conv-list__todo__sub-tab-panel__text">
						Danh sách này sẽ gồm các công việc giao cho thành viên nhóm bạn mà họ chưa
						hoàn thành, bạn trong danh sách theo dõi.
					</div>
					<CheckBoxIcon />
					<div>Danh sách công việc đang trống</div>
				</div>
			</TabPanel>
		</div>
	);
}
