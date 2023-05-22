import { createAsyncThunk } from '@reduxjs/toolkit'

import { IProduct, TypePaginationProducts } from '@/types/product.interface'

import { productSlice } from './products.slice'
import { ProductService } from '@/services/product/product.service'
import { ProductType } from '@/services/product/product.types'

export interface AsyncThunkConfig {
	rejectValue: { errorMessage: string }
}

export const getProductsAll = createAsyncThunk(
	'products/getProducts',
	async (_, { rejectWithValue, dispatch }) => {
		try {
			const response = await ProductService.getAll()
			dispatch(productSlice.actions.getProducts(response.products))
			return response.products
		} catch (error) {
			return rejectWithValue({
				errorMessage: 'Failed to fetch product by id',
			})
		}
	},
)

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
	{ id: string | number },
	AsyncThunkConfig
>('products/deleteProduct', async ({ id }, thunkApi) => {
	try {
		const response = await ProductService.deleteProduct(id)

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
