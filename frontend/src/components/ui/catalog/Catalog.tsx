import React, { FC } from 'react'

import Loader from '../Loader'
import Heading from '../button/Heading'

import Productitem from './product-item/Productitem'
import { IProduct } from '@/../src/types/product.interface'

interface ICatalog {
	products: IProduct[]
	isLoading?: boolean
	title?: string
}

const Catalog: FC<ICatalog> = ({ products, isLoading, title }) => {
	if (isLoading) return <Loader />

	return (
		<section>
			{title && <Heading className="mb-5">{title}</Heading>}
			{products.length ? (
				<div className="grid grid-cols-4 gap-10">
					{products?.map(product => (
						<Productitem key={product.id} product={product} />
					))}
				</div>
			) : (
				<div>There are no products</div>
			)}
		</section>
	)
}

export default Catalog
