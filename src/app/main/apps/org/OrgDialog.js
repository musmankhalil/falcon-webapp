import FuseUtils from '@fuse/utils/FuseUtils';
import { yupResolver } from '@hookform/resolvers/yup';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { useCallback, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { closeDialog, openDialog } from 'app/store/fuse/dialogSlice';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import React from 'react'
import moment from 'moment';

import _ from '@lodash';
import * as yup from 'yup';

import {
	removeOrg,
	updateOrg,
	addOrg,
	closeNewOrgDialog,
	closeEditOrgDialog,
} from './store/orgsSlice';

const defaultValues = {
	id: '',
	name: '',
	avatar: 'assets/images/avatars/profile.jpg',
	email: '',
	password: '',
	accountStatus: 0,
	players: 0,
	api_key: '',
	created: moment()
};

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
	name: yup.string().required('You must enter a organization name'),
	email: yup.string().email('You must enter a valid email').required('You must enter a email'),
	password: yup
		.string()
		.required('Please enter your password.')
		.min(8, 'Password is too short - should be 8 chars minimum.')
});

function OrgDialog(props) {
	const dispatch = useDispatch();
	const orgDialog = useSelector(({ orgsApp }) => orgsApp.orgs.orgDialog);

	const { control, watch, reset, handleSubmit, formState, getValues } = useForm({
		mode: 'onChange',
		defaultValues,
		resolver: yupResolver(schema)
	});

	const { isValid, dirtyFields, errors } = formState;

	const id = watch('id');
	const name = watch('name');
	const avatar = watch('avatar');

	/**
	 * Initialize Dialog with Data
	 */
	const initDialog = useCallback(() => {
		/**
		 * Dialog type: 'edit'
		 */
		if (orgDialog.type === 'edit' && orgDialog.data) {
			reset({ ...orgDialog.data });
		}

		/**
		 * Dialog type: 'new'
		 */
		if (orgDialog.type === 'new') {
			reset({
				...defaultValues,
				...orgDialog.data,
				id: FuseUtils.generateGUID()
			});
		}
	}, [orgDialog.data, orgDialog.type, reset]);

	/**
	 * On Dialog Open
	 */
	useEffect(() => {
		if (orgDialog.props.open) {
			initDialog();
		}
	}, [orgDialog.props.open, initDialog]);

	/**
	 * Close Dialog
	 */
	function closeComposeDialog() {
		return orgDialog.type === 'edit' ? dispatch(closeEditOrgDialog()) : dispatch(closeNewOrgDialog());
	}

	/**
	 * Form Submit
	 */
	function onSubmit(data) {
		if (orgDialog.type === 'new') {
			delete data.id
			data.created = moment(data.created).valueOf()
			data.userId = 1;
			data.accountStatus = 1;
			dispatch(addOrg(data));
		} else {
			dispatch(updateOrg({ ...orgDialog.data, ...data }));
		}
		closeComposeDialog();
	}

	/**
	 * Remove Event
	 */
	function handleRemove() {
		alert(id)
		dispatch(removeOrg(id));
		closeComposeDialog();
	}

	return (
		<Dialog
			classes={{
				paper: 'm-24'
			}}
			{...orgDialog.props}
			onClose={closeComposeDialog}
			fullWidth
			maxWidth="xs"
		>
			<AppBar position="static" elevation={0}>
				<Toolbar className="flex w-full">
					<Typography variant="subtitle1" color="inherit">
						{orgDialog.type === 'new' ? 'New Org' : 'Edit Org'}
					</Typography>
				</Toolbar>
				<div className="flex flex-col items-center justify-center pb-24">
					<Avatar className="w-96 h-96" alt="org avatar" src={avatar} />
					{orgDialog.type === 'edit' && (
						<Typography variant="h6" color="inherit" className="pt-8">
							{name}
						</Typography>
					)}
				</div>
			</AppBar>
			<form noValidate onSubmit={handleSubmit(onSubmit)} className="flex flex-col md:overflow-hidden">
				<DialogContent classes={{ root: 'p-24' }}>
					<div className="flex">
						<div className="min-w-48 pt-20">
							<Icon color="action">account_circle</Icon>
						</div>
						<Controller
							control={control}
							name="name"
							render={({ field }) => (
								<TextField
									{...field}
									className="mb-24"
									label="Organization Name"
									id="name"
									error={!!errors.name}
									helperText={errors?.name?.message}
									variant="outlined"
									required
									fullWidth
								/>
							)}
						/>
					</div>

					<div className="flex">
						<div className="min-w-48 pt-20">
							<Icon color="action">email</Icon>
						</div>
						<Controller
							name="email"
							control={control}
							render={({ field }) => (
								<TextField
									{...field}
									className="mb-24"
									label="Email"
									autoFocus
									type="email"
									error={!!errors.email}
									helperText={errors?.email?.message}
									variant="outlined"
									required
									fullWidth
								/>
							)}
						/>
					</div>

					<div className="flex">
						<div className="min-w-48 pt-20">
							<Icon color="action">enhanced_encryption</Icon>
						</div>

						<Controller
							name="password"
							control={control}
							render={({ field }) => (
								<TextField
									{...field}
									className="mb-24"
									label="Password"
									type="password"
									error={!!errors.password}
									helperText={errors?.password?.message}
									variant="outlined"
									required
									fullWidth
								/>
							)}
						/>
					</div>

					<div className="flex">
						<div className="min-w-48 pt-20">
							<Icon color="action">api</Icon>
						</div>
						<Controller
							control={control}
							name="api_key"
							render={({ field }) => (
								<TextField
									{...field}
									className="mb-24"
									label="API Key"
									id="api_key"
									variant="outlined"
									required
									fullWidth
								/>
							)}
						/>
					</div>
				</DialogContent>

				{orgDialog.type === 'new' ? (
					<DialogActions className="justify-between p-4 pb-16">
						<div className="px-16">
							<Button
								variant="contained"
								color="secondary"
								type="submit"
								disabled={_.isEmpty(dirtyFields) || !isValid}
							>
								Add
							</Button>
						</div>
					</DialogActions>
				) : (
					<DialogActions className="justify-between p-4 pb-16">
						<div className="px-16">
							<Button
								variant="contained"
								color="secondary"
								type="submit"
								disabled={_.isEmpty(dirtyFields) || !isValid}
							>
								Save
							</Button>
						</div>
						<IconButton onClick={() => dispatch(openDialog({
							children: (
								<React.Fragment>
									<DialogTitle id="alert-dialog-title">Are you sure?</DialogTitle>
									<DialogContent>
										<DialogContentText id="alert-dialog-description">
											This action is irrevrsible. Once removed you won't be able to undo this action
										</DialogContentText>
									</DialogContent>
									<DialogActions>
										<Button onClick={() => {
											handleRemove();
											dispatch(closeDialog())
										}} >
											Confirm
										</Button>
										<Button onClick={() => dispatch(closeDialog())} autoFocus>
											Cancel
										</Button>
									</DialogActions>
								</React.Fragment>
							)
						}))}>
							<Icon>delete</Icon>
						</IconButton>
					</DialogActions>
				)}
			</form>
		</Dialog >
	);
}

export default OrgDialog;
