import axios from 'axios'
import React, { FormEvent, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { Button } from '../button/Button'
import Field from '../input/Field'

interface CategoryType {
	name: string
}

const CategoryCreate = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<CategoryType>({ mode: 'onChange' })

	const onSubmit: SubmitHandler<CategoryType> = async data => {
		axios.post('http://localhost:4200/api/categories', data)
		reset()
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Field
				{...register('name')}
				placeholder="Категория"
				error={errors.name?.message}
			/>
			<Button className="mt-5" type="submit" variant="orange">
				Создать категорию
			</Button>
		</form>
	)
}

export default CategoryCreate
