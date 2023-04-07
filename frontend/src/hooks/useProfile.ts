import { useQuery } from '@tanstack/react-query'

import { errorCatch } from '../api/api.helper'
import { UserService } from '../services/user.service'
import { IFullUser, IUser } from '../types/user.interface'

import { useAuth } from './useAuth'

export const useProfile = () => {
	const { user } = useAuth()

	const { data } = useQuery(['get profile'], () => UserService.getProfile(), {
		select: ({ data }) => data,
		onError: error => {
			console.log(errorCatch(error))
		},
		enabled: !!user,
	})
	return { profile: data }
}
