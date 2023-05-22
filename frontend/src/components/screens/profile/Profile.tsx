import Image from 'next/image'
import React, { FC } from 'react'

import Meta from '@/ui/Meta'
import Heading from '@/ui/layout/Heading'
import Layout from '@/ui/layout/Layout'

import { IFullUser } from '@/types/user.interface'
import Link from 'next/link'
import Back from '@/ui/back-home/BackHome'

const ProfileUser: FC<{ profile: IFullUser | undefined }> = ({ profile }) => {
	console.log(profile)
	return (
		<Meta title="Profile">
			<Layout>
				<Heading>Profile</Heading>
				<Back title='Home' />
				<div className="flex grid grid-cols-4 gap-1">
					<Image
						src={profile?.avatarPath === undefined ? '' : profile?.avatarPath}
						width={200}
						alt="..."
						height={200}
						className="mt-5 rounded-full border-primary border border-solid animate-opacity"
					/>
					<div>{profile?.name}</div>
					<div>{profile?.email}</div>
				</div>
			</Layout>
		</Meta>
	)
}

export default ProfileUser
