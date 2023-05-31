import React from 'react'

import Meta from '@/ui/Meta'
import Catalog from '@/ui/catalog/Catalog'
import Layout from '@/ui/layout/Layout'

import { NextPageAuth } from '@/providers/auth-provider/auth-page.types'

import { useProfile } from '@/hooks/useProfile'

const FavouritesPage: NextPageAuth = () => {
	const { profile } = useProfile()
	return (
		<Meta title="Понравившиеся">
			<Layout>
				<Catalog products={profile?.favourites || []} title="Понравившиеся" />
			</Layout>
		</Meta>
	)
}

FavouritesPage.isOnlyUser = true

export default FavouritesPage
