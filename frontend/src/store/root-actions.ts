import { cartSlice } from './cart/cart.slice'
import * as ProductActions from './product/product.actions'
import { productSlice } from './product/product.slice'
import * as UserActions from './user/user.actions'

export const rootActions = {
	...UserActions,
	...cartSlice.actions,
	...ProductActions,
	...productSlice.actions,
}
