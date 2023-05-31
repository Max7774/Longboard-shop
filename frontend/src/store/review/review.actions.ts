import { createAsyncThunk } from '@reduxjs/toolkit'

import { IReview } from '@/types/review.interface'

import { AsyncThunkConfig } from '@/utils/asyncThunkConfig'

import { DataType, ReviewService } from '@/services/review.service'

export const getReview = createAsyncThunk<
	IReview[],
	undefined,
	AsyncThunkConfig
>('reviews/getReviews', async (_, thunkApi) => {
	try {
		const response = await ReviewService.getAll()

		console.log(response.data)

		return response.data
	} catch (error) {
		return thunkApi.rejectWithValue({
			errorMessage: 'Failed to fetch product by id',
		})
	}
})

export const createReview = createAsyncThunk<
	IReview,
	DataType,
	AsyncThunkConfig
>('reviews/createReview', async (data, thunkApi) => {
	try {
		const response = await ReviewService.createReview(data.productId, data)

		return response
	} catch (error) {
		return thunkApi.rejectWithValue({
			errorMessage: 'Failed to fetch product by id',
		})
	}
})
