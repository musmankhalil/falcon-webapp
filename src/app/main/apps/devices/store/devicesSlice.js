import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';

export const getProducts = createAsyncThunk('deviceApp/products/getProducts', async () => {
	const response = await axios.get('/api/m-devices-app/products');
	const data = await response.data;

	return data;
});

export const removeProducts = createAsyncThunk(
	'deviceApp/products/removeProducts',
	async (productIds, { dispatch, getState }) => {
		await axios.post('/api/m-devices-app/remove-products', { productIds });

		return productIds;
	}
);

const productsAdapter = createEntityAdapter({});

export const { selectAll: selectProducts, selectById: selectProductById } = productsAdapter.getSelectors(
	state => state.deviceApp.products
);

const productsSlice = createSlice({
	name: 'deviceApp/products',
	initialState: productsAdapter.getInitialState({
		searchText: ''
	}),
	reducers: {
		setProductsSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: {
		[getProducts.fulfilled]: productsAdapter.setAll,
		[removeProducts.fulfilled]: (state, action) => productsAdapter.removeMany(state, action.payload)
	}
});

export const { setProductsSearchText } = productsSlice.actions;

export default productsSlice.reducer;
