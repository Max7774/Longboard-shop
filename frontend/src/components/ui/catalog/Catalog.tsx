import React, { FC } from 'react'

import Loader from '../Loader'

import Productitem from './product-item/Productitem'
import { IProduct } from '@/../src/types/product.interface'

const Catalog: FC<{ products: IProduct[]; isLoading?: boolean }> = ({
	products,
	isLoading,
}) => {
	if (isLoading) return <Loader />

	return (
		<section>
			{products.length ? (
				products?.map(product => (
					<Productitem key={product.id} product={product} />
				))
			) : (
				<div>There are no products</div>
			)}
		</section>
	)
}

export default Catalog
