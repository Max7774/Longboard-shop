import React, { FC } from 'react'

import Loader from '../Loader'
import { Button } from '../button/Button'
import Heading from '../layout/Heading'

import SortDropdown from './SortDropdown'
import Productitem from './product-item/Productitem'
import { IProduct } from '@/../src/types/product.interface'

interface ICatalog {
	products: IProduct[]
	isLoading?: boolean
	title?: string
	isPagination?: boolean
}

const Catalog: FC<ICatalog> = ({
	products,
	isLoading,
	title,
	isPagination = false,
}) => {
	if (isLoading) return <Loader />

	return (
		<section>
			{title && <Heading className="mb-5">{title}</Heading>}
			{/* {isPagination && < />} */}
			{products.length ? (
				<>
					<div className="grid grid-cols-4 gap-10">
						{products?.map(product => (
							<Productitem key={product.id} product={product} />
						))}
					</div>
					{isPagination && <Button variant="orange">Load more</Button>}
				</>
			) : (
				<div>There are no products</div>
			)}
		</section>
	)
}

export default Catalog
