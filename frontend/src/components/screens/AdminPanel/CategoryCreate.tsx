import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { FC, FormEvent, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { AiFillCloseCircle } from 'react-icons/ai'

import { ICategory } from '@/types/category.interface'

import LoaderV2 from '../../ui/LoaderV2'
import { Button } from '../../ui/button/Button'
import Field from '../../ui/input/Field'

import { CategoryService } from '@/services/category.service'

interface CategoryType {
	name: string
}

const CategoryCreate: FC<{
	data: ICategory[] | undefined
	isLoading: boolean
}> = ({ data, isLoading }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<CategoryType>({ mode: 'onChange' })

	const onSubmit: SubmitHandler<CategoryType> = async data => {
		axios.post(`${process.env.SERVER_URL}/categories`, data)
		reset()
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Field
				{...register('name')}
				placeholder="Категория"
				error={errors.name?.message}
			/>
			<Button className="flex mt-5" type="submit" variant="orange">
				Создать категорию
			</Button>
			<div className="flex mt-3">Categories:</div>
			{isLoading ? (
				<LoaderV2 />
			) : (
				data?.map((category: ICategory) => (
					<Button key={category.id} className="m-2" variant="orange">
						<div
							key={category.id}
							className="flex text-xl grid grid-cols-2 gap-3"
						>
							{category.name}
							<div key={category.id} className="flex ml-10 mt-1">
								<AiFillCloseCircle />
							</div>
						</div>
					</Button>
				))
			)}
		</form>
	)
}

export default CategoryCreate
