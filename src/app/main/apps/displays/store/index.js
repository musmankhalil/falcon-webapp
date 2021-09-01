import { combineReducers } from '@reduxjs/toolkit';
import displays from './displaysSlice';
import user from './userSlice';

const reducer = combineReducers({
	displays,
	user
});

export default reducer;
