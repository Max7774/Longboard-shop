import { cartSlice } from './cart/cart.slice'
import * as CategoryActions from './category/category.actions'
import { categorySlice } from './category/category.slice'
import * as ProductActions from './product/products.actions'
import { productSlice } from './product/products.slice'
import * as ReviewActions from './review/review.actions'
import { reviewSlice } from './review/review.slice'
import * as UserActions from './user/user.actions'

export const rootActions = {
	...UserActions,
	...cartSlice.actions,
	...ProductActions,
	...productSlice.actions,
	...CategoryActions,
	...categorySlice.actions,
	...reviewSlice.actions,
	...ReviewActions,
}
