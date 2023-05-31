import cn from 'clsx'
import React, { FC, forwardRef } from 'react'

import { ISelector } from './selector.interface'

const Selector = forwardRef<HTMLSelectElement, ISelector>(
	({ value, className, style, error, placeholder, Icon, ...rest }) => {
		console.log()
		return (
			<div>
				<label className={cn('mb-4', className)} style={style}>
					<span className="mb-1 block">
						{Icon && <Icon className="mr-3" />}
						{placeholder}
					</span>
					<select
						className={cn(
							'px-4 py-2 w-full outline-none border border-gray border-solid focus:border-primary transition-all placeholder:text-gray rounded-lg',
							{ 'border-red': !!error },
						)}
						name=""
						id=""
						defaultValue={'Выберите категорию'}
						{...rest}
					>
						{value?.map(el => (
							<option key={el.id} value={el.id}>
								{el.name}
							</option>
						))}
					</select>
				</label>
				{error && <div className="text-red mt-1 text-sm">{error}</div>}
			</div>
		)
	},
)

export default Selector
