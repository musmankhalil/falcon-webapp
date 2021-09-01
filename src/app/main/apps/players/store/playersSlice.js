import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import { getUserData } from './userSlice';

export const getPlayer = createAsyncThunk('playerApp/player/getPlayer', async (routeParams, { getState }) => {
	routeParams = routeParams || getState().contactsApp.contacts.routeParams;
	const response = await axios.get('/api/displays-app/displays', {
		params: routeParams
	});
	const data = await response.data;

	return { data, routeParams };
});

export const addOrg = createAsyncThunk(
	'playerApp/player/addOrg',
	async (org, { dispatch, getState }) => {
		const response = await axios.post('/api/player-app/add-org', { org });
		const data = await response.data;

		dispatch(getPlayer());

		return data;
	}
);

export const updateOrg = createAsyncThunk(
	'playerApp/player/updateOrg',
	async (org, { dispatch, getState }) => {
		const response = await axios.post('/api/player-app/update-org', { org });
		const data = await response.data;

		dispatch(getPlayer());

		return data;
	}
);

export const removeOrg = createAsyncThunk(
	'playerApp/player/removeOrg',
	async (orgId, { dispatch, getState }) => {
		await axios.post('/api/player-app/remove-org', { orgId });

		return orgId;
	}
);

export const removePlayer = createAsyncThunk(
	'playerApp/player/removePlayer',
	async (orgIds, { dispatch, getState }) => {
		await axios.post('/api/player-app/remove-player', { orgIds });

		return orgIds;
	}
);

export const toggleStarredOrg = createAsyncThunk(
	'playerApp/player/toggleStarredOrg',
	async (orgId, { dispatch, getState }) => {
		const response = await axios.post('/api/player-app/toggle-starred-org', { orgId });
		const data = await response.data;

		dispatch(getUserData());

		dispatch(getPlayer());

		return data;
	}
);

export const toggleStarredPlayer = createAsyncThunk(
	'playerApp/player/toggleStarredPlayer',
	async (orgIds, { dispatch, getState }) => {
		const response = await axios.post('/api/player-app/toggle-starred-player', { orgIds });
		const data = await response.data;

		dispatch(getUserData());

		dispatch(getPlayer());

		return data;
	}
);

export const setPlayerStarred = createAsyncThunk(
	'playerApp/player/setPlayerStarred',
	async (orgIds, { dispatch, getState }) => {
		const response = await axios.post('/api/player-app/set-player-starred', { orgIds });
		const data = await response.data;

		dispatch(getUserData());

		dispatch(getPlayer());

		return data;
	}
);

export const setPlayerUnstarred = createAsyncThunk(
	'playerApp/player/setPlayerUnstarred',
	async (orgIds, { dispatch, getState }) => {
		const response = await axios.post('/api/player-app/set-player-unstarred', { orgIds });
		const data = await response.data;

		dispatch(getUserData());

		dispatch(getPlayer());

		return data;
	}
);

const playerAdapter = createEntityAdapter({});

export const { selectAll: selectPlayer, selectById: selectPlayerById } = playerAdapter.getSelectors(
	state => state.playerApp.player
);

const playerSlice = createSlice({
	name: 'playerApp/player',
	initialState: playerAdapter.getInitialState({
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
		setPlayerSearchText: {
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
		}
	},
	extraReducers: {
		[updateOrg.fulfilled]: playerAdapter.upsertOne,
		[addOrg.fulfilled]: playerAdapter.addOne,
		[removePlayer.fulfilled]: (state, action) => playerAdapter.removeMany(state, action.payload),
		[removeOrg.fulfilled]: (state, action) => playerAdapter.removeOne(state, action.payload),
		[getPlayer.fulfilled]: (state, action) => {
			const { data, routeParams } = action.payload;
			playerAdapter.setAll(state, data);
			state.routeParams = routeParams;
			state.searchText = '';
		}
	}
});

export const {
	setPlayerSearchText,
	openNewOrgDialog,
	closeNewOrgDialog,
	openEditOrgDialog,
	closeEditOrgDialog
} = playerSlice.actions;

export default playerSlice.reducer;
