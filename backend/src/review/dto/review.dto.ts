import { IsNumber, IsString, Max, Min } from 'class-validator'

export class ReviewDto {
	@IsNumber()
	@Min(1)
	@Max(5)
	reting: number

	@IsString()
	text: string
}
