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

		const url = `${process.env.CLIENT_SERVER_URL}/${filename}`

		const result = await this.prismaFileService.photoFile.create({
			data: {
				url,
				filename,
				mimetype,
				originalname,
				size,
				path,
				productId: +productId.id,
			},
		})

		const photo = await this.prismaFileService.photoFile.findMany({
			where: {
				productId: +productId,
			},
			select: {
				filename: true,
			},
		})

		console.log(photo)

		const images = await this.prismaFileService.product.findMany({
			where: {
				id: +productId,
			},
			select: {
				images: true,
			},
		})

		// return await this.prismaFileService.product.update({
		// 	where: {
		// 		id: +productId,
		// 	},
		// 	data: {
		// 		images: [...photo],
		// 	},
		// })

		return result
	}
}
