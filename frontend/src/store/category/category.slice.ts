import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { ICategory } from '@/types/category.interface'

import {
	createCategoryState,
	deleteCategory,
	getCategories,
} from './category.actions'

const initialState: ICategory[] = []

export const categorySlice = createSlice({
	name: 'categories',
	initialState,
	reducers: {
		getCategories: (state, action: PayloadAction<ICategory[]>) =>
			action.payload,
		createCategory: (state, action: PayloadAction<ICategory>) => [
			...state,
			action.payload,
		],
		removeCategory: (state, action: PayloadAction<ICategory['id']>) => {
			return state.filter(product => product.id !== action.payload)
		},
	},
	extraReducers(builder) {
		builder.addCase(
			getCategories.fulfilled,
			(state, action: PayloadAction<ICategory[]>) => action.payload,
		),
			builder.addCase(
				createCategoryState.fulfilled,
				(state, action: PayloadAction<ICategory>) => [...state, action.payload],
			),
			builder.addCase(
				deleteCategory.fulfilled,
				(state, action: PayloadAction<ICategory>) =>
					state.filter(product => product.id !== action.payload.id),
			)
	},
})
