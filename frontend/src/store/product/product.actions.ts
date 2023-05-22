import { createAsyncThunk } from '@reduxjs/toolkit'

import { IProduct } from '@/types/product.interface'

import { productSlice } from './product.slice'
import { ProductService } from '@/services/product/product.service'
import { ProductType } from '@/services/product/product.types'

export interface AsyncThunkConfig {
	rejectValue: { errorMessage: string }
}

export const create = createAsyncThunk<IProduct, ProductType, AsyncThunkConfig>(
	'products/createProduct',
	async (data, thunkApi) => {
		try {
			const product = await ProductService.createProduct(data)

			console.log(product)

			return product
		} catch (error) {
			return thunkApi.rejectWithValue({
				errorMessage: 'Failed to fetch product by id',
			})
		}
	},
)

export const deleteProduct = createAsyncThunk<
	IProduct,
	{ id: string | number; fId: number[] },
	AsyncThunkConfig
>('products/deleteProduct', async ({ id, fId }, thunkApi) => {
	try {
		const response = await ProductService.deleteProduct(id, fId)

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
