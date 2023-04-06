import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import React from 'react'

import Meta from '@/ui/Meta'
import Layout from '@/ui/layout/Layout'

import { ICategory } from '@/types/category.interface'
import { IProduct } from '@/types/product.interface'

import { CategoryService } from '@/services/category.service'
import { ProductService } from '@/services/product/product.service'
import Catalog from '@/ui/catalog/Catalog'

const CategoryPage: NextPage<{ products: IProduct[]; category: ICategory }> = ({
	products,
	category,
}) => {
	return (
		<Meta title={category.name}>
			<Layout>
				<Catalog products={products || []} title={category.name} />
			</Layout>
		</Meta>
	)
}

export const getStaticPaths: GetStaticPaths = async () => {
	const categories = await CategoryService.getAll()

	const paths = categories.data.map(category => {
		return {
			params: { slug: category.slug },
		}
	})

	return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const { data: products } = await ProductService.getByCategory(
		params?.slug as string,
	)

	const { data: category } = await CategoryService.getBySlug(
		params?.slug as string,
	)

	return {
		props: {
			products,
			category,
		},
	}
}

export default CategoryPage
