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
	const [image, setImage] = useState<Photo[]>([])

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch(
				`${process.env.SERVER_URL}/file-upload/${item.product.id}`,
			)
			const data = await response.json()
			setImage(data)
		}

		fetchData()
	}, [])

	return (
		<div className={styles.item}>
			<Link href={`/product/${item.product?.category?.slug}`}>
				<Image
					width={100}
					height={250}
					src={image[0]?.url}
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
