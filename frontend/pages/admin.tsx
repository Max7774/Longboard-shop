import { GetStaticProps, NextPage } from 'next'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { useAppDispatch } from '@/hooks/dispatch'
import { useActions } from '@/hooks/useAction'
import { useTypedSelector } from '@/hooks/useTypedSelector'

import { TypePaginationProducts } from '@/types/product.interface'

import AdminPanel from '@/screens/AdminPanel/AdminPanel'
import { ProductService } from '@/services/product/product.service'

const Admin: NextPage<TypePaginationProducts> = ({ products }) => {
	const { getProductsAll } = useActions()

	useEffect(() => {
		getProductsAll()
	}, [])

	const productAll = useTypedSelector(store => store.products)

	return <AdminPanel products={productAll} />
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
