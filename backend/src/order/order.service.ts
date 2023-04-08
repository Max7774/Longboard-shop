import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { productReturnObject } from 'src/product/return-product.object'
import { OrderDto } from './order.dto'
import * as YooKassa from 'yookassa'
import { faker } from '@faker-js/faker'
import { PaymentStatusDto } from './payment-status.dto'
import { EnumOrderItemStatus } from '@prisma/client'

const yooKassa = new YooKassa({
	shopId: process.env['SHOP_ID'],
	secretKey: process.env['PAYMENT_TOKEN'],
})

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
		const total = dto.items.reduce((acc, item) => {
			return acc + item.price * item.quantity
		}, 0)

		const order = await this.prisma.order.create({
			data: {
				status: dto.status,
				items: {
					create: dto.items,
				},
				total,
				user: {
					connect: {
						id: userId,
					},
				},
			},
		})
		const payment = await yooKassa.createPayment({
			amount: {
				value: total.toFixed(2),
				currency: 'RUB',
			},
			payment_method_data: {
				type: 'bank_card',
			},
			confirmation: {
				type: 'redirect',
				return_url: 'http://localhost:3000/thanks',
			},
			description: `Order #${order.id}`,
		})

		return payment
	}

	async updateStatus(dto: PaymentStatusDto) {
		if (dto.event === 'payment.waiting_for_capture') {
			const payment = await yooKassa.capturePayment(dto.object.id)
			return payment
		}

		if (dto.event === 'payment.succeeded') {
			const orderId = Number(dto.object.description.split('#')[1])

			await this.prisma.order.update({
				where: {
					id: orderId,
				},
				data: {
					status: EnumOrderItemStatus.Payed,
				},
			})

			return true
		}

		return true
	}
}
