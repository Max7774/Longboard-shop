import { createAsyncThunk } from '@reduxjs/toolkit'

import { IProduct, TypePaginationProducts } from '@/types/product.interface'

import { AsyncThunkConfig } from '@/utils/asyncThunkConfig'

import { FileService } from '@/services/file.service'
import { ProductService } from '@/services/product/product.service'
import { EnumProductsSort, ProductType } from '@/services/product/product.types'

export const getProductsAll = createAsyncThunk<
	TypePaginationProducts,
	{
		page: string | number | undefined
		perPage: string | number | undefined
		sort: EnumProductsSort
	},
	AsyncThunkConfig
>('products/getProducts', async (data, thunkApi) => {
	try {
		const response = await ProductService.getAll(data)
		return response
	} catch (error) {
		return thunkApi.rejectWithValue({
			errorMessage: 'Failed to fetch product by id',
		})
	}
})

// export const getProductsByCategory = createAsyncThunk(
// 	'products/categriy',
// 	async (data, thunkApi) => {
// 		try {
// 			const response = await ProductService.getByCategory()

// 			return response
// 		} catch (error) {
// 			return thunkApi.rejectWithValue({
// 				errorMessage: 'Failed to fetch product by id',
// 			})
// 		}
// 	},
// )

export const create = createAsyncThunk<IProduct, ProductType, AsyncThunkConfig>(
	'products/createProduct',
	async (data, thunkApi) => {
		try {
			const product = await ProductService.createProduct({
				name: data.name,
				price: data.price,
				description: data.description,
				categoryId: data.categoryId,
			})

			await FileService.uploadFile(data.file, product.id)

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
