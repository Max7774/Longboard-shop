import { ICartItem } from "./cart.interface"
import { IUser } from "./user.interface"

export enum EnumOrderStatus {
	Pending = 'Pending',
	Payed = 'Payed',
	Shipped = 'Shipped',
	Delivered = 'Delivered',
}

export interface IOrder {
    id: number
    createdAt: string
    items: ICartItem[]
    status: EnumOrderStatus
    user: IUser
}
