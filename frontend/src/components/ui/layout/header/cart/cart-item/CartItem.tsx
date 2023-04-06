import Image from 'next/image'
import React, { FC } from 'react'

import { ICartItem } from '@/types/cart.interface'

import { convertPrice } from '@/utils/convertPrice'

import CartActions from './cart-actions/CartActions'

interface IItem {
	item: ICartItem
}

const CartItem: FC<IItem> = ({ item }) => {
	return (
		<div>
			<Image
				src={item.product.images[0]}
				width={100}
				height={100}
				alt={item.product.name}
			/>
			<div>
				<div>{item.product.name}</div>
				<div>{convertPrice(item.product.price)}</div>
				<CartActions item={item} />
			</div>
		</div>
	)
}

export default CartItem
