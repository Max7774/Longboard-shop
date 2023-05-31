import { axiosClassic, instance } from '../api/api.interceptor'
import { CategoryType, ICategory } from '../types/category.interface'

const CATEGORIES = 'categories'

export const CategoryService = {
	async getAll() {
		return await axiosClassic<ICategory[]>({
			url: CATEGORIES,
			method: 'GET',
		})
	},

	async getById(id: string | number) {
		return await instance<ICategory>({
			url: `${CATEGORIES}/${id}`,
			method: 'GET',
		})
	},

	async getBySlug(slug: string) {
		return await axiosClassic<ICategory>({
			url: `${CATEGORIES}/by-slug/${slug}`,
			method: 'GET',
		})
	},

	async createCategory(data: CategoryType) {
		try {
			const response = await instance<ICategory>({
				url: CATEGORIES,
				method: 'POST',
				data,
			})

			if (response.status !== 200) {
				throw new Error('Failed to create product!')
			}

			return response.data
		} catch (error) {
			console.error(error)
			throw new Error('Failed to create product!')
		}
	},

	async updateCategory(id: string | number, name: string) {
		return await instance<ICategory>({
			url: `${CATEGORIES}/${id}`,
			method: 'PUT',
			data: { name },
		})
	},

	async deleteCategory(id: string | number) {
		try {
			const response = await instance<ICategory>({
				url: `${CATEGORIES}/${id}`,
				method: 'DELETE',
			})

			if (response.status !== 200) {
				throw new Error('Failed to create product!')
			}

			return response
		} catch (error) {
			console.error(error)
			throw new Error('Failed to create product!')
		}
	},
}
