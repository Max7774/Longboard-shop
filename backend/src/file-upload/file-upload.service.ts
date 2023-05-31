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
		// for (let i = 0; i <= file.length; i += 1) {
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
					productId: +productId.id,
				},
				select: {
					filename: true,
				},
			})

			await this.prismaFileService.product.update({
				where: {
					id: +productId.id,
				},
				data: {
					images: photo.map(el => el.filename),
				},
			})

			return result
		// }
	}
}
