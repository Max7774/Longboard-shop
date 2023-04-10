import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import type { SubmitHandler } from 'react-hook-form'

import Meta from '../../ui/Meta'
import { Button } from '../../ui/button/Button'
import Field from '../../ui/input/Field'
import Heading from '../../ui/layout/Heading'

import { useAuthRedirect } from './useAuthRedirect'
import { validEmail } from './valid-email'
import { useActions } from '@/../src/hooks/useAction'
import { useAuth } from '@/../src/hooks/useAuth'
import {
	IEmailPassword,
	IEmailRegPassword,
} from '@/../src/store/user/user.interface'

interface Props {}

const Auth: FC = () => {
	useAuthRedirect()

	const { isLoading } = useAuth()

	const { login, register } = useActions()

	const [type, setType] = useState<'login' | 'register'>('login')

	const {
		register: formRegister,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<IEmailRegPassword>({ mode: 'onChange' })

	const onSubmit: SubmitHandler<IEmailRegPassword> = data => {
		if (type === 'login') {
			login(data)
		} else if (type === 'register') {
			register(data)
		}
		reset()
	}

	return (
		<Meta title="auth">
			<section className="flex h-screen">
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="rounded-lg bg-white shadow-sm p-8 m-auto"
				>
					<Heading className="capitalize text-center mb-4">{type}</Heading>
					<Field
						{...formRegister('email', {
							required: 'Email is required',
							pattern: {
								value: validEmail,
								message: 'Please enter a valid email addres',
							},
						})}
						placeholder="Email"
						error={errors.email?.message}
					/>
					{type === 'register' ? (
						<Field
							{...formRegister('name', {
								minLength: {
									value: 1,
									message: 'Min length should more 6 symbols',
								},
							})}
							type="name"
							placeholder="Name"
							error={errors.name?.message}
						/>
					) : null}
					<Field
						{...formRegister('password', {
							required: 'Password is required',
							minLength: {
								value: 6,
								message: 'Min length should more 6 symbols',
							},
						})}
						type="password"
						placeholder="Password"
						error={errors.password?.message}
					/>
					<Button type="submit" variant="orange">
						Let's go!
					</Button>
					<div>
						<button
							type="button"
							className="inline-block opacity-20 mt-3 text-sm"
							onClick={() => setType(type === 'login' ? 'register' : 'login')}
						>
							{type === 'login' ? 'Register' : 'Login'}
						</button>
					</div>
				</form>
			</section>
		</Meta>
	)
}

export default Auth
