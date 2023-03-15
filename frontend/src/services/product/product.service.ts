import { instance } from "../../api/api.interceptor"
import { IProduct } from "../../types/product.interface"
import { PRODUCTS, ProductType, TypeProductDataFilters } from "./product.types"

export const ProductService = {

    async getAll(queryData = {} as TypeProductDataFilters) {
        return await instance<IProduct[]>({
            url: PRODUCTS,
            method: 'GET',
            params: queryData
        })
    },

    async getSimilar(id: string | number) {
        return await instance<IProduct[]>({
            url: `${PRODUCTS}/similar/${id}`,
            method: 'GET',
        })
    },

    async getBySlug(slug: string) {
        return await instance<IProduct>({
            url: `${PRODUCTS}/by-slug/${slug}`,
            method: 'GET',
        })
    },

    async getByCategory(categorySlug: string) {
        return await instance<IProduct[]>({
            url: `${PRODUCTS}/by-category/${categorySlug}`,
            method: 'GET',
        })
    },

    async getById(id: string | number) {
        return await instance<IProduct>({
            url: `${PRODUCTS}/${id}`,
            method: 'GET',
        })
    },

    async createProduct() {
        return await instance<IProduct>({
            url: PRODUCTS,
            method: 'POST'
        })
    },

    async updateProduct(id: string | number, data: ProductType) {
        return await instance<IProduct>({
            url: `${PRODUCTS}/${id}`,
            method: 'PUT',
            data
        })
    },

    async deleteProduct(id: string | number) {
        return await instance<IProduct>({
            url: `${PRODUCTS}/${id}`,
            method: 'DELETE'
        })
    },

}