import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getUserData = createAsyncThunk('playerApp/user/getUserData', async () => {
	const response = await axios.get('/api/player-app/user');
	const data = await response.data;
	return data;
});

const userSlice = createSlice({
	name: 'playerApp/user',
	initialState: {},
	reducers: {},
	extraReducers: {
		[getUserData.fulfilled]: (state, action) => action.payload
	}
});

export default userSlice.reducer;
