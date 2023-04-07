import { useQuery } from '@tanstack/react-query'
import React, { FC, useState } from 'react'
import { Rating } from 'react-simple-star-rating'

import { ReviewService } from '@/../src/services/review.service'
import { IProduct, IProductDetails } from '@/../src/types/product.interface'
import { IReview } from '@/../src/types/review.interface'

const ProductRating: FC<{ product: IProduct }> = ({ product }) => {
	// const { data: rating } = useQuery(
	// 	['get product rating', product],
	// 	() => ReviewService.getAvrageByProduct(product.id),
	// 	{
	// 		select: ({ data }) => data,
	// 	},
	// )

	const [rating, setRating] = useState(
		Math.round(
			product.reviews.reduce((acc, review) => acc + review.rating, 0) /
				product.reviews.length,
		) || 0,
	)

	return (
		<div className="mb-2">
			{!!product.reviews.length && (
				<span className="mr-1">
					<Rating
						readonly
						initialValue={rating}
						SVGstyle={{ display: 'inline-block' }}
						size={20}
						allowFraction
						transition
					/>
					<span className="text-primary text-sm ml-1">{rating}</span>
				</span>
			)}
			<span className="text-xs">({product.reviews.length} reviews)</span>
		</div>
	)
}

export default ProductRating
