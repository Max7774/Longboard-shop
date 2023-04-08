import Image from 'next/image'
import Link from 'next/link'
import React, { FC } from 'react'

import { ICartItem } from '@/types/cart.interface'

import { convertPrice } from '@/utils/convertPrice'

import styles from '../cart-item/Cart.module.scss'

import CartActions from './cart-actions/CartActions'

interface IItem {
	item: ICartItem
}

const CartItem: FC<IItem> = ({ item }) => {
	return (
		<div className={styles.item}>
			{/* <Image
				src={item.product.images[0]}
				width={100}
				height={100}
				alt={item.product.name}
			/> */}
			<Link href={`/product/${item.product.category.slug}`}>
				<img
					style={{ borderRadius: '10px' }}
					width={100}
					height={100}
					src={item.product?.images[0]}
					alt={item.product.name}
				/>
			</Link>
			<div>
				<div className={styles.name}>{item.product.name}</div>
				<div className={styles.price}>{convertPrice(item.product.price)}</div>
				<CartActions item={item} />
			</div>
		</div>
	)
}

export default CartItem
