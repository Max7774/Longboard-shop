import { useMutation } from '@tanstack/react-query'
import React, { FC, useEffect, useState } from 'react'
import { Rating } from 'react-simple-star-rating'

import { Button } from '@/ui/button/Button'
import Field from '@/ui/input/Field'

import { useActions } from '@/hooks/useAction'

import { IProduct } from '@/types/product.interface'
import { IReview } from '@/types/review.interface'

import { DataType, ReviewService } from '@/services/review.service'

const ProductRatingForm: FC<{
	productId: IProduct['id']
}> = ({ productId }) => {
	const [ratingProd, setRatingProd] = useState<number>(0)
	const [textReview, setTextReview] = useState<string>('')
	const [data, setData] = useState<DataType>({ rating: 0, text: '', productId })

	const { createReview } = useActions()

	// const { mutate } = useMutation(
	// 	['set review'],
	// 	() => ReviewService.createReview(productId, data),
	// 	{
	// 		onSuccess() {
	// 			// createReview(data)
	// 			setTextReview('')
	// 			setRatingProd(0)
	// 		},
	// 	},
	// )

	const addComment = () => {
		setData({ rating: ratingProd, text: textReview, productId })
		console.log('data', data)
		createReview(data)
		setTextReview('')
		setRatingProd(0)
	}

	return (
		<div>
			<Field
				placeholder="Напишите ваш отзыв"
				value={textReview}
				onChange={e => setTextReview(e.target.value)}
			/>
			<span className="mr-1">
				<Rating
					initialValue={ratingProd}
					SVGstyle={{ display: 'inline-block' }}
					size={50}
					allowFraction
					transition
					onClick={(e: number) => setRatingProd(e)}
				/>
				<span className="text-primary text-2xl ml-2">{ratingProd}</span>
			</span>
			<Button
				variant="orange"
				type="button"
				onClick={() => {
					addComment()
				}}
				className="flex"
			>
				Оставить отзыв
			</Button>
		</div>
	)
}

export default ProductRatingForm
