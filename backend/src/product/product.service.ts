import { Injectable, NotFoundException } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PaginationService } from 'src/pagination/pagination.service'
import { PrismaService } from 'src/prisma.service'
import { EnumProductsSort, GetAllProductDto } from './dto/get-all.product.dto'
import { ProductDto } from './dto/product.dto'
import {
	productReturnObject,
	productReturnObjectFull,
} from './return-product.object'
import { convertToSlug } from 'src/convertSlugFunc/convert'

@Injectable()
export class ProductService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly paginationService: PaginationService,
	) {}

	async getAll(dto: GetAllProductDto = {}) {
		const { sort, searchTerm } = dto

		const prismaSort: Prisma.ProductOrderByWithRelationInput[] = []

		if (sort === EnumProductsSort.LOW_PRICE) {
			prismaSort.push({ price: 'asc' })
		} else if (sort === EnumProductsSort.HIGH_PRICE) {
			prismaSort.push({ price: 'desc' })
		} else if (sort === EnumProductsSort.OLDEST) {
			prismaSort.push({ price: 'asc' })
		} else {
			prismaSort.push({ createdAt: 'desc' })
		}

		const prismaSearchTermFilter: Prisma.ProductWhereInput = searchTerm
			? {
					OR: [
						{
							category: {
								name: {
									contains: searchTerm,
									mode: 'insensitive',
								},
							},
							name: {
								contains: searchTerm,
								mode: 'insensitive',
							},
							description: {
								contains: searchTerm,
								mode: 'insensitive',
							},
						},
					],
			  }
			: {}

		const { perPage, skip } = this.paginationService.getPagination(dto)

		const products = await this.prisma.product.findMany({
			where: prismaSearchTermFilter,
			orderBy: prismaSort,
			skip,
			take: perPage,
			select: productReturnObject,
		})

		return {
			products,
			length: await this.prisma.product.count({
				where: prismaSearchTermFilter,
			}),
		}
	}

	async byId(id: number) {
		const product = await this.prisma.product.findUnique({
			where: {
				id,
			},
			select: productReturnObjectFull,
		})

		if (!product) {
			throw new Error('Product not found')
		}

		return product
	}

	async bySlug(slug: string) {
		const product = await this.prisma.product.findUnique({
			where: {
				slug,
			},
			select: productReturnObjectFull,
		})

		if (!product) {
			throw new NotFoundException('Product not found')
		}

		return product
	}

	async byCategory(categorySlug: string) {
		const products = await this.prisma.product.findMany({
			where: {
				category: {
					slug: categorySlug,
				},
			},
		})

		if (!products) throw new NotFoundException('Products not found')

		return products
	}

	async getSimilar(id: number) {
		const currentProduct = await this.byId(id)

		if (!currentProduct)
			throw new NotFoundException('Current product not found')

		const products = await this.prisma.product.findMany({
			where: {
				category: {
					name: currentProduct.category.name,
				},
				NOT: {
					id: currentProduct.id,
				},
			},
			orderBy: {
				createdAt: 'desc',
			},
			select: productReturnObject,
		})

		return products
	}

	async createProduct(dto: ProductDto) {
		const { description, images, price, name, categoryId } = dto

		const product = await this.prisma.product.create({
			data: {
				name,
				description,
				slug: convertToSlug(dto.name),
				images,
				price,
				categoryId,
			},
		})

		return product.id
	}

	async updateProduct(id: number, dto: ProductDto) {
		const { description, images, price, name, categoryId } = dto

		return this.prisma.product.update({
			where: {
				id,
			},
			data: {
				description,
				images,
				price,
				name,
				slug: convertToSlug(name),
				category: {
					connect: {
						id: categoryId,
					},
				},
			},
		})
	}

	async deleteProduct(id: number) {
		return this.prisma.product.delete({
			where: {
				id,
			},
		})
	}
}
