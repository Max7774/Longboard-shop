import { useQuery } from '@tanstack/react-query'

import Meta from '@/ui/Meta'
import Heading from '@/ui/layout/Heading'
import Layout from '@/ui/layout/Layout'

import { NextPageAuth } from '@/providers/auth-provider/auth-page.types'

import { convertPrice } from '@/utils/convertPrice'

import { OrderService } from '@/services/order.service'

const MyOrdersPage: NextPageAuth = () => {
	const { data: orders } = useQuery(
		['my orders'],
		() => OrderService.getAll(),
		{ select: ({ data }) => data },
	)

	return (
		<Meta title="My Orders">
			<Layout>
				<Heading>My orders</Heading>

				<section>
					{orders?.length ? (
						orders.map(order => (
							<div
								key={order.id}
								className="rounded-lg bg-white shadow flex gap-10 p-7 my-7"
							>
								<span>#{order.id}</span>
								<span>{order.status}</span>
								<span>
									{new Date(order.createdAt).toLocaleDateString('ru-Ru')}
								</span>
								<span>{convertPrice(order.total)}</span>
							</div>
						))
					) : (
						<div>Order not found!</div>
					)}
				</section>
			</Layout>
		</Meta>
	)
}

MyOrdersPage.isOnlyUser = true

export default MyOrdersPage
