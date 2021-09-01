import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
dotenv.config();
import { getUserData } from './userSlice';
import dotenv from 'dotenv'
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid'

const defaultUserSettings = '{"displayName":"Usman Khalil","photoURL":"assets/images/avatars/chandler.jpg","email":"admin@mpmedia.tv","settings":{"layout":{"style":"layout1","config":{"scroll":"content","navbar":{"display":true,"folded":true,"position":"left"},"toolbar":{"display":true,"style":"fixed","position":"below"},"mode":"fullwidth"}},"customScrollbars":true,"theme":{"main":"defaultDark","navbar":"defaultDark","toolbar":"defaultDark","footer":"defaultDark"}},"shortcuts":["calendar","mail","contacts"]}';

export const getOrgs = createAsyncThunk('orgsApp/orgs/getOrgs', async (routeParams, { getState }) => {
	routeParams = routeParams || getState().orgsApp.orgs.routeParams;
	const response = await axios.get(`${process.env.REACT_APP_API_URL}/orgs/get`, {
		params: routeParams
	});
	const data = await response.data;

	return { data, routeParams };
});

export const addOrg = createAsyncThunk('orgsApp/orgs/addOrg', async (org, { dispatch, getState }) => {
	org.uuid = uuidv4()
	org.role = 'orgAdmin'
	var userSet = JSON.parse(defaultUserSettings)
	userSet.displayName = org.name
	userSet.email = org.email
	userSet = JSON.stringify(userSet)
	org.userData = userSet
	const response = await axios.post(`${process.env.REACT_APP_API_URL}/orgs/add`, { org });
	const data = await response.data;
	dispatch(addOrgRow(org))
	return data;
});

export const updateOrg = createAsyncThunk(
	'orgsApp/orgs/updateOrg',
	async (org, { dispatch, getState }) => {
		const response = await axios.post('/api/orgs-app/update-org', { org });
		const data = await response.data;

		dispatch(getOrgs());

		return data;
	}
);

export const removeOrg = createAsyncThunk('orgsApp/orgs/removeOrg', async (orgId, { dispatch, getState }) => {
	await axios.post(`${process.env.REACT_APP_API_URL}/org/remove`, { orgId });

	return orgId;
}
);

export const removeOrgs = createAsyncThunk(
	'orgsApp/orgs/removeOrgs',
	async (orgIds, { dispatch, getState }) => {
		await axios.post('/api/orgs-app/remove-orgs', { orgIds });

		return orgIds;
	}
);

export const toggleStarredOrg = createAsyncThunk(
	'orgsApp/orgs/toggleStarredOrg',
	async (orgId, { dispatch, getState }) => {
		const response = await axios.post('/api/orgs-app/toggle-starred-org', { orgId });
		const data = await response.data;

		dispatch(getUserData());

		dispatch(getOrgs());

		return data;
	}
);

export const toggleStarredOrgs = createAsyncThunk(
	'orgsApp/orgs/toggleStarredOrgs',
	async (orgIds, { dispatch, getState }) => {
		const response = await axios.post('/api/orgs-app/toggle-starred-orgs', { orgIds });
		const data = await response.data;

		dispatch(getUserData());

		dispatch(getOrgs());

		return data;
	}
);

export const setOrgsStarred = createAsyncThunk(
	'orgsApp/orgs/setOrgsStarred',
	async (orgIds, { dispatch, getState }) => {
		const response = await axios.post('/api/orgs-app/set-orgs-starred', { orgIds });
		const data = await response.data;

		dispatch(getUserData());

		dispatch(getOrgs());

		return data;
	}
);

export const setOrgsUnstarred = createAsyncThunk(
	'orgsApp/orgs/setOrgsUnstarred',
	async (orgIds, { dispatch, getState }) => {
		const response = await axios.post('/api/orgs-app/set-orgs-unstarred', { orgIds });
		const data = await response.data;

		dispatch(getUserData());

		dispatch(getOrgs());

		return data;
	}
);

const orgsAdapter = createEntityAdapter({});

export const { selectAll: selectOrgs, selectById: selectOrgsById } = orgsAdapter.getSelectors(
	state => state.orgsApp.orgs
);

const orgsSlice = createSlice({
	name: 'orgsApp/orgs',
	initialState: orgsAdapter.getInitialState({
		searchText: '',
		routeParams: {},
		orgDialog: {
			type: 'new',
			props: {
				open: false
			},
			data: null
		}
	}),
	reducers: {
		setOrgsSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		},
		openNewOrgDialog: (state, action) => {
			state.orgDialog = {
				type: 'new',
				props: {
					open: true
				},
				data: null
			};
		},

		closeNewOrgDialog: (state, action) => {
			state.orgDialog = {
				type: 'new',
				props: {
					open: false
				},
				data: null
			};
		},
		openEditOrgDialog: (state, action) => {
			state.orgDialog = {
				type: 'edit',
				props: {
					open: true
				},
				data: action.payload
			};
		},
		closeEditOrgDialog: (state, action) => {
			state.orgDialog = {
				type: 'edit',
				props: {
					open: false
				},
				data: null
			};
		},
		addOrgRow: orgsAdapter.addOne
	},
	extraReducers: {
		[updateOrg.fulfilled]: orgsAdapter.upsertOne,
		[addOrg.fulfilled]: orgsAdapter.addOne,
		[removeOrgs.fulfilled]: (state, action) => orgsAdapter.removeMany(state, action.payload),
		[removeOrg.fulfilled]: (state, action) => orgsAdapter.removeOne(state, action.payload),
		[getOrgs.fulfilled]: (state, action) => {
			const { data, routeParams } = action.payload;
			orgsAdapter.setAll(state, data);
			state.routeParams = routeParams;
			state.searchText = '';
		}
	}
});

export const {
	setOrgsSearchText,
	openNewOrgDialog,
	closeNewOrgDialog,
	openEditOrgDialog,
	closeEditOrgDialog,
	addOrgRow
} = orgsSlice.actions;

export default orgsSlice.reducer;
