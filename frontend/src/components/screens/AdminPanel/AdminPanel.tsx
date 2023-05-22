import { useMutation, useQuery } from '@tanstack/react-query'
import cn from 'clsx'
import React, { FC, memo, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'

import Back from '@/ui/back-home/BackHome'

import { useAppSelector } from '@/hooks/dispatch'
import { useActions } from '@/hooks/useAction'
import { useAuth } from '@/hooks/useAuth'
import { useTypedSelector } from '@/hooks/useTypedSelector'

import { IProduct } from '@/types/product.interface'

import Meta from '../../ui/Meta'
import { Button } from '../../ui/button/Button'
import Field from '../../ui/input/Field'
import Layout from '../../ui/layout/Layout'

import CategoryCreate from './CategoryCreate'
import UploadFile from './UploadFile'
import Auth from '@/screens/auth/Auth'
import { CategoryService } from '@/services/category.service'
import { ProductService } from '@/services/product/product.service'
import { ProductType } from '@/services/product/product.types'

const AdminPanel: FC<{ products: IProduct[] }> = ({ products }) => {
	const [productID, setProductID] = useState<number>(0)
	const [part, setPart] = useState<number>(0)

	const { create } = useActions()
	const { user } = useAuth()
	// console.log(products)

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<ProductType>({ mode: 'onChange' })

	const onSubmit: SubmitHandler<ProductType> = async data => {
		console.log(data)
		const response = create(data)

		console.log(response)

		setProductID(data.categoryId)
		setPart(prev => prev + 1)

		reset()
	}

	const { data, isLoading } = useQuery(
		['get categories'],
		() => CategoryService.getAll(),
		{ select: ({ data }) => data },
	)

	return (
		<>
			<Meta title="Admin panel">
				{!!user ? (
					<Layout>
						<Back title="Home" />
						<section>
							{part === 0 ? (
								<>
									<CategoryCreate data={data} isLoading={isLoading} />
									<form onSubmit={handleSubmit(onSubmit)}>
										<Field
											{...register('name')}
											placeholder="Название товара"
										/>
										<Field
											{...register('description')}
											placeholder="Описание"
										/>
										<Field
											type="number"
											{...register('price', {
												valueAsNumber: true,
											})}
											placeholder="Цена"
											error={errors.price?.message}
										/>
										<span className="mb-1 block">Категории</span>
										<select
											{...register('categoryId')}
											className={cn(
												'px-4 py-2 w-full outline-none border border-gray border-solid focus:border-primary transition-all placeholder:text-gray rounded-lg',
											)}
											defaultValue={'Выберите категорию'}
										>
											<option value="Выберите категорию" disabled>
												Выберите категорию
											</option>
											{data?.map(el => (
												<>
													<option key={el.id} value={el.id}>
														{el.name}
													</option>
												</>
											))}
										</select>
										<Button className="mt-5" type="submit" variant="orange">
											Создать товар
										</Button>
									</form>
								</>
							) : null}
							{part === 1 ? (
								<UploadFile productID={productID} setPart={setPart} />
							) : null}
						</section>
					</Layout>
				) : (
					<Auth />
				)}
			</Meta>
		</>
	)
}

export default memo(AdminPanel)
