import { Injectable, NotFoundException } from '@nestjs/common'
import { convertToSlug } from 'seeder/seeds'
import { PrismaService } from 'src/prisma.service'
import { ReviewDto } from './dto/review.dto'
import { returnReviewObject } from './return-review.object'

@Injectable()
export class ReviewService {
	constructor(private prisma: PrismaService) {}

	// async byId(id: number) {
	// 	const review = await this.prisma.review.findUnique({
	// 		where: {
	// 			id,
	// 		},
	// 		select: returnReviewObject,
	// 	})

	// 	if (!review) {
	// 		throw new Error('Review not found')
	// 	}

	// 	return review
	// }

	// async bySlug(slug: string) {
	// 	const review = await this.prisma.review.findUnique({
	// 		where: {
	// 			slug,
	// 		},
	// 		select: returnReviewObject,
	// 	})

	// 	if (!review) {
	// 		throw new NotFoundException('Review not found')
	// 	}

	// 	return review
	// }

	async getAll() {
		return this.prisma.review.findMany({
			orderBy: {
				createdAt: 'desc',
			},
			select: returnReviewObject,
		})
	}

	async createReview(userId: number, dto: ReviewDto, productId: number) {
		return this.prisma.review.create({
			data: {
				...dto,
				product: {
					connect: {
						id: productId,
					},
				},
				user: {
					connect: {
						id: userId,
					},
				},
			},
		})
	}

	// async updateReview(id: number, dto: ReviewDto) {
	// 	return this.prisma.review.update({
	// 		where: {
	// 			id,
	// 		},
	// 		data: {
	// 			...dto,
	// 		},
	// 	})
	// }

	async getAverageValueByProductId(productId: number) {
		return this.prisma.review
			.aggregate({
				where: {
					productId,
				},
				_avg: { rating: true },
			})
			.then(data => data._avg)
	}
}
