import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { useAuth } from '@/../src/hooks/useAuth'

export const useAuthRedirect = () => {
	const { user } = useAuth()

	const { replace } = useRouter()

	useEffect(() => {
		if (user) replace('/')
	}, [user])
}
