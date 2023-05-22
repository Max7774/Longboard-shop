import React, { FC } from 'react'
import { Rating } from 'react-simple-star-rating'

import { IReview } from '@/types/review.interface'

const ProductRatingFull: FC<{ review: IReview }> = ({ review }) => {
	return (
		<div
			key={review.id}
			className="rounded-lg bg-white shadow flex gap-10 p-7 my-7"
		>
			<Rating
				readonly
				initialValue={review.rating}
				SVGstyle={{ display: 'inline-block' }}
				size={30}
				allowFraction
				transition
			/>
			<span>{review.text}</span>
			<span>{review?.user?.name}</span>
		</div>
	)
}

export default ProductRatingFull
