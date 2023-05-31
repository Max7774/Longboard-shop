import { FC } from 'react'
import { RiShoppingCartFill, RiShoppingCartLine } from 'react-icons/ri'

import { Button } from '@/ui/button/Button'

import { useActions } from '@/../src/hooks/useAction'
import { useCart } from '@/../src/hooks/useCart'
import { IProduct } from '@/../src/types/product.interface'

const AddToCartButton: FC<{ product: IProduct; isButton?: boolean }> = ({
	product,
	isButton,
}) => {
	const { addToCart, removeFromCart } = useActions()
	const { items } = useCart()

	const currentElement = items.find(
		cartItem => cartItem.product.id === product.id,
	)

	return (
		<>
			{!isButton ? (
				<div>
					<button
						onClick={() =>
							currentElement
								? removeFromCart({ id: currentElement.id })
								: addToCart({ product, quantity: 1, price: product.price })
						}
					>
						{currentElement ? <RiShoppingCartFill /> : <RiShoppingCartLine />}
					</button>
				</div>
			) : (
				<div>
					<Button
						disabled={!!currentElement}
						variant={`${currentElement ? 'white' : 'orange'}`}
						onClick={() =>
							currentElement
								? removeFromCart({ id: currentElement?.id })
								: addToCart({ product, quantity: 1, price: product.price })
						}
					>
						{currentElement ? (
							<div>В корзине!</div>
						) : (
							<div>Добавить в корзину</div>
						)}
					</Button>
				</div>
			)}
		</>
	)
}

export default AddToCartButton
