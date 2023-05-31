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

const Header: FC = () => {
	const { user } = useAuth()

	return (
		<header
			className="bg-secondary w-full py-6 px-6 grid"
			style={{
				gridTemplateColumns: '1fr 3fr 1.2fr',
			}}
		>
			<Link href="/">
				<svg height="60" width="200">
					<text x="0" y="15" fill="white" transform="rotate(-20 110,-40)">
						Long-shop
					</text>
					Sorry, your browser does not support inline SVG.
				</svg>
				{/* <div
					style={{
						borderRadius: '20px',
						width: 250,
						height: 90,
						overflow: 'hidden',
					}}
				>
					<Image
						width={250}
						height={90}
						priority
						src={'http://195.24.67.180/1200px-Skateboard.svg.png'}
						alt="Longboard shop"
						layout="responsive"
						objectFit="conver"
					/>
				</div> */}
			</Link>

			<Search />
			<div className="flex items-center justify-end gap-10">
				{user?.isAdmin === true ? (
					<div style={{ textDecoration: 'none', color: 'white' }}>
						<Link href={'/admin'}>
							<FiServer size={28} />
						</Link>
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
