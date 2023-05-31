import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import type { SubmitHandler } from 'react-hook-form'

import { IEmailRegPassword } from '@/store/user/user.interface'

import Meta from '../../ui/Meta'
import { Button } from '../../ui/button/Button'
import Field from '../../ui/input/Field'
import Heading from '../../ui/layout/Heading'

import { useAuthRedirect } from './useAuthRedirect'
import { validEmail } from './valid-email'
import { validPhone } from './valid-phone'
import { useActions } from '@/../src/hooks/useAction'

const Auth: FC = () => {
	useAuthRedirect()

	const { login, register } = useActions()

	const [type, setType] = useState<'login' | 'register'>('login')
	const [authError, setAuthError] = useState('')

	const {
		register: formRegister,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<IEmailRegPassword>({ mode: 'onChange' })

	const onSubmit: SubmitHandler<IEmailRegPassword> = async data => {
		if (type === 'login') {
			const response: any = await login(data)
			setAuthError(response.payload)
		} else if (type === 'register') {
			const response: any = await register(data)
			console.log(response)
			setAuthError(response.payload)
		}
		reset()
	}

	return (
		<Meta title="Auth">
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
						type="text"
						error={errors.email?.message}
					/>
					{type === 'register' ? (
						<>
							<Field
								{...formRegister('name', {
									minLength: {
										value: 1,
										message: 'Min length should more 6 symbols',
									},
								})}
								type="text"
								placeholder="Name"
								error={errors.name?.message}
							/>
							<Field
								{...formRegister('phone', {
									required: 'Phone is required',
									pattern: {
										value: validPhone,
										message: 'Please enter a valid phone',
									},
								})}
								type="text"
								placeholder="Phone"
								error={errors.phone?.message}
							/>
						</>
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
					<div className="flex flex-center text-red">{authError}</div>
					<Button className="mt-5 ml-10" type="submit" variant="orange">
						Let's go!
					</Button>
					<div>
						<button
							type="button"
							className="inline-block opacity-20 mt-5 ml-20 text-sm"
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
