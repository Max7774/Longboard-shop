import { instance } from "../api/api.interceptor"
import { IUser } from "../types/user.interface"

const USERS = 'users'

type TypeData = { 
	email: string,
	name?: string,
	avatarPath?: string,
	password?: string,
	phone?: string,
}

export const UserService = {

    async getProfile() {
        return await instance<IUser>({
            url: `${USERS}/profile`,
            method: 'GET'
        })
    },

    async updateProfileUser(data: TypeData) {
        return await instance<IUser>({
            url: `${USERS}/profile`,
            method: 'PUT',
            data
        })
    },

    async toffleFavourite(productId: string | number) {
        return await instance<IUser>({
            url: `${USERS}/profile/favourites/${productId}`,
            method: 'PATCH'
        })
    },

}