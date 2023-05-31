import { CSSProperties } from 'react'
import { IconType } from 'react-icons'

import { ICategory } from '@/types/category.interface'

export interface ISelector {
	className?: string
	style?: CSSProperties | undefined
	placeholder: string
	Icon?: IconType
	value?: ICategory[]
	error?: string
}
