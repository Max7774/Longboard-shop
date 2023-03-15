import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { UserService } from 'src/user/user.service'

@Injectable()
export class StatisticsService {
	constructor(
		private prisma: PrismaService,
		private userService: UserService,
	) {}

	async getMain(userId: number) {
		const user = await this.userService.byId(userId, {
			orders: {
				select: {
					items: true,
				},
			},
			reviews: true,
		})

		return [
			{
				name: 'Orders',
				value: user.orders.length,
			},
			{
				name: 'Reviews',
				value: user.reviews.length,
			},
			{
				name: 'Favourites',
				value: user.favourites.length,
			},
			{
				name: 'Total amount',
				value: 1000,
			},
		]
	}
}
