import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { IProduct } from '@/types/product.interface'

import { create, deleteProduct } from './product.actions'
import { InitialProductSateType } from './product.types'

const initialState: InitialProductSateType = {
	products: [],
}

export const productSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {
		getProducts: (state, action: PayloadAction<IProduct[]>) => {
			state.products = action.payload
		},
		removeProduct: (state, action: PayloadAction<{ id: number }>) => {
			state.products.filter(product => product.id !== action.payload.id)
		},
		createProduct: (state, action: PayloadAction<IProduct>) => {
			;[...state.products, action.payload]
		},
	},
	extraReducers: builder => {
		builder.addCase(
			deleteProduct.fulfilled,
			(state, action: PayloadAction<IProduct>) => {
				state.products.filter(product => product.id !== action.payload.id)
			},
		)
		builder.addCase(
			create.fulfilled,
			(state, action: PayloadAction<IProduct>) => {
				;[...state.products, action.payload]
			},
		)
	},
})

export const { createProduct } = productSlice.actions
