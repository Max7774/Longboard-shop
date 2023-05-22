import { axiosClassic, instance } from '../api/api.interceptor'
import { IReview } from '../types/review.interface'

const REVIEWS = 'reviews'

export type DataType = {
	rating: number
	text: string
}

export const ReviewService = {
	async getAll() {
		return await axiosClassic<IReview[]>({
			url: REVIEWS,
			method: 'GET',
		})
	},

	async getAvrageByProduct(productId: string | number) {
		return await axiosClassic<number>({
			url: `${REVIEWS}/avarage-by-product/${productId}`,
			method: 'GET',
		})
	},

	async createReview(productId: string | number, data: DataType) {
		return await instance<IReview>({
			url: `${REVIEWS}/leave/${productId}`,
			method: 'POST',
			data,
		})
	},
}
