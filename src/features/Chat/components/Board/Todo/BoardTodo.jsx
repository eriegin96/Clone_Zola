import React, { useContext, useState } from 'react';
import { Box, Tabs, Tab, Typography } from '@mui/material';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import SearchIcon from '@mui/icons-material/Search';
import PieChartOutlineIcon from '@mui/icons-material/PieChartOutline';
import BarChartIcon from '@mui/icons-material/BarChart';
import CloseIcon from '@mui/icons-material/Close';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { Input } from 'antd';
import { AppContext } from 'context/AppProvider';
import img from 'resources/img/board/search.png'
import TodoTabs from './TodoTabs';

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`tabpanel-${index}`}
			aria-labelledby={`tab-${index}`}
			className="board__todo__main-tab-panel"
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

export default function BoardTodo() {
	const { setActiveWindow } = useContext(AppContext);
	const [value, setValue] = useState(0);

	const handleChange = (event, newValue) => {
		if (newValue === 2) {
			setActiveWindow('chat');
			return;
		}
		setValue(newValue);
	};

	return (
		<div className="board__todo__main__wrapper">
			<Box>
				<Tabs
					value={value}
					onChange={handleChange}
					aria-label="todo main tabs"
					variant="fullWidth"
				>
					<Tab
						label={
							<>
								<Typography variant="h6" component="p" sx={{ marginRight: '4px' }}>
									To-Do
								</Typography>
								<AssignmentTurnedInOutlinedIcon size="small" />
							</>
						}
						{...tabProps(0)}
						className="board__todo__main-tab"
					/>
					<Box flexGrow={1} className="board__todo__main-tab" />
					<Tab
						title="Gửi góp ý và yêu cầu hỗ trợ"
						label={<ChatOutlinedIcon size="small" />}
						{...tabProps(2)}
						className="board__todo__main-tab"
					/>
					<Tab
						title="Tìm kiếm"
						label={<SearchIcon />}
						{...tabProps(3)}
						className="board__todo__main-tab"
					/>
					<Tab
						title="Thống kê công việc"
						label={<PieChartOutlineIcon />}
						{...tabProps(4)}
						className="board__todo__main-tab"
					/>
				</Tabs>
			</Box>
			<TabPanel value={value} index={0}>
				<TodoTabs />
			</TabPanel>
			<TabPanel value={value} index={3}>
				<div className="board__todo__main-header">
					<Typography variant="body2" component="span">
						TÌM KIẾM CÔNG VIỆC
					</Typography>
					<CloseIcon onClick={() => setValue(0)} />
				</div>
				<div className="board__todo__main-search__input">
					<Input placeholder="Tìm kiếm công việc" style={{ borderRadius: '20px' }} />
					<div>
						<FilterAltOutlinedIcon />
						<span>Tìm kiếm nâng cao</span>
					</div>
				</div>
				<div>
					<div>Kết quả tìm kiếm: 0</div>
					<img src={img} alt="search" />
					<div>Không tìm thấy kết quả</div>
				</div>
			</TabPanel>
			<TabPanel value={value} index={4}>
				<div className="board__todo__main-header">
					<Typography variant="body2" component="span">
						Thống kê công việc:
					</Typography>
					<CloseIcon onClick={() => setValue(0)} />
				</div>
				<div>
					<BarChartIcon />
				</div>
				<Typography variant="body2" component="span" sx={{ color: '#72808e' }}>
					Hiện chưa có thống kê công việc của bạn
				</Typography>
			</TabPanel>
		</div>
	);
}
