import { ICartItem } from "../../types/cart.interface";

export interface ICartInitialState {
    items: ICartItem[]
}

export interface IAddToCartPayload extends Omit<ICartItem, 'id'> {}

export interface IChacngeQuantityPayload extends Pick<ICartItem, 'id'> {
    type: 'minus' | 'plus'
}

export type TypeSize = 'SHORT' | 'TALL' | 'GRANDE' | 'VENTI'

export interface IChacngeSizePayload extends Pick<ICartItem, 'id'> {
    size: TypeSize
}