import { DataType } from "@/services/review.service"

export type ReviewTypeSend = {
	text: DataType
	productId: string | number
}
