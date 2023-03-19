import { useQuery } from '@tanstack/react-query'
import React, { FC, useState } from 'react'
import { Rating } from 'react-simple-star-rating'

import { ReviewService } from '@/../src/services/review.service'
import { IProduct, IProductDetails } from '@/../src/types/product.interface'
import { IReview } from '@/../src/types/review.interface'

const ProductRating: FC<{ product: IProduct }> = ({ product }) => {
	const { data: rating } = useQuery(
		['get product rating', product],
		() => ReviewService.getAvrageByProduct(product.id),
		{
			select: ({ data }) => data,
		},
	)

	return (
		<div>
			<Rating
				readonly
				initialValue={rating}
				SVGstyle={{ display: 'inline-block' }}
				size={34}
				allowFraction
				transition
			/>
			<span>({product.reviews.length} reviews)</span>
		</div>
	)
}

export default ProductRating
