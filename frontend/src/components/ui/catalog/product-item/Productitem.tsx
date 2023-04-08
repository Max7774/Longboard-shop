import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import React, { FC } from 'react'

import { convertPrice } from '@/utils/convertPrice'

import AddToCartButton from './AddToCartButton'
import FavouriteButton from './FavouriteButton'
import ProductRating from './ProductRating'
import { IProduct } from '@/../src/types/product.interface'

const DynamicFavouriteButton = dynamic(() => import('./FavouriteButton'), {
	ssr: false,
})

const Productitem: FC<{ product: IProduct }> = ({ product }) => {
	return (
		<div className="animate-scaleIn">
			<div className="bg-white rounded-xl relative overflow-hidden">
				<div className="absolute top-2 right-3 z-10">
					<DynamicFavouriteButton productId={product.id} />
					<AddToCartButton product={product} />
				</div>
				{/* <Image
					width={300}
					height={300}
					src={product?.images[0]}
					alt={product.name}
				/> */}
				<Link href={`/product/${product.category.slug}`}>
					<img
						style={{ borderRadius: '10px', width: '300px', height: '300px' }}
						// width={300}
						// height={300}
						src={product?.images[0]}
						alt={product.name}
					/>
				</Link>
			</div>
			<Link href={`/product/${product.category.slug}`}>
				<h3 className="mt-2 font-semibold">{product.name}</h3>
			</Link>
			<Link
				href={`/category/${product.category.slug}`}
				className="text-aqua text-xs mb-2"
			>
				{product.category.name}
			</Link>
			<ProductRating product={product} />
			<div className="text-xl font-semibold">{convertPrice(product.price)}</div>
		</div>
	)
}

export default Productitem
