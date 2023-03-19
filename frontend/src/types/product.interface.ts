import { ICategory } from './category.interface'
import { IReview } from './review.interface'

export interface IProduct {
	images: string[]
	description: string
	id: number
	name: string
	price: number
	createdAt: string
	slug: string
	category: ICategory
	reviews: IReview[]
}

export interface IProductDetails {
	product: IProduct
}

export type TypeProducts = {
	products: IProduct[]
}

export type TypePaginationProducts = {
	length: number
	products: IProduct[]
}
