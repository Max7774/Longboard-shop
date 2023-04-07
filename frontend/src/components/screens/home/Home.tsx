import Cookies from 'js-cookie'
import { FC } from 'react'

import CatalogPagination from '@/ui/catalog/CatalogPagination'
import Layout from '@/ui/layout/Layout'

import { useActions } from '@/hooks/useAction'
import { useAuth } from '@/hooks/useAuth'

import Meta from '../../ui/Meta'
import Heading from '../../ui/layout/Heading'

// import Catalog from '../../ui/catalog/Catalog'
import {
	TypePaginationProducts,
	TypeProducts,
} from '@/../src/types/product.interface'

const Home: FC<TypePaginationProducts> = ({ products, length }) => {
	const { user } = useAuth()

	const { logout } = useActions()
	return (
		<Meta title="Home">
			<Layout>
				{/* {!!user && <button onClick={() => logout()}>Logout</button>} */}
				<CatalogPagination
					title="Freshed products"
					data={{ products, length }}
				/>
			</Layout>
		</Meta>
	)
}

export default Home
