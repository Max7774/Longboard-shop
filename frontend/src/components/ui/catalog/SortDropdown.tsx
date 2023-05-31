import { Dispatch, FC, SetStateAction } from 'react'

import { EnumProductsSort } from '@/services/product/product.types'

interface ISortDropdown {
	sortType: EnumProductsSort
	setSortType: Dispatch<SetStateAction<EnumProductsSort>>
}

const SortDropdown: FC<ISortDropdown> = ({ sortType, setSortType }) => {
	return (
		<div className="text-left mb-5">
			<select
				value={sortType}
				onChange={e => setSortType(e.target.value as any)}
				className="rounded-xl text-center appearance-none py-1 px-2 bg-gray border-gray"
			>
				{(
					Object.keys(EnumProductsSort) as Array<keyof typeof EnumProductsSort>
				).map(key => {
					return (
						<option key={EnumProductsSort[key]} value={EnumProductsSort[key]}>
							{`↓ ${EnumProductsSort[key]}`}
						</option>
					)
				})}
			</select>
		</div>
	)
}

export default SortDropdown
