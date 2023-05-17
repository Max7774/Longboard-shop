import { axiosClassic, instance } from '../../api/api.interceptor'
import { IProduct, TypePaginationProducts } from '../../types/product.interface'

import { PRODUCTS, ProductType, TypeProductDataFilters } from './product.types'

export const ProductService = {
	async getAll(queryData = {} as TypeProductDataFilters) {
		const { data } = await axiosClassic<TypePaginationProducts>({
			url: PRODUCTS,
			method: 'GET',
			params: queryData,
		})
		return data
	},

	async getSimilar(id: string | number) {
		return await axiosClassic<IProduct[]>({
			url: `${PRODUCTS}/similar/${id}`,
			method: 'GET',
		})
	},

	async getBySlug(slug: string) {
		return await axiosClassic<IProduct>({
			url: `${PRODUCTS}/by-slug/${slug}`,
			method: 'GET',
		})
	},

	async getByCategory(categorySlug: string) {
		return await axiosClassic<IProduct[]>({
			url: `${PRODUCTS}/by-category/${categorySlug}`,
			method: 'GET',
		})
	},

	async getById(id: string | number) {
		return await instance<IProduct>({
			url: `${PRODUCTS}/${id}`,
			method: 'GET',
		})
	},

	async createProduct(data: ProductType) {
		const response = await axiosClassic<IProduct>({
			url: `${PRODUCTS}/create`,
			method: 'POST',
			data,
		})

		return response
	},

	async updateProduct(id: string | number, data: ProductType) {
		return await instance<IProduct>({
			url: `${PRODUCTS}/${id}`,
			method: 'PUT',
			data,
		})
	},

	async deleteProduct(id: string | number) {
		return await instance<IProduct>({
			url: `${PRODUCTS}/${id}`,
			method: 'DELETE',
		})
	},
}
