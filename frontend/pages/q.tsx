import { useQuery } from '@tanstack/react-query'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React from 'react'

import Meta from '@/ui/Meta'
import Layout from '@/ui/layout/Layout'

import { ProductService } from '@/services/product/product.service'
import Catalog from '@/ui/catalog/Catalog'

const SearchPage: NextPage = () => {
	const { query } = useRouter()

	const { data } = useQuery(['search products', query.term], () =>
		ProductService.getAll({
			searchTerm: query.term as string,
		}),
	)

	return (
		<Meta title="Поиск">
			<Layout>
				<Catalog
					products={data?.products || ''}
					title={`Поиск по запросу "${query.term || ''}"`}
				/>
			</Layout>
		</Meta>
	)
}

export default SearchPage
