// import { GetStaticProps, NextPage } from 'next'
// import React from 'react'
// import Home from '../src/components/screens/home/Home'
// import { ProductService } from '../src/services/product/product.service'
// import { TypePaginationProducts } from '../src/types/product.interface'
// const HomePage: NextPage<TypePaginationProducts> = ({ length, products }) => {
// 	return <Home products={products} length={length} />
// }
// export const getStaticProps: GetStaticProps<
// 	TypePaginationProducts
// > = async () => {
// 	const data = await ProductService.getAll({
// 		page: 1,
// 		perPage: 4,
// 	})
// 	return {
// 		props: data,
// 	}
// }
// export default HomePage
import { GetServerSideProps, GetStaticProps, NextPage } from 'next'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { useActions } from '@/hooks/useAction'
import { useTypedSelector } from '@/hooks/useTypedSelector'

import Home from '../src/components/screens/home/Home'
import { ProductService } from '../src/services/product/product.service'
import { TypePaginationProducts } from '../src/types/product.interface'

const HomePage: NextPage<TypePaginationProducts> = ({ length, products }) => {
	return <Home products={products} length={length} />
}

export const getStaticProps: GetStaticProps<
	TypePaginationProducts
> = async () => {
	const data = await ProductService.getAll({
		page: 1,
		perPage: 4,
	})

	return {
		props: data,
	}
}

export default HomePage
