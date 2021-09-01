import { motion } from 'framer-motion';
import FuseUtils from '@fuse/utils';
import Icon from '@material-ui/core/Icon';
import SvgIcon from 'app/shared-components/svg';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { useMemo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DisplaysMultiSelectMenu from './DisplaysMultiSelectMenu';
import DisplaysTable from './DisplaysTable';
import { openEditDisplayDialog, removeDisplay, toggleStarredDisplay, selectDisplays } from './store/displaysSlice';

const useStyles = makeStyles({
	typeIcon: {
		'&.bus:before': {
			content: "'directions_bus'",
		},
		'&.indoor:before': {
			content: "'insert_drive_file'",
		},
		'&.spreadsheet:before': {
			content: "'insert_chart'",
		}
	},
	typeLine: {
		'&.error:before': {
			content: "'maximize'",
			color: '#ff0000'
		},
		'&.critical:before': {
			content: "'maximize'",
			color: '#d59c1c'
		},
		'&.normal:before': {
			content: "'maximize'",
			color: '#079505'
		}
	}
});

function DisplaysList(props) {
	const dispatch = useDispatch();
	const displays = useSelector(selectDisplays);
	const searchText = useSelector(({ displaysApp }) => displaysApp.displays.searchText);
	const user = useSelector(({ displaysApp }) => displaysApp.user);

	const classes = useStyles();
	const [filteredData, setFilteredData] = useState(null);

	const columns = useMemo(
		() => [
			{
				Header: 'Type',
				accessor: 'type',
				sortable: true,
				Cell: ({ row }) => {
					return (
						<div className="flex flex-col">
							<Icon className={clsx(classes.typeIcon, row.original.type, 'text-35')} />
							<Icon className={clsx(classes.typeLine, row.original.issue, 'text-35 line-svg')} />
						</div>
					);
				},
			},
			{
				Header: 'Display Name',
				accessor: 'display-name',
				sortable: true,
				Cell: ({ row }) => {
					return (
						<div>
							<div>{row.original.name}</div>
							<div className={clsx(row.original.issue)}>{row.original.issue}</div>
						</div>
					);
				},
			},
			{
				Header: 'Equip',
				accessor: 'equip',
				sortable: true,
				Cell: ({ row }) => {
					return (
						<div className="flex flex-col">
							<span className="material-icons MuiIcon-root-213 bus text-35">
								<SvgIcon color="#fff" width="1em" Height="1em" >equip</SvgIcon>
							</span>
							<Icon className={clsx(classes.typeLine, row.original.issue, 'text-35 line-svg')} />
						</div>
					);
				},
			},
			{
				Header: 'HW Log',
				accessor: 'hw-log',
				sortable: true,
				Cell: ({ row }) => {
					return (
						<div className="flex flex-col">
							<span className="material-icons MuiIcon-root-213 bus text-35">
								<SvgIcon color="#fff" width="1em" Height="1em" >hw-log</SvgIcon>
							</span>
							<Icon className={clsx(classes.typeLine, row.original.issue, 'text-35 line-svg')} />
						</div>
					);
				},
			},
			{
				Header: 'App Log',
				accessor: 'app-log',
				sortable: true,
				Cell: ({ row }) => {
					return (
						<div className="flex flex-col">
							<span className="material-icons MuiIcon-root-213 bus text-35">
								<SvgIcon color="#fff" width="1em" Height="1em" >app-log</SvgIcon>
							</span>
							<Icon className={clsx(classes.typeLine, row.original.issue, 'text-35 line-svg')} />
						</div>
					);
				},
			},
			{
				Header: 'CMS Log',
				accessor: 'cms-log',
				sortable: true,
				Cell: ({ row }) => {
					return (
						<div className="flex flex-col">
							<span className="material-icons MuiIcon-root-213 bus text-35">
								<SvgIcon color="#fff" width="1em" Height="1em" >cms-log</SvgIcon>
							</span>
							<Icon className={clsx(classes.typeLine, row.original.issue, 'text-35 line-svg')} />
						</div>
					);
				},
			},
			{
				Header: 'CMD',
				accessor: 'cmd',
				sortable: true,
				Cell: ({ row }) => {
					return (
						<div className="flex flex-col">
							<span className="material-icons MuiIcon-root-213 bus text-35">
								<SvgIcon color="#fff" width="1em" Height="1em" >cmd</SvgIcon>
							</span>
							<Icon className={clsx(classes.typeLine, row.original.issue, 'text-35 line-svg')} />
						</div>
					);
				},
			},
			{
				Header: 'Info',
				accessor: 'info',
				sortable: true,
				Cell: ({ row }) => {
					return (
						<div className="flex flex-col">
							<span className="material-icons MuiIcon-root-213 bus text-35">
								<SvgIcon color="#fff" width="1em" Height="1em" >info</SvgIcon>
							</span>
							<Icon className={clsx(classes.typeLine, row.original.issue, 'text-35 line-svg')} />
						</div>
					);
				},
			},
			{
				Header: 'Contact',
				accessor: 'contact',
				sortable: true,
				Cell: ({ row }) => {
					return (
						<div className="flex flex-col">
							<span className="material-icons MuiIcon-root-213 bus text-35">
								<SvgIcon color="#fff" width="1em" Height="1em" >contact</SvgIcon>
							</span>
							<Icon className={clsx(classes.typeLine, row.original.issue, 'text-35 line-svg')} />
						</div>
					);
				},
			},
			{
				Header: 'Location',
				accessor: 'location',
				sortable: true,
				Cell: ({ row }) => {
					return (
						<div className="flex flex-col">
							<span className="material-icons MuiIcon-root-213 bus text-35">
								<SvgIcon color="#fff" width="1em" Height="1em" >location</SvgIcon>
							</span>
							<Icon className={clsx(classes.typeLine, row.original.issue, 'text-35 line-svg')} />
						</div>
					);
				},
			},
			{
				Header: ({ selectedFlatRows }) => {
					const selectedRowIds = selectedFlatRows.map(row => row.original.id);

					return (
						selectedFlatRows.length > 0 && <DisplaysMultiSelectMenu selectedContactIds={selectedRowIds} />
					);
				},
				accessor: 'avatar',
				Cell: ({ row }) => {
					return (
						<span></span>
					);
				},
				width: 64,
				sortable: false
			}
		],
		[dispatch, user.starred]
	);

	useEffect(() => {
		function getFilteredArray(entities, _searchText) {
			if (_searchText.length === 0) {
				return displays;
			}
			return FuseUtils.filterArrayByString(displays, _searchText);
		}

		if (displays) {
			setFilteredData(getFilteredArray(displays, searchText));
		}
	}, [displays, searchText]);

	if (!filteredData) {
		return null;
	}

	if (filteredData.length === 0) {
		return (
			<div className="flex flex-1 items-center justify-center h-full">
				<Typography color="textSecondary" variant="h5">
					There are no displays!
				</Typography>
			</div>
		);
	}

	return (
		<motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}>
			<DisplaysTable
				columns={columns}
				data={filteredData}
				onRowClick={(ev, row) => {
					if (row) {
						// dispatch(openEditDisplayDialog(row.original));
					}
				}}
			/>
		</motion.div>
	);
}

export default DisplaysList;
