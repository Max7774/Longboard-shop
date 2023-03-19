import { cartSlice } from './cart/cart.slice'
import * as UserActions from './user/user.actions'

export const rootActions = {
	...UserActions,
	...cartSlice.actions,
}
