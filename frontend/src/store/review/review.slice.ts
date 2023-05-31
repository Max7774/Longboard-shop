import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { IReview } from '@/types/review.interface'

import { createReview, getReview } from './review.actions'
import { DataType } from '@/services/review.service'

const initialState: IReview[] = []

export const reviewSlice = createSlice({
	name: 'reviews',
	initialState,
	reducers: {
		setReviews: (state, action: PayloadAction<IReview[]>) => action.payload,
		addReview: (state, action: PayloadAction<IReview>) => [
			...state,
			action.payload,
		],
	},
	extraReducers: builder => {
		builder.addCase(
			getReview.fulfilled,
			(state, action: PayloadAction<IReview[]>) => action.payload,
		)
		builder.addCase(
			createReview.fulfilled,
			(state, action: PayloadAction<IReview>) => [action.payload, ...state],
		)
	},
})
