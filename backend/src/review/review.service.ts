import { Injectable } from '@nestjs/common'
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
		const response = await this.prisma.review.findMany({
			orderBy: {
				createdAt: 'desc',
			},
			select: returnReviewObject,
		})

		return response
	}

	async createReview(userId: number, dto: ReviewDto, productId: number) {
		const resonse = await this.prisma.review.create({
			data: {
				rating: Math.floor(dto.rating),
				text: dto.text,
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
			select: returnReviewObject,
		})

		return resonse
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
