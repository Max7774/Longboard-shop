import { GetStaticProps, NextPage } from 'next'
import React from 'react'

import Home from '../src/components/screens/home/Home'
import { ProductService } from '../src/services/product/product.service'
import {
	IProduct,
	TypePaginationProducts,
	TypeProducts,
} from '../src/types/product.interface'

const HomePage: NextPage<TypePaginationProducts> = ({ length, products }) => {
	return <Home products={products} length={length} />
}

export const getStaticProps: GetStaticProps<
	TypePaginationProducts
> = async () => {
	const { data } = await ProductService.getAll({
		page: 1,
		perPage: 4,
	})

	return {
		props: data,
	}
}

export default HomePage
