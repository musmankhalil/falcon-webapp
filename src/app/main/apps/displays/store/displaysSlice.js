import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import { getUserData } from './userSlice';

export const getDisplays = createAsyncThunk('displaysApp/displays/getDisplays', async (routeParams, { getState }) => {
	routeParams = routeParams || getState().displaysApp.displays.routeParams;
	const response = await axios.get('/api/displays-app/displays', {
		params: routeParams
	});
	const data = await response.data;

	return { data, routeParams };
});

export const addDisplay = createAsyncThunk(
	'displaysApp/displays/addDisplay',
	async (display, { dispatch, getState }) => {
		const response = await axios.post('/api/displays-app/add-display', { display });
		const data = await response.data;

		dispatch(getDisplays());

		return data;
	}
);

export const updateDisplay = createAsyncThunk(
	'displaysApp/displays/updateDisplay',
	async (display, { dispatch, getState }) => {
		const response = await axios.post('/api/displays-app/update-display', { display });
		const data = await response.data;

		dispatch(getDisplays());

		return data;
	}
);

export const removeDisplay = createAsyncThunk(
	'displaysApp/displays/removeDisplay',
	async (displayId, { dispatch, getState }) => {
		await axios.post('/api/displays-app/remove-display', { displayId });

		return displayId;
	}
);

export const removeDisplays = createAsyncThunk(
	'displaysApp/displays/removeDisplays',
	async (displayIds, { dispatch, getState }) => {
		await axios.post('/api/displays-app/remove-displays', { displayIds });

		return displayIds;
	}
);

export const toggleStarredDisplay = createAsyncThunk(
	'displaysApp/displays/toggleStarredDisplay',
	async (displayId, { dispatch, getState }) => {
		const response = await axios.post('/api/displays-app/toggle-starred-display', { displayId });
		const data = await response.data;

		dispatch(getUserData());

		dispatch(getDisplays());

		return data;
	}
);

export const toggleStarredDisplays = createAsyncThunk(
	'displaysApp/displays/toggleStarredDisplays',
	async (displayIds, { dispatch, getState }) => {
		const response = await axios.post('/api/displays-app/toggle-starred-displays', { displayIds });
		const data = await response.data;

		dispatch(getUserData());

		dispatch(getDisplays());

		return data;
	}
);

export const setDisplaysStarred = createAsyncThunk(
	'displaysApp/displays/setDisplaysStarred',
	async (displayIds, { dispatch, getState }) => {
		const response = await axios.post('/api/displays-app/set-displays-starred', { displayIds });
		const data = await response.data;

		dispatch(getUserData());

		dispatch(getDisplays());

		return data;
	}
);

export const setDisplaysUnstarred = createAsyncThunk(
	'displaysApp/displays/setDisplaysUnstarred',
	async (displayIds, { dispatch, getState }) => {
		const response = await axios.post('/api/displays-app/set-displays-unstarred', { displayIds });
		const data = await response.data;

		dispatch(getUserData());

		dispatch(getDisplays());

		return data;
	}
);

const displaysAdapter = createEntityAdapter({});

export const { selectAll: selectDisplays, selectById: selectDisplaysById } = displaysAdapter.getSelectors(
	state => state.displaysApp.displays
);

const displaysSlice = createSlice({
	name: 'displaysApp/displays',
	initialState: displaysAdapter.getInitialState({
		searchText: '',
		routeParams: {},
		displayDialog: {
			type: 'new',
			props: {
				open: false
			},
			data: null
		}
	}),
	reducers: {
		setDisplaysSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		},
		openNewDisplayDialog: (state, action) => {
			state.displayDialog = {
				type: 'new',
				props: {
					open: true
				},
				data: null
			};
		},
		closeNewDisplayDialog: (state, action) => {
			state.displayDialog = {
				type: 'new',
				props: {
					open: false
				},
				data: null
			};
		},
		openEditDisplayDialog: (state, action) => {
			state.displayDialog = {
				type: 'edit',
				props: {
					open: true
				},
				data: action.payload
			};
		},
		closeEditDisplayDialog: (state, action) => {
			state.displayDialog = {
				type: 'edit',
				props: {
					open: false
				},
				data: null
			};
		}
	},
	extraReducers: {
		[updateDisplay.fulfilled]: displaysAdapter.upsertOne,
		[addDisplay.fulfilled]: displaysAdapter.addOne,
		[removeDisplays.fulfilled]: (state, action) => displaysAdapter.removeMany(state, action.payload),
		[removeDisplay.fulfilled]: (state, action) => displaysAdapter.removeOne(state, action.payload),
		[getDisplays.fulfilled]: (state, action) => {
			const { data, routeParams } = action.payload;
			displaysAdapter.setAll(state, data);
			state.routeParams = routeParams;
			state.searchText = '';
		}
	}
});

export const {
	setDisplaysSearchText,
	openNewDisplayDialog,
	closeNewDisplayDialog,
	openEditDisplayDialog,
	closeEditDisplayDialog
} = displaysSlice.actions;

export default displaysSlice.reducer;
