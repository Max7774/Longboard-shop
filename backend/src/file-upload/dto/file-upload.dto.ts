import { IsNumber, IsString } from 'class-validator'

export class FileUpload {
	@IsNumber()
	id: number

	@IsString()
	filename: string

	@IsString()
	originalName: string

	@IsNumber()
	size: number

	@IsString()
	mimetype: string
}
