import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import React, { FC } from 'react'

import { useAuth } from '@/hooks/useAuth'

import { convertPrice } from '@/utils/convertPrice'

import AddToCartButton from '../actions-buttons/AddToCartButton'
import ProductRating from '../rating/ProductRating'

import { IProduct } from '@/../src/types/product.interface'

const DynamicFavouriteButton = dynamic(
	() => import('../actions-buttons/FavouriteButton'),
	{
		ssr: false,
	},
)

const DynamicDeleteButton = dynamic(
	() => import('../actions-buttons/DeleteButton'),
	{
		ssr: false,
	},
)

export type Photo = {
	id: string
	url: string
	filename: string
	originalname: string
	mimetype: string
	size: number
	path: string
	productId: number
}

const Productitem: FC<{
	product: IProduct
	removeProductFromState?: (productId: number) => void
}> = ({ product, removeProductFromState }) => {
	const { user } = useAuth()

	const imageStyles = {
		width: '100%',
		height: 'auto',
	}

	return (
		<div className="animate-scaleIn">
			<div className="bg-white rounded-xl relative overflow-hidden shadow hover:shadow-3xl">
				<div className="absolute top-2 right-3 z-10">
					{user?.isAdmin === true ? (
						<DynamicDeleteButton
							removeProductFromState={removeProductFromState}
							productId={product.id}
						/>
					) : null}
					<DynamicFavouriteButton productId={product.id} />
					<AddToCartButton product={product} />
				</div>
				<Link href={`/product/${product.slug}`}>
					{product.images?.length === 0 ? (
						<img
							src={`./noimage.png`}
							width={500}
							height={500}
							alt={product.name}
							style={imageStyles}
						/>
					) : (
						<img
							src={`/${
								product?.images[0] !== undefined
									? product?.images[0]
									: './noimage.png'
							}`}
							width={500}
							height={500}
							alt={product.name}
							style={imageStyles}
						/>
					)}
				</Link>
			</div>
			<Link href={`/product/${product.slug}`}>
				<h3 className="mt-2 font-semibold">{product.name}</h3>
			</Link>
			<Link
				href={`/category/${product?.category?.slug}`}
				className="text-aqua text-xs mb-2"
			>
				{product?.category?.name}
			</Link>
			<ProductRating product={product} />
			<div className="text-xl font-semibold">{convertPrice(product.price)}</div>
		</div>
	)
}

export default Productitem
