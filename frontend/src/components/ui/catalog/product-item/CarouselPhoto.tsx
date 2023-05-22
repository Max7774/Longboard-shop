import Image from 'next/image'
import React, { FC, useEffect } from 'react'

import { IProduct } from '@/types/product.interface'

const CarouselPhoto: FC<{ product: IProduct }> = ({ product }) => {
	const [activeStep, setActiveStep] = React.useState(0)

	useEffect(() => {
		const timer = setTimeout(() => {
			setActiveStep(prevStep =>
				prevStep === product.images?.length - 1 ? 0 : prevStep + 1,
			)
		}, 3500)

		return () => {
			clearTimeout(timer)
		}
	}, [activeStep, product.images?.length])

	const goToPrevSlide = () => {
		setActiveStep(prevSlide =>
			prevSlide === 0 ? product.images?.length - 1 : prevSlide - 1,
		)
	}

	const goToNextSlide = () => {
		setActiveStep(prevSlide =>
			prevSlide === product.images?.length - 1 ? 0 : prevSlide + 1,
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
				{product.images?.map((image, index) => (
					<div
						className={`flex top-0 left-0 w-full h-auto max-h-[400px] ${
							activeStep === index ? 'opacity-100' : 'opacity-0'
						} transition-opacity duration-1000`}
						key={index}
					>
						<Image
							className="object-cover"
							width={400}
							height={400}
							src={`/${image}`}
							alt={image}
						/>
					</div>
				))}
				<div className="flex justify-between items-center w-200 px-4 bottom-0">
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
