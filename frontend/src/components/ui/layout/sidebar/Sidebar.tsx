import { Skeleton } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import cn from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { FC, useEffect } from 'react'
import { FiLogOut } from 'react-icons/fi'

import { getCategories } from '@/store/category/category.actions'

import { useAppDispatch, useAppSelector } from '@/hooks/dispatch'
import { useActions } from '@/hooks/useAction'
import { useAuth } from '@/hooks/useAuth'

import { CategoryService } from '@/services/category.service'

const Sidebar: FC = () => {
	const { isLoading, data: response } = useQuery(
		['get categories'],
		() => CategoryService.getAll(),
		{ select: ({ data }) => data },
	)

	const categories = useAppSelector(store => store.categories)
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(getCategories())
	}, [])

	const { asPath } = useRouter()

	const { user } = useAuth()
	const { logout } = useActions()

	return (
		<aside
			className="bg-secondary flex flex-col justify-between"
			style={{
				height: 'calc(300vh - 100vh)',
			}}
		>
			<div>
				{categories === undefined ? (
					<>
						<Skeleton
							variant="text"
							className="ml-7"
							width={200}
							height={40}
							sx={{ fontSize: '1rem', bgcolor: 'grey.300' }}
						/>
						<Skeleton
							variant="text"
							className="ml-7 mt-9"
							width={200}
							height={40}
							sx={{ fontSize: '1rem', bgcolor: 'grey.300' }}
						/>
						<Skeleton
							variant="text"
							className="ml-7"
							width={200}
							height={40}
							sx={{ fontSize: '1rem', bgcolor: 'grey.300' }}
						/>
						<Skeleton
							variant="text"
							className="ml-7"
							width={200}
							height={40}
							sx={{ fontSize: '1rem', bgcolor: 'grey.300' }}
						/>
						<Skeleton
							variant="text"
							className="ml-7"
							width={200}
							height={40}
							sx={{ fontSize: '1rem', bgcolor: 'grey.300' }}
						/>
					</>
				) : categories ? (
					<>
						<div className="text-xl text-white mt-4 mb-6 ml-6">
							Категории: ↓
						</div>
						<ul>
							{categories.map(category => (
								<li key={category.id}>
									<Link
										key={category.id + 1}
										className={cn(
											'block text-lg my-3 px-10 hover:text-primary transition-colors duration-200',
											asPath === `/category/${category.slug}`
												? 'text-primary'
												: 'text-white',
										)}
										href={`/category/${category.slug}`}
									>
										{`- ${category.name}`}
									</Link>
								</li>
							))}
							{/* <li>
								<Link
									key={categories.length + 1}
									className="block text-white text-lg my-3 px-10 hover:text-primary transition-colors duration-200"
									href={'/activities'}
								>
									<div key={categories.length}>#Cобытия</div>
								</Link>
							</li> */}
						</ul>
					</>
				) : (
					<div>Categories not found</div>
				)}
			</div>

			{!!user && (
				<button
					className="text-white flex items-center ml-10 mb-10"
					onClick={() => logout()}
				>
					<FiLogOut />
					<span className="ml-2">Logout</span>
				</button>
			)}
		</aside>
	)
}

export default Sidebar
