import { useQuery } from '@tanstack/react-query'
import React, { FC, useEffect, useState } from 'react'

import { useAppDispatch, useAppSelector } from '@/hooks/dispatch'
import { useActions } from '@/hooks/useAction'

import LoaderV2 from '../LoaderV2'
import { Button } from '../button/Button'
import Heading from '../layout/Heading'

import SortDropdown from './SortDropdown'
import Productitem from './product-item/Productitem'
import {
	IProduct,
	TypePaginationProducts,
} from '@/../src/types/product.interface'
import { ProductService } from '@/services/product/product.service'
import { EnumProductsSort, ProductType } from '@/services/product/product.types'

interface ICatalogPagination {
	data: TypePaginationProducts
	title?: string
}

const CatalogPagination: FC<ICatalogPagination> = ({ data, title }) => {
	const [page, setPage] = useState(1)

	const [products, setProducts] = useState<IProduct[]>(data.products)

	const [sortType, setSortType] = useState<EnumProductsSort>(
		EnumProductsSort.NEWEST,
	)

	const { data: response, isLoading } = useQuery(
		['products', sortType, page],
		() =>
			ProductService.getAll({
				page,
				perPage: 4,
				sort: sortType,
			}),
		{
			initialData: data,
			keepPreviousData: true,
		},
	)

	const removeProductFromState = (deletedProductId: number) => {
		const updatedProducts = products.filter(
			product => product.id !== deletedProductId,
		)
		setProducts(updatedProducts)
	}

	useEffect(() => {
		setProducts(response.products)
	}, [response.products])

	const paginationLength = Math.floor(response.length / 3)

	if (isLoading) return <LoaderV2 />

	return (
		<section>
			{title && <Heading className="mb-5">{title}</Heading>}
			<SortDropdown sortType={sortType} setSortType={setSortType} />
			{products?.length ? (
				<>
					<div className="grid grid-cols-4 gap-10">
						{products?.map(product => (
							<Productitem
								key={product.id}
								product={product}
								removeProductFromState={removeProductFromState}
							/>
						))}
					</div>
					<div className="text-center mb-16">
						{Array.from({ length: paginationLength }).map((_, index) => {
							const pageNumber = index + 1
							return (
								<Button
									key={pageNumber}
									size="sm"
									variant={page === pageNumber ? 'orange' : 'white'}
									onClick={() => setPage(pageNumber)}
									className="mx-3"
								>
									{pageNumber}
								</Button>
							)
						})}
					</div>
				</>
			) : (
				<div>There are no products</div>
			)}
		</section>
	)
}

export default CatalogPagination
