// import axios from 'axios'
// import dynamic from 'next/dynamic'
// import Image from 'next/image'
// import Link from 'next/link'
// import React, { FC, useEffect, useState } from 'react'

// import { convertPrice } from '@/utils/convertPrice'

// import AddToCartButton from './AddToCartButton'
// import FavouriteButton from './FavouriteButton'
// import ProductRating from './ProductRating'
// import { IProduct } from '@/../src/types/product.interface'

// const DynamicFavouriteButton = dynamic(() => import('./FavouriteButton'), {
// 	ssr: false,
// })

// const ProductitemFull: FC<{ product: IProduct }> = ({ product }) => {
// 	return (
// 		<section>
// 			{title && <Heading className="mb-5">{title}</Heading>}
// 			<SortDropdown sortType={sortType} setSortType={setSortType} />
// 			{response.products.length ? (
// 				<>
// 					<div className="grid grid-cols-4 gap-10">
// 						{response.products?.map(product => (
// 							<Productitem key={product.id} product={product} />
// 						))}
// 					</div>
// 					<div className="text-center mt-16">
// 						{Array.from({ length: response.length / 3 }).map((_, index) => {
// 							const pageNumber = index + 1
// 							return (
// 								<Button
// 									key={pageNumber}
// 									size="sm"
// 									variant={page === pageNumber ? 'orange' : 'white'}
// 									onClick={() => setPage(pageNumber)}
// 									className="mx-3"
// 								>
// 									{pageNumber}
// 								</Button>
// 							)
// 						})}
// 					</div>
// 				</>
// 			) : (
// 				<div>There are no products</div>
// 			)}
// 		</section>
// 	)
// }

// export default ProductitemFull

export {}
