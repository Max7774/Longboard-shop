import { NextPage } from 'next'
import React from 'react'

import AdminPanel from '@/ui/AdminPanel/AdminPanel'
import Meta from '@/ui/Meta'
import Layout from '@/ui/layout/Layout'

const Admin: NextPage = () => {
	return (
		<Meta title="Admin panel">
			<Layout>
				<AdminPanel />
			</Layout>
		</Meta>
	)
}

export default Admin
