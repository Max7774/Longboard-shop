import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { productReturnObject } from 'src/product/return-product.object'
import { OrderDto } from './order.dto'

@Injectable()
export class OrderService {
	constructor(private prisma: PrismaService) {}

	getAll(userId: number) {
		return this.prisma.order.findMany({
			where: {
				userId,
			},
			orderBy: {
				createdAt: 'desc',
			},
			include: {
				items: {
					include: {
						product: {
							select: productReturnObject,
						},
					},
				},
			},
		})
	}

	async placeOrder(dto: OrderDto, userId: number) {
		const order = await this.prisma.order.create({
			data: {
				status: dto.status,
				items: {
					create: dto.items,
				},
			},
			user: {
				connect: {
					id: userId,
				},
			},
		})

		return order
	}
}
