import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { IProduct } from '@/types/product.interface'

import { create, deleteProduct, getProductsAll } from './products.actions'

const initialState: IProduct[] = []

export const productSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {
		getProducts: (state, action: PayloadAction<IProduct[]>) => {
			;[...state, ...action.payload]
		},
		removeProduct: (state, action: PayloadAction<{ id: number }>) => {
			state.filter(product => product.id !== action.payload.id)
		},
		createProduct: (state, action: PayloadAction<IProduct>) => [
			...state,
			action.payload,
		],
	},
	extraReducers: builder => {
		builder.addCase(
			getProductsAll.fulfilled,
			(state, action: PayloadAction<IProduct[]>) => action.payload,
		),
			builder.addCase(
				deleteProduct.fulfilled,
				(state, action: PayloadAction<IProduct>) => {
					state.filter(product => product.id !== action.payload.id)
				},
			)
		builder.addCase(
			create.fulfilled,
			(state, action: PayloadAction<IProduct>) => {
				;[...state, action.payload]
			},
		)
	},
})
