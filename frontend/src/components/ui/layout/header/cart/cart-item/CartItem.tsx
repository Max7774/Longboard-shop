import Image from 'next/image'
import Link from 'next/link'
import React, { FC, useEffect, useState } from 'react'

import { Photo } from '@/ui/catalog/product-item/Productitem'

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
			<Link href={`/product/${item.product?.category?.slug}`}>
				<Image
					width={100}
					height={250}
					src={`/${item.product.images[0]}`}
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
