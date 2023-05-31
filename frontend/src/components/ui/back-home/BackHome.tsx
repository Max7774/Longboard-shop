import Link from 'next/link'
import React, { FC } from 'react'

const Back: FC<{ title?: string; href?: string }> = ({ title, href }) => {
	return (
		<div>
			<Link href={`/${href === undefined ? '' : href}`}>
				<div className="mb-2">{`<- Back ${title}`}</div>
			</Link>
		</div>
	)
}

export default Back
