import Image from 'next/image'
import Link from 'next/link'
import React, { FC } from 'react'

import { useProfile } from '@/hooks/useProfile'

const HeaderProfile: FC = () => {
	const { profile } = useProfile()

	return (
		<div>
			{profile?.avatarPath && (
				<Link href={`/profile`}>
					<Image
						width={43}
						height={43}
						src={profile?.avatarPath}
						alt="profile"
						className="rounded-full border-primary border border-solid animate-opacity"
					/>
				</Link>
			)}
		</div>
	)
}

export default HeaderProfile
