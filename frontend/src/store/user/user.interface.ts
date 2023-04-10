import { IUser } from '../../types/user.interface'

export interface IUserState {
	email: string
}

export interface ITokens {
	accessToken: string
	refreshToken: string
}

export interface IInitialState {
	user: IUserState | null
	isLoading: boolean
}

export interface IEmailRegPassword {
	email: string
	name: string
	password: string
}

export interface IEmailPassword {
	email: string
	password: string
}

export interface IAuthResponse extends ITokens {
	user: IUser
}
