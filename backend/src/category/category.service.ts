import { Injectable } from '@nestjs/common'
import { convertToSlug } from 'seeder/seeds'
import { PrismaService } from 'src/prisma.service'
import { CategoryDto } from './dto/category.dto'
import { returnCategoryObject } from './return-category.object'

@Injectable()
export class CategoryService {
	constructor(private prisma: PrismaService) {}

	async byId(id: number) {
		const category = await this.prisma.category.findUnique({
			where: {
				id,
			},
			select: returnCategoryObject,
		})

		if (!category) {
			throw new Error('Category not found')
		}

		return category
	}

	async updateCategory(id: number, dto: CategoryDto) {
		return this.prisma.category.update({
			where: {
				id,
			},
			data: {
				name: dto.name,
				slug: convertToSlug(dto.name),
			},
		})
	}

	async createCategory() {
		return this.prisma.category.create({
			data: {
				name: '',
				slug: '',
			},
		})
	}

	async deleteCategory(id: number) {
		return this.prisma.category.delete({
			where: {
				id,
			},
		})
	}
}
