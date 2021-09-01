import { combineReducers } from '@reduxjs/toolkit';
import orgs from './orgsSlice';
import user from './userSlice';

const reducer = combineReducers({
	orgs,
	user
});

export default reducer;
