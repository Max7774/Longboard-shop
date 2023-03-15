import Cookies from "js-cookie"
import axios from 'axios'
import { getContentType } from "../api/api.helper"
import { saveToStorage } from "./auth/auth.helper"
import { instance } from "../api/api.interceptor"
import { ICategory } from "../types/category.interface"

const CATEGORY = 'category'

export const CategoryService = {

    async getAll() {
        return await instance<ICategory[]>({
            url: CATEGORY,
            method: 'GET'
        })
    },

    async getById(id: string | number) {
        return await instance<ICategory>({
            url: `${CATEGORY}/${id}`,
            method: 'GET'
        })
    },

    async getBySlug(slug: string) {
        return await instance<ICategory>({
            url: `${CATEGORY}/by-slug/${slug}`,
            method: 'GET'
        })
    },

    async createCategory() {
        return await instance<ICategory>({
            url: CATEGORY,
            method: 'POST'
        })
    },

    async updateCategory(id: string | number, name: string) {
        return await instance<ICategory>({
            url: `${CATEGORY}/${id}`,
            method: 'PUT',
            data: { name }
        })
    },

    async deleteCategory(id: string | number) {
        return await instance<ICategory>({
            url: `${CATEGORY}/${id}`,
            method: 'DELETE'
        })
    },

}