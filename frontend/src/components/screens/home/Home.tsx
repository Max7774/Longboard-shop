import { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import CatalogPagination from '@/ui/catalog/CatalogPagination'
import Layout from '@/ui/layout/Layout'

import { useActions } from '@/hooks/useAction'
import { useAuth } from '@/hooks/useAuth'
import { useTypedSelector } from '@/hooks/useTypedSelector'

import Meta from '../../ui/Meta'
import Auth from '../auth/Auth'

import { TypePaginationProducts } from '@/../src/types/product.interface'

const Home: FC<TypePaginationProducts> = ({ products, length }) => {
	const { user } = useAuth()

	// console.log(products)

	const { getProducts } = useActions()
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getProducts(products))
	}, [])

	return (
		<Meta title="Home">
			{!!user ? (
				<Layout>
					<CatalogPagination
						title="Свежие товары"
						data={{ products, length }}
					/>
				</Layout>
			) : (
				<Auth />
			)}
		</Meta>
	)
}

export default Home
