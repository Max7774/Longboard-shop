import { instance } from "../api/api.interceptor"
import { IOrder } from "../types/order.interface"

const ORDERS = 'orders'

type DataType = {
    rating: number
    text: string
}

export const OrderService = {

    async getAll() {
        return await instance<IOrder[]>({
            url: ORDERS,
            method: 'GET'
        })
    },

}