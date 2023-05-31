import { createAsyncThunk } from '@reduxjs/toolkit'

import { CategoryType, ICategory } from '@/types/category.interface'

import { AsyncThunkConfig } from '@/utils/asyncThunkConfig'

import { CategoryService } from '@/services/category.service'

export const getCategories = createAsyncThunk(
	'categories/get',
	async (_, thunkApi) => {
		try {
			const response = await CategoryService.getAll()

			return response.data
		} catch (error) {
			return thunkApi.rejectWithValue({
				errorMessage: 'Failed to fetch product by id',
			})
		}
	},
)

export const createCategoryState = createAsyncThunk<
	ICategory,
	CategoryType,
	AsyncThunkConfig
>('categories/createCategory', async (data, thunkApi) => {
	try {
		const response = await CategoryService.createCategory(data)

		return response
	} catch (error) {
		return thunkApi.rejectWithValue({
			errorMessage: 'Failed to fetch product by id',
		})
	}
})

export const deleteCategory = createAsyncThunk<
	ICategory,
	{ id: string | number },
	AsyncThunkConfig
>('categories/deleteCategory', async ({ id }, thunkApi) => {
	try {
		const response = await CategoryService.deleteCategory(id)

		if (response.status !== 200) {
			throw new Error('Failed to delete product')
		}

		return response.data
	} catch (error) {
		return thunkApi.rejectWithValue({
			errorMessage: 'Failed to fetch product by id',
		})
	}
})
