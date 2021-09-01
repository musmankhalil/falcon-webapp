import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setOrgsUnstarred, setOrgsStarred, removeOrgs } from './store/orgsSlice';

function OrgsMultiSelectMenu(props) {
	const dispatch = useDispatch();
	const { selectedOrgIds } = props;

	const [anchorEl, setAnchorEl] = useState(null);

	function openSelectedOrgMenu(event) {
		setAnchorEl(event.currentTarget);
	}

	function closeSelectedOrgsMenu() {
		setAnchorEl(null);
	}

	return (
		<>
			<IconButton
				className="p-0"
				aria-owns={anchorEl ? 'selectedOrgsMenu' : null}
				aria-haspopup="true"
				onClick={openSelectedOrgMenu}
			>
				<Icon>more_horiz</Icon>
			</IconButton>
			<Menu
				id="selectedOrgsMenu"
				anchorEl={anchorEl}
				open={Boolean(anchorEl)}
				onClose={closeSelectedOrgsMenu}
			>
				<MenuList>
					<MenuItem
						onClick={() => {
							dispatch(removeOrgs(selectedOrgIds));
							closeSelectedOrgsMenu();
						}}
					>
						<ListItemIcon className="min-w-40">
							<Icon>delete</Icon>
						</ListItemIcon>
						<ListItemText primary="Remove" />
					</MenuItem>
					<MenuItem
						onClick={() => {
							dispatch(setOrgsStarred(selectedOrgIds));
							closeSelectedOrgsMenu();
						}}
					>
						<ListItemIcon className="min-w-40">
							<Icon>star</Icon>
						</ListItemIcon>
						<ListItemText primary="Starred" />
					</MenuItem>
					<MenuItem
						onClick={() => {
							dispatch(setOrgsUnstarred(selectedOrgIds));
							closeSelectedOrgsMenu();
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

export default OrgsMultiSelectMenu;
