import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class FileUploadService {
	constructor(private readonly prismaFileService: PrismaService) {}

	async getPhoto(id: { id: number }) {
		const res = await this.prismaFileService.photoFile.findMany({
			where: {
				productId: Number(id.id),
			},
		})

		return res
	}

	async uploadFile(file: Express.Multer.File, productId: { id: number }) {
		const { filename, mimetype, originalname, size, path } = file

		console.log(filename)
		const url = `http://localhost:3000/${filename}`

		const result = await this.prismaFileService.photoFile.create({
			data: {
				url,
				filename,
				mimetype,
				originalname,
				size,
				path,
				productId: Number(productId.id),
			},
		})

		return result
	}

	async getImage(filename: { filename: string; id: string }) {
		console.log('filename', filename)
		const response = await this.prismaFileService.photoFile.findUnique({
			where: {
				productId: Number(filename.id),
			},
		})

		return response.path
	}
}
