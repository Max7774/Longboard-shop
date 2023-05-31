import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import React from 'react'

import Meta from '@/ui/Meta'
import ProductitemFull from '@/ui/catalog/product-item/ProductitemFull'
import Layout from '@/ui/layout/Layout'

import { IProduct } from '@/types/product.interface'

import { ProductService } from '@/services/product/product.service'

const ProductPage: NextPage<{ product: IProduct }> = ({ product }) => {
	return (
		<Meta title={product.name}>
			<Layout>
				<ProductitemFull product={product} />
			</Layout>
		</Meta>
	)
}

export const getStaticPaths: GetStaticPaths = async () => {
	const product = await ProductService.getAll()

	const paths = product.products.map(product => ({
		params: { slug: product.slug },
	}))

	return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const { data: product } = await ProductService.getBySlug(
		params?.slug as string,
	)

	return {
		props: {
			product,
		},
	}
}

export default ProductPage
