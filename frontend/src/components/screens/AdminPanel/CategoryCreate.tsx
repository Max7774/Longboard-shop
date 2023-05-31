import React, { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { MdDeleteOutline } from 'react-icons/md'

import { useActions } from '@/hooks/useAction'

import { CategoryType, ICategory } from '@/types/category.interface'

import LoaderV2 from '../../ui/LoaderV2'
import { Button } from '../../ui/button/Button'
import Field from '../../ui/input/Field'

const CategoryCreate: FC<{ categories: ICategory[] }> = ({ categories }) => {
	const { createCategoryState, deleteCategory } = useActions()

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<CategoryType>({ mode: 'onChange' })

	const onSubmit: SubmitHandler<CategoryType> = async data => {
		createCategoryState(data)
		reset()
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Field
				{...register('name')}
				placeholder="Название категории"
				error={errors.name?.message}
			/>
			<Button className="flex mt-5" type="submit" variant="orange">
				Создать категорию
			</Button>
			<div className="flex mt-3">Категории:</div>
			{categories.length === 0 ? (
				<LoaderV2 />
			) : (
				<div className="flex grid grid-cols-4 gap-4">
					{categories.map((category: ICategory) => (
						<Button
							key={category.id}
							type="button"
							className="m-2"
							variant="orange"
							onClick={() => deleteCategory({ id: category.id })}
						>
							<div key={category.id + 1} className="flex justify-between m-1">
								{category.name}
								<MdDeleteOutline key={category.id + 2} className="mt-1" />
							</div>
						</Button>
					))}
				</div>
			)}
		</form>
	)
}

export default CategoryCreate
