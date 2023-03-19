import Image from 'next/image'
import React, { FC } from 'react'

import { IProduct } from '@/../src/types/product.interface'

const Productitem: FC<{ product: IProduct }> = ({ product }) => {
	return (
		<div>
			<div>
				<FavouriteButton productId={product.id} />
				<AddToCartButton productId={product.id} />
				<Image
					width={300}
					height={300}
					src={product.images[0]}
					alt={product.name}
				/>
			</div>
			<h3>{product.name}</h3>
			<div>{product.category.name}</div>
			<ProductRating rating={product.rating} />
			<div>{product.price}</div>
		</div>
	)
}

export default Productitem
