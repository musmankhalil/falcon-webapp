import { combineReducers } from '@reduxjs/toolkit';
import product from './deviceSlice';
import products from './devicesSlice';

const reducer = combineReducers({
	products,
	product,
});

export default reducer;
