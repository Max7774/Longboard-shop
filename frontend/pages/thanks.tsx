import { NextPage } from 'next'

import Meta from '@/ui/Meta'
import Heading from '@/ui/layout/Heading'
import Layout from '@/ui/layout/Layout'

const ThanksPage: NextPage = () => {
	return (
		<Meta title="Thanks">
			<Layout>
				<Heading>Thanks!</Heading>
			</Layout>
		</Meta>
	)
}

export default ThanksPage
