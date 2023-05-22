// import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
// import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'
// import { Box, Button, MobileStepper, Paper, Typography } from '@mui/material'
// import { useTheme } from '@mui/material/styles'
import Image from 'next/image'
import React, { FC, useEffect, useState } from 'react'

// import SwipeableViews from 'react-swipeable-views'
// import { autoPlay } from 'react-swipeable-views-utils'
import { IProduct } from '@/types/product.interface'

import { Photo } from './Productitem'

// const AutoPlaySwipeableViews = autoPlay(SwipeableViews)

const CarouselPhoto: FC<{ product: IProduct }> = ({ product }) => {
	// const theme = useTheme()
	const [activeStep, setActiveStep] = React.useState(0)
	const [images, setImages] = useState<Photo[]>([])
	// const maxSteps = images.length

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch(
				`${process.env.SERVER_URL}/file-upload/${product.id}`,
			)
			const data = await response.json()
			setImages(data)
		}

		fetchData()
	}, [])

	useEffect(() => {
		const timer = setTimeout(() => {
			setActiveStep(prevStep =>
				prevStep === images.length - 1 ? 0 : prevStep + 1,
			)
		}, 3500)

		return () => {
			clearTimeout(timer)
		}
	}, [activeStep, images.length])

	const goToPrevSlide = () => {
		setActiveStep(prevSlide =>
			prevSlide === 0 ? images.length - 1 : prevSlide - 1,
		)
	}

	const goToNextSlide = () => {
		setActiveStep(prevSlide =>
			prevSlide === images.length - 1 ? 0 : prevSlide + 1,
		)
	}

	return (
		<>
			<div className="flex">
				<div className="flex justify-between items-center w-200 px-4 bottom-0">
					<button
						className="bg-gray-200 p-2 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:bg-gray-300 duration-200 shadow-md"
						onClick={goToPrevSlide}
					>
						❮
					</button>
				</div>
				{images.map((image, index) => (
					<div
						className={`flex top-0 left-0 w-full h-auto max-h-[400px] ${
							activeStep === index ? 'opacity-100' : 'opacity-0'
						} transition-opacity duration-1000`}
						key={index}
					>
						<img
							className="w-200 h-200 object-cover"
							src={image.url}
							alt={image.url}
						/>
					</div>
				))}
				<div className="flex justify-between items-center w-200 px-4 bottom-0">
					{/* <button
						className="bg-gray-200 p-2 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:bg-gray-300 duration-200 shadow-md"
						onClick={goToPrevSlide}
					>
						❮
					</button> */}
					<button
						className="bg-gray-200 p-2 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:bg-gray-300 duration-200 shadow-md"
						onClick={goToNextSlide}
					>
						❯
					</button>
				</div>
			</div>
		</>
	)
}

export default CarouselPhoto
