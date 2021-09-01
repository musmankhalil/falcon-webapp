import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setDisplaysUnstarred, setDisplaysStarred, removeDisplays } from './store/displaysSlice';

function DisplaysMultiSelectMenu(props) {
	const dispatch = useDispatch();
	const { selectedDisplayIds } = props;

	const [anchorEl, setAnchorEl] = useState(null);

	function openSelectedDisplayMenu(event) {
		setAnchorEl(event.currentTarget);
	}

	function closeSelectedDisplaysMenu() {
		setAnchorEl(null);
	}

	return (
		<>
			<IconButton
				className="p-0"
				aria-owns={anchorEl ? 'selectedDisplaysMenu' : null}
				aria-haspopup="true"
				onClick={openSelectedDisplayMenu}
			>
				<Icon>more_horiz</Icon>
			</IconButton>
			<Menu
				id="selectedDisplaysMenu"
				anchorEl={anchorEl}
				open={Boolean(anchorEl)}
				onClose={closeSelectedDisplaysMenu}
			>
				<MenuList>
					<MenuItem
						onClick={() => {
							dispatch(removeDisplays(selectedDisplayIds));
							closeSelectedDisplaysMenu();
						}}
					>
						<ListItemIcon className="min-w-40">
							<Icon>delete</Icon>
						</ListItemIcon>
						<ListItemText primary="Remove" />
					</MenuItem>
					<MenuItem
						onClick={() => {
							dispatch(setDisplaysStarred(selectedDisplayIds));
							closeSelectedDisplaysMenu();
						}}
					>
						<ListItemIcon className="min-w-40">
							<Icon>star</Icon>
						</ListItemIcon>
						<ListItemText primary="Starred" />
					</MenuItem>
					<MenuItem
						onClick={() => {
							dispatch(setDisplaysUnstarred(selectedDisplayIds));
							closeSelectedDisplaysMenu();
						}}
					>
						<ListItemIcon className="min-w-40">
							<Icon>star_border</Icon>
						</ListItemIcon>
						<ListItemText primary="Unstarred" />
					</MenuItem>
				</MenuList>
			</Menu>
		</>
	);
}

export default DisplaysMultiSelectMenu;
