import Image from 'next/image'
import Link from 'next/link'
import React, { FC } from 'react'
import { AiOutlineHeart } from 'react-icons/ai'

import Search from '@/ui/search/Search'

import HeaderProfile from './HeaderProfile'
import Cart from './cart/HeaderCart'

const Header: FC = () => {
	return (
		<header
			className="bg-secondary w-full py-6 px-6 grid"
			style={{
				gridTemplateColumns: '1fr 3fr 1.2fr',
			}}
		>
			<Link href="/">
				<Image priority width={180} height={37} src="" alt="" />
			</Link>
			<Search />
			<div className="flex items-center justify-end gap-10">
				<Link href="/favourites" className="text-white">
					<AiOutlineHeart size={28} />
				</Link>
				<Cart />
				<HeaderProfile />
			</div>
		</header>
	)
}

export default Header
