import { useQuery } from '@tanstack/react-query'
import { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

import Meta from '@/ui/Meta'
import Catalog from '@/ui/catalog/Catalog'
import Layout from '@/ui/layout/Layout'

import { ProductService } from '@/services/product/product.service'

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
					products={data?.products || []}
					title={`Поиск по запросу "${query.term || ''}"`}
				/>
			</Layout>
		</Meta>
	)
}

export default SearchPage
