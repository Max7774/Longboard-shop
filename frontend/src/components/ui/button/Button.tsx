import cn from 'clsx'
import React, {
	ButtonHTMLAttributes,
	FC,
	PropsWithChildren,
	useState,
} from 'react'

import { EnumProductsSort } from '@/services/product/product.types'

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant: 'orange' | 'white'
	size?: 'sm' | 'md' | 'lg'
}

export const Button: FC<PropsWithChildren<IButton>> = ({
	children,
	className,
	variant,
	size = 'md',
	...rest
}) => {
	return (
		<button
			{...rest}
			className={cn(
				'rounded-xl font-medium shadow-xl px-10 py-2 hover:shadow-lg transition duration-300 ease-in-out',
				{
					'text-white bg-primary': variant === 'orange',
					'text-primary bg-white': variant === 'white',
					'px-5 py-2 text-sm': size === 'sm',
				},
				className,
			)}
		>
			{children}
		</button>
	)
}
