import { combineReducers } from '@reduxjs/toolkit';
import player from './playersSlice';
import user from './userSlice';

const reducer = combineReducers({
	player,
	user
});

export default reducer;
