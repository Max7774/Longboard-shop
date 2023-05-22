import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import React, { FC, useEffect, useState } from 'react'

import { useAuth } from '@/hooks/useAuth'

import { convertPrice } from '@/utils/convertPrice'

import AddToCartButton from './AddToCartButton'
import ProductRating from './ProductRating'
import { IProduct } from '@/../src/types/product.interface'

const DynamicFavouriteButton = dynamic(() => import('./FavouriteButton'), {
	ssr: false,
})

const DynamicDeleteButton = dynamic(() => import('./DeleteButton'), {
	ssr: false,
})

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
	const [image, setImage] = useState<Photo[]>([])

	const { user } = useAuth()

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch(
				`${process.env.SERVER_URL}/file-upload/${product.id}`,
			)
			const data = await response.json()
			setImage(data)
		}

		fetchData()
	}, [])

	const imageUrl = image?.[0]?.url || `/${image[0]?.originalname}`

	const imageStyles = {
		width: '100%',
		height: 'auto',
	}

	return (
		<div className="animate-scaleIn">
			<div className="bg-white rounded-xl relative overflow-hidden">
				<div className="absolute top-2 right-3 z-10">
					{user?.isAdmin === true ? (
						<DynamicDeleteButton
							removeProductFromState={removeProductFromState}
							productId={product.id}
							image={image}
						/>
					) : null}
					<DynamicFavouriteButton productId={product.id} />
					<AddToCartButton product={product} />
				</div>
				<Link href={`/product/${product.slug}`}>
					{image?.length === 0 ? (
						<Image
							src={'/noimage.png'}
							width={300}
							height={300}
							alt={product.name}
							priority
							style={imageStyles}
						/>
					) : (
						<Image
							src={image[0].filename}
							width={500}
							height={500}
							alt={product.name}
							priority
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
