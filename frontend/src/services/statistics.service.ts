import { instance } from "../api/api.interceptor"
import { IReview } from "../types/review.interface"

const STATISTICS = 'statistics'

export type TypeStatisticResponse = {
    name: string
    value: number
}[]

export const StatisticsService = {

    async getMain() {
        return await instance<TypeStatisticResponse>({
            url: `${STATISTICS}/main`,
            method: 'GET'
        })
    },

}