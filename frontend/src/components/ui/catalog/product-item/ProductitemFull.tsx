import dynamic from 'next/dynamic'
import Link from 'next/link'
import React, { FC, useEffect } from 'react'

// import { Rating } from 'react-simple-star-rating'
import Back from '@/ui/back-home/BackHome'

import { useAppSelector } from '@/hooks/dispatch'
import { useActions } from '@/hooks/useAction'
import { useAuth } from '@/hooks/useAuth'

import { convertPrice } from '@/utils/convertPrice'

import AddToCartButton from '../actions-buttons/AddToCartButton'
import CarouselPhoto from '../carousel-photo/CarouselPhoto'
import ProductRating from '../rating/ProductRating'
import ProductRatingForm from '../rating/ProductRatingForm'
import ProductRatingFull from '../rating/ProductRatingFull'

import { IProduct } from '@/../src/types/product.interface'
import Auth from '@/screens/auth/Auth'

const ProductitemFull: FC<{ product: IProduct }> = ({ product }) => {
	const { user } = useAuth()
	const { getReview } = useActions()
	useEffect(() => {
		getReview()
	}, [])
	const review = useAppSelector(store => store.reviews)

	console.log('Full product', review)

	return (
		<>
			{!!user ? (
				<>
					<section>
						<Back title="Home" />
						<CarouselPhoto product={product} />
						<div className="animate-scaleIn grid grid-cols-1 gap-6">
							<h3 className="mt-2 font-semibold text-2xl">{product.name}</h3>
							<Link
								href={`/category/${product?.category?.slug}`}
								className="text-aqua text-lg"
							>
								<div className="text-aqua text-lg">
									{product?.category?.name}
								</div>
							</Link>
							{product.reviews.length !== 0 ? (
								<ProductRating product={product} />
							) : null}
							<h4 className="mt-2 font-semibold text-xl">{`Описание: `}</h4>
							<div>{product.description}</div>
							<AddToCartButton product={product} isButton={true} />
							<div className="text-2xl mb-3 font-semibold">
								{convertPrice(product.price)}
							</div>
						</div>
						<ProductRatingForm productId={product.id} />
						<section className="overflow-y-auto h-60 mt-5">
							{review?.map(review => (
								<ProductRatingFull review={review} />
							))}
						</section>
					</section>
				</>
			) : (
				<Auth />
			)}
		</>
	)
}

export default ProductitemFull
