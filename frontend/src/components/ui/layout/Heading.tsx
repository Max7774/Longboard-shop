import React, { FC, PropsWithChildren } from 'react'

interface IHeading {
	className?: string
}

const Heading: FC<PropsWithChildren<IHeading>> = ({ className, children }) => {
	return (
		<h1
			className={`text-opacity-80 font-semibold ${
				className?.includes('xl') ? '' : 'text-3xl'
			} ${className}`}
		>
			{children}
		</h1>
	)
}

export default Heading
