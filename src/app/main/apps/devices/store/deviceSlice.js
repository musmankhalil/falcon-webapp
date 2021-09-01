import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import FuseUtils from '@fuse/utils';

export const getProduct = createAsyncThunk('deviceApp/product/getProduct', async params => {
	const response = await axios.get('/api/m-devices-app/product', { params });
	const data = await response.data;

	return data === undefined ? null : data;
});

export const removeProduct = createAsyncThunk(
	'deviceApp/product/removeProduct',
	async (val, { dispatch, getState }) => {
		const { id } = getState().deviceApp.product;
		await axios.post('/api/m-devices-app/remove-product', { id });

		return id;
	}
);

export const saveProduct = createAsyncThunk(
	'deviceApp/product/saveProduct',
	async (productData, { dispatch, getState }) => {
		const { product } = getState().deviceApp;

		const response = await axios.post('/api/m-devices-app/product/save', { ...product, ...productData });
		const data = await response.data;

		return data;
	}
);

const productSlice = createSlice({
	name: 'deviceApp/product',
	initialState: null,
	reducers: {
		resetProduct: () => null,
		newProduct: {
			reducer: (state, action) => action.payload,
			prepare: event => ({
				payload: {
					id: FuseUtils.generateGUID(),
					name: '',
					handle: '',
					description: '',
					categories: [],
					tags: [],
					images: [],
					priceTaxExcl: 0,
					priceTaxIncl: 0,
					taxRate: 0,
					comparedPrice: 0,
					quantity: 0,
					sku: '',
					width: '',
					height: '',
					depth: '',
					weight: '',
					extraShippingFee: 0,
					active: true
				}
			})
		}
	},
	extraReducers: {
		[getProduct.fulfilled]: (state, action) => action.payload,
		[saveProduct.fulfilled]: (state, action) => action.payload,
		[removeProduct.fulfilled]: (state, action) => null
	}
});

export const { newProduct, resetProduct } = productSlice.actions;

export default productSlice.reducer;
