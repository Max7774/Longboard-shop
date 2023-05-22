import {
	Controller,
	Get,
	HttpCode,
	MaxFileSizeValidator,
	Param,
	ParseFilePipe,
	Post,
	UploadedFile,
	UseInterceptors,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common'
import { FileUploadService } from './file-upload.service'
import { FileInterceptor } from '@nestjs/platform-express'
import { fileStorage } from './storage'
import { Auth } from 'src/auth/decorators/auth.decorator'

@Controller('file-upload')
export class FileUploadController {
	constructor(private readonly fileUploadService: FileUploadService) {}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth()
	@Post('create/:id')
	@UseInterceptors(FileInterceptor('file', { storage: fileStorage }))
	async createProduct(
		@UploadedFile(
			new ParseFilePipe({
				validators: [new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 5 })],
			}),
		)
		file: Express.Multer.File,
		@Param() id: { id: number },
	) {
		console.log(file, +id.id)
		return this.fileUploadService.uploadFile(file, id)
	}

	@Get(':id')
	async getPhoto(@Param() id: { id: number }) {
		return this.fileUploadService.getPhoto(id)
	}
}
