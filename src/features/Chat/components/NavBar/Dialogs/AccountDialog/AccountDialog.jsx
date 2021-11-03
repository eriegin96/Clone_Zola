import React, { useContext, useState } from 'react';
import { Avatar } from '@mui/material';
import { Modal, Button, DatePicker, Input, Radio, Space, Typography } from 'antd';
import { AuthContext } from 'context/AuthProvider';
import { updateUser } from 'firebase/services';

export default function AccountDialog({ open, setOpen }) {
	const { user } = useContext(AuthContext);
	const [cellValue, setCellValue] = useState(user?.cell);
	const [dateValue, setDateValue] = useState(user?.date);
	const [genderValue, setGenderValue] = useState(user?.gender);

	const handleOk = () => {
		updateUser(user.uid, {
			cell: cellValue,
			date: dateValue,
			gender: genderValue,
		});
		setOpen(false);
	};

	const handleCancel = () => {
		setOpen(false);
	};

	return (
		<Modal
			title="Cập nhật thông tin"
			visible={open}
			width={400}
			onOk={handleOk}
			onCancel={handleCancel}
			footer={[
				<Button key="back" onClick={handleCancel}>
					Hủy
				</Button>,
				<Button key="submit" type="primary" onClick={handleOk}>
					Cập nhật
				</Button>,
			]}
		>
			<div style={{ textAlign: 'center' }}>
				<Avatar src={user.photoURL} sx={{ width: 80, height: 80, margin: '0 auto 8px' }}>
					{user.displayName.charAt(0)}
				</Avatar>
				<Typography.Title level={5}>{user.displayName}</Typography.Title>
			</div>
			<Space direction="vertical" size="middle" style={{ width: '100%', marginTop: '16px' }}>
				<div>
					Số điện thoại đăng ký
					<Input
						value={cellValue}
						style={{ width: '100%' }}
						onChange={(e) => setCellValue(e.target.value)}
					/>
				</div>
				<Space size="large">
					Ngày sinh
					<DatePicker
						placeholder="Ngày sinh"
						defaultValue={dateValue}
						format="DD/MM/YYYY"
						onChange={(date) => setDateValue(date._d)}
					/>
				</Space>
				<Space size="large">
					Giới tính
					<Radio.Group
						onChange={(e) => setGenderValue(e.target.value)}
						value={genderValue}
					>
						<Radio value="male">Nam</Radio>
						<Radio value="female">Nữ</Radio>
					</Radio.Group>
				</Space>
			</Space>
		</Modal>
	);
}
