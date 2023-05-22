import { useMutation } from '@tanstack/react-query'
import { FC } from 'react'
import { RiDeleteBin4Fill } from 'react-icons/ri'

import { useProfile } from '@/hooks/useProfile'

import { ProductService } from '@/services/product/product.service'

const DeleteButton: FC<{
	productId: number
	removeProductFromState?: (productId: number) => void
}> = ({ productId, removeProductFromState }) => {
	const { profile } = useProfile()

	const deleteMutation = useMutation(['delete product'], () =>
		ProductService.deleteProduct(productId),
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
