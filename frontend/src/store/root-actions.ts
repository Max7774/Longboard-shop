import { cartSlice } from './cart/cart.slice'
import * as ProductActions from './product/products.actions'
import { productSlice } from './product/products.slice'
import * as UserActions from './user/user.actions'

export const rootActions = {
	...UserActions,
	...cartSlice.actions,
	...ProductActions,
	...productSlice.actions,
}
