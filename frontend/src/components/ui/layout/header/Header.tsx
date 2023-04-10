import Image from 'next/image'
import Link from 'next/link'
import React, { FC } from 'react'
import { AiOutlineHeart } from 'react-icons/ai'
import { CiReceipt } from 'react-icons/ci'
import { FiServer } from 'react-icons/fi'

import Search from '@/ui/search/Search'

import { useAuth } from '@/hooks/useAuth'

import HeaderProfile from './HeaderProfile'
import Cart from './cart/HeaderCart'
import MyOrdersPage from '@/../pages/my-orders'

const Header: FC = () => {
	const { user } = useAuth()

	console.log(user)

	return (
		<header
			className="bg-secondary w-full py-6 px-6 grid"
			style={{
				gridTemplateColumns: '1fr 3fr 1.2fr',
			}}
		>
			<Link href="/">
				<img
					style={{ borderRadius: '20px' }}
					width={100}
					height={20}
					src="https://www.creativefabrica.com/wp-content/uploads/2022/09/07/Skate-shop-emblem-vector-illustration-S-Graphics-37963343-1.jpg"
					alt="Longboard shop"
				/>
			</Link>

			<Search />
			<div className="flex items-center justify-end gap-10">
				{user?.isAdmin ? (
					<div style={{ textDecoration: 'none', color: 'white' }}>
						<FiServer size={28} />
					</div>
				) : null}
				<div style={{ textDecoration: 'none', color: 'white' }}>
					<Link href={'/my-orders'}>
						<CiReceipt size={28} />
					</Link>
				</div>
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
