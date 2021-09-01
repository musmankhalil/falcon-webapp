import React from 'react';
import { motion } from 'framer-motion';
import FuseUtils from '@fuse/utils';
import Avatar from '@material-ui/core/Avatar';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { useMemo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OrgsMultiSelectMenu from './OrgsMultiSelectMenu';
import OrgsTable from './OrgsTable';
import { openEditOrgDialog, removeOrg, toggleStarredOrg, selectOrgs, getState } from './store/orgsSlice';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import clsx from 'clsx';
import moment from 'moment';
import { getUserData } from './store/userSlice'
import { swithcUser } from 'app/auth/store/loginSlice';


function OrgsList(props) {

	const dispatch = useDispatch();
	const orgs = useSelector(selectOrgs);
	const searchText = useSelector(({ orgsApp }) => orgsApp.orgs.searchText);
	const user = useSelector(({ orgsApp }) => orgsApp.user);

	const [filteredData, setFilteredData] = useState(null);

	const columns = useMemo(
		() => [
			{
				Header: ({ selectedFlatRows }) => {
					const selectedRowIds = selectedFlatRows.map(row => row.original.id);

					return (
						selectedFlatRows.length > 0 && <OrgsMultiSelectMenu selectedOrgIds={selectedRowIds} />
					);
				},
				accessor: 'avatar',
				Cell: ({ row }) => {
					return <Avatar className="mx-8" alt={row.original.name} src={row.original.avatar} />;
				},
				className: 'justify-center',
				width: 64,
				sortable: false
			},
			{
				Header: 'Org Name',
				accessor: 'name',
				className: 'font-medium',
				Cell: ({ row }) => {
					return (
						<div className="mx-8"  >
							<div className="mx-8">{row.original.name}</div>
							<div className="mx-8">{row.original.email}</div>
						</div>
					);
				},
				sortable: true
			},
			{
				Header: 'Status',
				accessor: 'status',
				Cell: ({ row }) => {
					return (<><i
						className={clsx(
							'inline-block w-8 h-8 rounded mx-8',
							row.original.status == 0 && 'bg-red',
							row.original.status == 1 && 'bg-green'
						)}
					/>{row.original.status == 0 ? 'Blocked' : 'Active'}</>);
				},
				sortable: true
			},
			{
				Header: 'players',
				accessor: 'playerCount',
				sortable: true
			},
			{
				Header: 'Joined',
				accessor: 'joined',
				sortable: true,
				Cell: ({ row }) => {
					const timeObj = timeDate(row.original.joined)
					return (<><div>{timeObj.date}</div><div>{timeObj.time}</div></>);
				},
				sortable: true

			},
			{
				id: 'action',
				width: 128,
				sortable: false,
				Cell: ({ row }) => {
					if (row.original.name != 'Message Point Media') {
						return (
							<div className="flex items-center">
								<PopupState variant="popover" popupId="demo-popup-menu">
									{(popupState) => (
										<React.Fragment>
											<Button color="primary" {...bindTrigger(popupState)}>
												<Icon>more_vert</Icon>
											</Button>
											<Menu {...bindMenu(popupState)}>
												<MenuItem onClick={() => {
													popupState.close()
													if (row) {
														dispatch(openEditOrgDialog(row.original));
													}
												}}>Edit</MenuItem>
												<MenuItem onClick={popupState.close}>Block</MenuItem>
												<MenuItem onClick={() => {
													popupState.close()
													var tempToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFrcm9ubWV0cm9AbWVzc2FnZXBvaW50LmlkIiwicGFzc3dvcmQiOiJhZG1pbjEyMyIsImlhdCI6MTYyOTExNTkwMn0.XCfbjynwdPfmJ919qLcEYB3E734O-W-MRPmmuUVeAqs'
													if (row) {
														dispatch(swithcUser(tempToken));
													}
												}}>Impersonate</MenuItem>
											</Menu>
										</React.Fragment>
									)}
								</PopupState>
							</div>
						)
					} else {
						return (<div></div>)
					}
				}
			}
		],
		[dispatch, user.starred]
	);

	useEffect(() => {
		function getFilteredArray(entities, _searchText) {
			if (_searchText.length === 0) {
				return orgs;
			}
			return FuseUtils.filterArrayByString(orgs, _searchText);
		}

		if (orgs) {
			setFilteredData(getFilteredArray(orgs, searchText));
		}
	}, [orgs, searchText]);

	if (!filteredData) {
		return null;
	}

	if (filteredData.length === 0) {
		return (
			<div className="flex flex-1 items-center justify-center h-full">
				<Typography color="textSecondary" variant="h5">
					There are no orgs!
				</Typography>
			</div>
		);
	}

	return (
		<motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}>
			<OrgsTable
				columns={columns}
				data={filteredData}
				onRowClick={(ev, row) => {
					if (row) {
						// dispatch(openEditOrgDialog(row.original));
					}
				}}
			/>
		</motion.div>
	);
}

const timeDate = (epoch) => {
	return {
		date: moment(epoch).format('YYYY-MM-DD'),
		time: moment(epoch).format('h:mm a')
	}
};

export default OrgsList;
