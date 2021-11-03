import React from 'react';
import { IconButton } from '@mui/material';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import SearchIcon from '@mui/icons-material/Search';
import { Input } from 'antd';

export default function BoardSearch() {
	return (
		<div className="board__search__box">
			<Input
				size="medium"
				placeholder="Tìm kiếm"
				prefix={<SearchIcon />}
        className='board__search__input'
			/>
			<IconButton title="Thêm bạn">
				<PersonAddOutlinedIcon fontSize="small" />
			</IconButton>
			<IconButton title="Tạo nhóm chat">
				<GroupAddOutlinedIcon fontSize="small" />
			</IconButton>
		</div>
	);
}
