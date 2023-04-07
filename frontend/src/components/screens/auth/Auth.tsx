import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import type { SubmitHandler } from 'react-hook-form'

import Meta from '../../ui/Meta'
import { Button } from '../../ui/button/Button'
import Heading from '../../ui/layout/Heading'
import Field from '../../ui/input/Field'

import { useAuthRedirect } from './useAuthRedirect'
import { validEmail } from './valid-email'
import { useActions } from '@/../src/hooks/useAction'
import { useAuth } from '@/../src/hooks/useAuth'
import { IEmailPassword } from '@/../src/store/user/user.interface'

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
	} = useForm<IEmailPassword>({ mode: 'onChange' })

	const onSubmit: SubmitHandler<IEmailPassword> = data => {
		if (type === 'login') {
			login(data)
		} else {
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
