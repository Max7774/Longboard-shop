import React from 'react'

import Meta from '@/ui/Meta'
import Layout from '@/ui/layout/Layout'

import Map from '@/screens/Activity/Map'

const Activities = () => {
	return (
		<Meta title="Activity">
			<Layout>
				<Map />
			</Layout>
		</Meta>
	)
}

export default Activities
