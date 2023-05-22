import { NextPage } from 'next'
import React from 'react'

import { NextPageAuth } from '@/providers/auth-provider/auth-page.types'

import { useProfile } from '@/hooks/useProfile'

import { IFullUser } from '@/types/user.interface'

import ProfileUser from '@/screens/profile/Profile'

const Profile: NextPageAuth = () => {
	const { profile } = useProfile()
	return <ProfileUser profile={profile} />
}

Profile.isOnlyUser = true

export default Profile
