import FuseScrollbars from '@fuse/core/FuseScrollbars';
import _ from '@lodash';
import Checkbox from '@material-ui/core/Checkbox';
import Icon from '@material-ui/core/Icon';
import SvgIcon from 'app/shared-components/svg';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import FuseLoading from '@fuse/core/FuseLoading';
import { getProducts, selectProducts } from '../store/devicesSlice';
import ProductsTableHead from './DevicesTableHead';

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

function ProductsTable(props) {
	const dispatch = useDispatch();
	const classes = useStyles();
	const products = useSelector(selectProducts);
	const searchText = useSelector(({ deviceApp }) => deviceApp.products.searchText);

	const [loading, setLoading] = useState(true);
	const [selected, setSelected] = useState([]);
	const [data, setData] = useState(products);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [order, setOrder] = useState({
		direction: 'asc',
		id: null
	});

	useEffect(() => {
		dispatch(getProducts()).then(() => setLoading(false));
	}, [dispatch]);

	useEffect(() => {
		if (searchText.length !== 0) {
			setData(_.filter(products, item => item.name.toLowerCase().includes(searchText.toLowerCase())));
			setPage(0);
		} else {
			setData(products);
		}
	}, [products, searchText]);

	function handleRequestSort(event, property) {
		const id = property;
		let direction = 'desc';

		if (order.id === property && order.direction === 'desc') {
			direction = 'asc';
		}

		setOrder({
			direction,
			id
		});
	}

	function handleSelectAllClick(event) {
		if (event.target.checked) {
			setSelected(data.map(n => n.id));
			return;
		}
		setSelected([]);
	}

	function handleDeselect() {
		setSelected([]);
	}

	function handleClick(item) {
		props.history.push(`/apps/devices/${item.id}/${item.handle}`);
	}

	function handleCheck(event, id) {
		const selectedIndex = selected.indexOf(id);
		let newSelected = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, id);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
		}

		setSelected(newSelected);
	}

	function handleChangePage(event, value) {
		setPage(value);
	}

	function handleChangeRowsPerPage(event) {
		setRowsPerPage(event.target.value);
	}

	if (loading) {
		return <FuseLoading />;
	}

	if (data.length === 0) {
		return (
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1, transition: { delay: 0.1 } }}
				className="flex flex-1 items-center justify-center h-full"
			>
				<Typography color="textSecondary" variant="h5">
					There are no products!
				</Typography>
			</motion.div>
		);
	}

	return (
		<div className="w-full flex flex-col">
			<FuseScrollbars className="flex-grow overflow-x-auto">
				<Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
					<ProductsTableHead
						selectedProductIds={selected}
						order={order}
						onSelectAllClick={handleSelectAllClick}
						onRequestSort={handleRequestSort}
						rowCount={data.length}
						onMenuItemClick={handleDeselect}
					/>

					<TableBody>
						{_.orderBy(
							data,
							[
								o => {
									switch (order.id) {
										case 'categories': {
											return o.categories[0];
										}
										default: {
											return o[order.id];
										}
									}
								}
							],
							[order.direction]
						)
							.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							.map(n => {
								const isSelected = selected.indexOf(n.id) !== -1;
								return (
									<TableRow
										className="h-72"
										role="checkbox"
										aria-checked={isSelected}
										tabIndex={-1}
										key={n.id}
										selected={isSelected}
									>
										<TableCell className="w-40 md:w-64 text-center" padding="none">
											<Checkbox
												checked={isSelected}
												onClick={event => event.stopPropagation()}
												onChange={event => handleCheck(event, n.id)}
											/>
										</TableCell>

										<TableCell className="p-4 md:p-8" component="th" scope="row">
											<div className="flex flex-col">
												<Icon className={clsx(classes.typeIcon, n.type, 'text-35')} />
												<Icon className={clsx(classes.typeLine, n.issue, 'text-35 line-svg')} />
											</div>
										</TableCell>

										<TableCell className="p-4 md:p-8" component="th" scope="row">
											<div>
												<div>{n.name}</div>
												<div className={clsx(n.issue)}>{n.issue}</div>
											</div>
										</TableCell>

										<TableCell className="p-4 md:p-8" component="th" scope="row">
											<div className="flex flex-col">
												<span className="material-icons MuiIcon-root-213 bus text-35">
													<SvgIcon color="#fff" width="1em" Height="1em" >equip</SvgIcon>
												</span>
												<Icon className={clsx(classes.typeLine, n.issue, 'text-35 line-svg')} />
											</div>
										</TableCell>

										<TableCell className="p-4 md:p-8" component="th" scope="row">
											<div className="flex flex-col">
												<span className="material-icons MuiIcon-root-213 bus text-35">
													<SvgIcon color="#fff" width="1em" Height="1em" >hw-log</SvgIcon>
												</span>
												<Icon className={clsx(classes.typeLine, n.issue, 'text-35 line-svg')} />
											</div>
										</TableCell>

										<TableCell className="p-4 md:p-8" component="th" scope="row">
											<div className="flex flex-col">
												<span className="material-icons MuiIcon-root-213 bus text-35">
													<SvgIcon color="#fff" width="1em" Height="1em" >app-log</SvgIcon>
												</span>
												<Icon className={clsx(classes.typeLine, n.issue, 'text-35 line-svg')} />
											</div>
										</TableCell>

										<TableCell className="p-4 md:p-8" component="th" scope="row">
											<div className="flex flex-col">
												<span className="material-icons MuiIcon-root-213 bus text-35">
													<SvgIcon color="#fff" width="1em" Height="1em" >cms-log</SvgIcon>
												</span>
												<Icon className={clsx(classes.typeLine, n.issue, 'text-35 line-svg')} />
											</div>
										</TableCell>

										<TableCell className="p-4 md:p-8" component="th" scope="row">
											<div className="flex flex-col">
												<span className="material-icons MuiIcon-root-213 bus text-35">
													<SvgIcon pointer="cursor-pointer" color="#fff" width="1em" Height="1em"
														obj={n} props={props} tag="4"
													>cmd</SvgIcon>
												</span>
												<Icon className={clsx(classes.typeLine, n.issue, 'text-35 line-svg')} />
											</div>
										</TableCell>

										<TableCell className="p-4 md:p-8" component="th" scope="row">
											<div className="flex flex-col">
												<span className="material-icons MuiIcon-root-213 bus text-35">
													<SvgIcon pointer="cursor-pointer" color="#fff" width="1em" Height="1em"
														obj={n} props={props} tag="3"
													>info</SvgIcon>
												</span>
												<Icon className={clsx(classes.typeLine, n.issue, 'text-35 line-svg')} />
											</div>
										</TableCell>

										<TableCell className="p-4 md:p-8" component="th" scope="row">
											<div className="flex flex-col">
												<span className="material-icons MuiIcon-root-213 bus text-35">
													<SvgIcon color="#fff" width="1em" Height="1em" >contact</SvgIcon>
												</span>
												<Icon className={clsx(classes.typeLine, n.issue, 'text-35 line-svg')} />
											</div>
										</TableCell>

										<TableCell className="p-4 md:p-8" component="th" scope="row">
											<div className="flex flex-col">
												<span className="material-icons MuiIcon-root-213 bus text-35">
													<SvgIcon pointer="cursor-pointer" color="#fff" width="1em" Height="1em"
														obj={n} props={props} tag="5"
													>location</SvgIcon>
												</span>
												<Icon className={clsx(classes.typeLine, n.issue, 'text-35 line-svg')} />
											</div>
										</TableCell>
									</TableRow>
								);
							})}
					</TableBody>
				</Table>
			</FuseScrollbars>

			<TablePagination
				className="flex-shrink-0 border-t-1"
				component="div"
				count={data.length}
				rowsPerPage={rowsPerPage}
				page={page}
				backIconButtonProps={{
					'aria-label': 'Previous Page'
				}}
				nextIconButtonProps={{
					'aria-label': 'Next Page'
				}}
				onChangePage={handleChangePage}
				onChangeRowsPerPage={handleChangeRowsPerPage}
			/>
		</div>
	);
}

export default withRouter(ProductsTable);
