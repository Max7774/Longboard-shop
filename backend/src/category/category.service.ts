import { Injectable, NotFoundException } from '@nestjs/common'
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

	async bySlug(slug: string) {
		const category = await this.prisma.category.findUnique({
			where: {
				slug,
			},
			select: returnCategoryObject,
		})

		if (!category) {
			throw new NotFoundException('Category not found')
		}

		return category
	}

	async getAll() {
		return this.prisma.category.findMany({
			select: returnCategoryObject,
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

	async deleteCategory(id: number) {
		return this.prisma.category.delete({
			where: {
				id,
			},
		})
	}
}
