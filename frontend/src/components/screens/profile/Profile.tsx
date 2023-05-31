import Image from 'next/image'
import Link from 'next/link'
import React, { FC } from 'react'

import Meta from '@/ui/Meta'
import Back from '@/ui/back-home/BackHome'
import Heading from '@/ui/layout/Heading'
import Layout from '@/ui/layout/Layout'

import { IFullUser } from '@/types/user.interface'

const ProfileUser: FC<{ profile: IFullUser | undefined }> = ({ profile }) => {
	return (
		<Meta title="Profile">
			<Layout>
				<Heading>Profile</Heading>
				<Back title="Home" />
				<div className="flex grid grid-cols-4 gap-1">
					<Image
						src={profile?.avatarPath === undefined ? '' : profile?.avatarPath}
						width={200}
						height={200}
						alt="..."
						className="mt-5 rounded-full border-primary border border-solid animate-opacity"
					/>
					<div>{profile?.name}</div>
					<div>{profile?.email}</div>
				</div>
				<div className="m-2">
					{profile?.orders.map((el, i) => (
						<ul key={i} className="m-2">
							<li key={el.id}>{` - Total of order #${el.id} = ${el.total}`}</li>
						</ul>
					))}
				</div>
			</Layout>
		</Meta>
	)
}

export default ProfileUser
