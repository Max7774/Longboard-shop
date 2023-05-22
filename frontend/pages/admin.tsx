import { useQuery } from '@tanstack/react-query'
import { GetStaticProps, NextPage } from 'next'
import React, { useEffect } from 'react'

import { useActions } from '@/hooks/useAction'
import { useTypedSelector } from '@/hooks/useTypedSelector'

import { TypePaginationProducts } from '@/types/product.interface'

import AdminPanel from '@/screens/AdminPanel/AdminPanel'
import { ProductService } from '@/services/product/product.service'

const Admin: NextPage = () => {
	const productsQuery = useQuery<TypePaginationProducts>(['get products'], () =>
		ProductService.getAll(),
	)
	const { getProducts } = useActions()

	const products = useTypedSelector(store => store.products.products)

	useEffect(() => {
		if (productsQuery.data) {
			getProducts(productsQuery.data.products) // используйте productsQuery.data
		}
	}, [productsQuery.data]) // измените зависимость на productsQuery.data

	return <AdminPanel products={products} />
}

export const getStaticProps: GetStaticProps<
	TypePaginationProducts
> = async () => {
	const data = await ProductService.getAll()

	return {
		props: data,
	}
}

export default Admin
