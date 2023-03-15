export const PRODUCTS = 'products'

export type ProductType = {
	name: string
	price: number
	description?: string
	images: string[]
	categoryId: number
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
