import dynamic from 'next/dynamic'
import Link from 'next/link'
import React, { FC } from 'react'
import { Rating } from 'react-simple-star-rating'

import Back from '@/ui/back-home/BackHome'

import { convertPrice } from '@/utils/convertPrice'

import CarouselPhoto from './CarouselPhoto'
import ProductRating from './ProductRating'
import ProductRatingForm from './ProductRatingForm'
import ProductRatingFull from './ProductRatingFull'
import { IProduct } from '@/../src/types/product.interface'

const ProductitemFull: FC<{ product: IProduct }> = ({ product }) => {
	return (
		<>
			<section>
				<Back title="Home" />
				<CarouselPhoto product={product} />
				<div className="animate-scaleIn grid grid-cols-1 gap-6">
					<h3 className="mt-2 font-semibold text-2xl">{product.name}</h3>
					<h4 className="mt-2 font-semibold">
						Описание:
						{`${product.description}`}
					</h4>
					<Link
						href={`/category/${product?.category?.slug}`}
						className="text-aqua text-lg mb-2"
					>
						<div className="text-aqua text-lg mb-2">
							{product?.category?.name}
						</div>
					</Link>
					<ProductRating product={product} />
					<div className="text-xl font-semibold">
						{convertPrice(product.price)}
					</div>
				</div>
				<ProductRatingForm productId={product.id} />
				<section className="overflow-y-auto h-40 mt-5">
					{product?.reviews?.map(review => (
						<ProductRatingFull review={review} />
					))}
				</section>
			</section>
		</>
	)
}

export default ProductitemFull
