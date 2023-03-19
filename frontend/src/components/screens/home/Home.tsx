import { FC } from 'react'

import Meta from '../../ui/Meta'
import Heading from '../../ui/button/Heading'
import Catalog from '../../ui/catalog/Catalog'

import { TypePaginationProducts, TypeProducts } from '@/../src/types/product.interface'

const Home: FC<TypePaginationProducts> = ({ products, length }) => {
	return (
		<Meta title="Home">
			<Heading>Hello world!</Heading>
			<Catalog products={products || []} />
		</Meta>
	)
}

export default Home
