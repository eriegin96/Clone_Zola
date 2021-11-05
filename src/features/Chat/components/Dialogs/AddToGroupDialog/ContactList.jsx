import React, { useContext, useRef } from 'react';
import {
	Grid,
	List,
	ListItem,
	ListItemText,
	ListItemIcon,
	Checkbox,
	Chip,
	Avatar,
	Typography,
	Slide,
} from '@mui/material';
import { AppContext } from 'context/AppProvider';

export default function ContactList(props) {
	const { left, right, setRight } = props;
	const containerRef = useRef(null);
	const {
		selectedRoom: { members },
	} = useContext(AppContext);

	const handleToggle = (value) => {
		const currentIndex = right.indexOf(value);

		if (currentIndex === -1) {
			setRight([...right, value]);
		} else {
			setRight(right.filter((value) => right.indexOf(value) !== currentIndex));
		}
	};

	const leftList = (left, right) => (
		<>
			<Typography variant="body2" component="span" sx={{ fontWeight: 600 }}>
				Trò chuyện gần đây
			</Typography>
			<List
				sx={{
					width: '100%',
					bgcolor: 'background.paper',
					overflow: 'auto',
				}}
				dense
				component="div"
				role="list"
			>
				{left.map((item, i) => {
					const labelId = `item-${i}-label`;

					return (
						<ListItem
							key={i}
							role="listitem"
							button
							sx={{ padding: '4px 0', width: '100%' }}
							disabled={members.indexOf(item.uid) !== -1}
							onClick={() => handleToggle(item)}
						>
							<ListItemIcon>
								<Checkbox
									checked={right.indexOf(item) !== -1}
									tabIndex={-1}
									disableRipple
									sx={{ paddingLeft: '4px' }}
									inputProps={{
										'aria-labelledby': labelId,
									}}
								/>
								<Avatar sx={{ marginRight: '6px' }} src={item.photoURL} />
							</ListItemIcon>
							<ListItemText id={labelId} primary={item.displayName} />
						</ListItem>
					);
				})}
				<ListItem />
			</List>
		</>
	);

	const rightList = (right, left) => (
		<div className="addToGroup-dialog__add-selected">
			<div>
				<Typography variant="body2" component="span" sx={{ fontWeight: 600 }}>
					Đã chọn
				</Typography>
				<span className="addToGroup-dialog__add-counter">
					{right.length}/{left.length}
				</span>
			</div>
			<div className="addToGroup-dialog__add-selected-list">
				{right.map((item, i) => {
					return (
						<Chip
							key={i}
							color="secondary"
							avatar={<Avatar src={item.photoURL} />}
							label={item.displayName}
							onDelete={() => {
								handleToggle(item);
							}}
							className="addToGroup-dialog__add-selected-item"
						></Chip>
					);
				})}
			</div>
		</div>
	);

	return (
		<div className="addToGroup-dialog__add-container">
			<Grid
				container
				spacing={2}
				justifyContent="center"
				alignItems="center"
				sx={{ margin: 0, width: '100%', height: '100%' }}
				ref={containerRef}
			>
				<Grid item xs={right.length > 0 ? 7 : 12} className="addToGroup-dialog__add-list">
					{leftList(left, right)}
				</Grid>
				<Slide
					direction="left"
					in={right.length > 0}
					mountOnEnter
					unmountOnExit
					container={containerRef.current}
				>
					<Grid
						item
						xs={right.length > 0 ? 5 : null}
						sx={{ height: '100%', paddingBottom: '16px' }}
					>
						{rightList(right, left)}
					</Grid>
				</Slide>
			</Grid>
		</div>
	);
}
