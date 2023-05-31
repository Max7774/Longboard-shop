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
				key={review.id + 1}
				readonly
				initialValue={review.rating}
				SVGstyle={{ display: 'inline-block' }}
				size={30}
				allowFraction
				transition
			/>
			<span key={review.id + 2}>{review.text}</span>
			<span key={review.id + 3}>{review?.user?.name}</span>
		</div>
	)
}

export default ProductRatingFull
