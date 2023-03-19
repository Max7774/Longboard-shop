import { useMutation } from '@tanstack/react-query'
import { useQueryClient } from '@tanstack/react-query'
import { FC } from 'react'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'

import { useActions } from '@/../src/hooks/useAction'
import { useAuth } from '@/../src/hooks/useAuth'
import { useCart } from '@/../src/hooks/useCart'
import { useProfile } from '@/../src/hooks/useProfile'
import { UserService } from '@/../src/services/user.service'
import { IProduct } from '@/../src/types/product.interface'

const FavouriteButton: FC<{ productId: number }> = ({ productId }) => {
	const { profile } = useProfile()

	if (!profile) return null

	const { invalidateQueries } = useQueryClient()

	const { mutate } = useMutation(
		['toggle favourite'],
		() => UserService.toffleFavourite(productId),
		{
			onSuccess() {
				invalidateQueries(['get profile'])
			},
		},
	)

	const isExists = profile.favourites.some(
		favourite => favourite.id === productId,
	)

	return (
		<div>
			<button onClick={() => mutate()}>
				{isExists ? <AiFillHeart /> : <AiOutlineHeart />}
			</button>
		</div>
	)
}

export default FavouriteButton
