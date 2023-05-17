import axios, { AxiosResponse } from 'axios'
import React, { FC, memo, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import Meta from '../Meta'
import { Button } from '../button/Button'
import Field from '../input/Field'

import CategoryCreate from './CategoryCreate'
import UploadFile from './UploadFile'
import { ProductType } from '@/services/product/product.types'

const AdminPanel: FC = () => {
	const [state, setState] = useState('')
	const [productID, setProductID] = useState<number>(0)

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<ProductType>({ mode: 'onChange' })

	const onSubmit: SubmitHandler<ProductType> = async data => {
		setState(data.name)

		const response = await axios.post(
			'http://localhost:4200/api/products/create',
			{
				name: data.name,
				description: data.description,
				price: data.price,
				categoryId: data.categoryId,
			},
		)

		const id = await response.data
		if (id !== null) {
			setProductID(id)
		}

		reset()
	}

	return (
		<>
			<CategoryCreate />
			<section>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Field
						{...register('name')}
						onChange={e => setState(e.target.value)}
						placeholder="Название товара"
					/>
					<Field {...register('description')} placeholder="Описание" />
					<Field
						type="number"
						{...register('price', {
							valueAsNumber: true,
						})}
						placeholder="Цена"
						error={errors.price?.message}
					/>
					<Field
						type="number"
						{...register('categoryId', {
							valueAsNumber: true,
						})}
						placeholder="Категория"
						error={errors.categoryId?.message}
					/>
					<Button className="mt-5" type="submit" variant="orange">
						Создать товар
					</Button>
				</form>
				<UploadFile state={state} productID={productID} />
			</section>
		</>
	)
}

export default memo(AdminPanel)
