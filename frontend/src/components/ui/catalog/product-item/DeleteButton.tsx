import { useMutation } from '@tanstack/react-query'
import { FC } from 'react'
import { RiDeleteBin4Fill } from 'react-icons/ri'

import { useProfile } from '@/hooks/useProfile'

import { Photo } from './Productitem'
import { ProductService } from '@/services/product/product.service'

const DeleteButton: FC<{
	productId: number
	image: Photo[]
	removeProductFromState?: (productId: number) => void
}> = ({ productId, image, removeProductFromState }) => {
	const { profile } = useProfile()

	const photoId = image
		.filter(img => Number(img.productId) === productId)
		.map(el => Number(el.id))

	const deleteMutation = useMutation(['delete product'], () =>
		ProductService.deleteProduct(productId, photoId),
	)

	const handleDeleteClick = () => {
		deleteMutation.mutateAsync()
		if (removeProductFromState) {
			removeProductFromState(productId)
		}
	}

	if (!profile) return null

	return (
		<div>
			<button onClick={handleDeleteClick} className="text-primary">
				<RiDeleteBin4Fill />
			</button>
		</div>
	)
}

export default DeleteButton
