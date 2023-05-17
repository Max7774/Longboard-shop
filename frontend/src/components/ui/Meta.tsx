import Head from 'next/head'
import { useRouter } from 'next/router'
import { FC, PropsWithChildren } from 'react'

interface ISeo {
	title: string
	descripton?: string
	image?: string
}

export const titleMerge = (title: string) => `${title} | Lognboard Shop`

const Meta: FC<PropsWithChildren<ISeo>> = ({
	title,
	descripton,
	image,
	children,
}) => {
	const { asPath } = useRouter()

	const currentUrl = `${process.env.APP_URL}${asPath}`

	return (
		<>
			<Head>
				<title itemProp="headline">{titleMerge(title)}</title>
				{descripton ? (
					<>
						<meta
							itemProp="description"
							name="description"
							content={descripton}
						/>
						<link rel="canonical" href={currentUrl} />
						<meta property="og:locale" content="en" />
						<meta property="og:title" content={titleMerge(title)} />
						<meta property="og:url" content={currentUrl} />
						{/* <meta property="og:image" content={image || 'favicon.ico'} /> */}
						<meta property="og:description" content={descripton} />
					</>
				) : (
					<meta name="robots" content="noindex, nofollow" />
				)}
			</Head>
			{children}
		</>
	)
}

export default Meta
