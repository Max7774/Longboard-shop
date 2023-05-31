import { File } from 'buffer'

import { IProduct } from '../../types/product.interface'

export const PRODUCTS = 'products'

export type ProductType = {
	name: string
	price: number
	description?: string
	images?: string[]
	categoryId: number
	file?: any
}

export type TypeProductDataFilters = {
	sort?: EnumProductsSort
	searchTerm?: string
	page?: string | number
	perPage?: string | number
}

export enum EnumProductsSort {
	HIGH_PRICE = 'high-price',
	LOW_PRICE = 'low-price',
	NEWEST = 'newest',
	OLDEST = 'oldest',
}
