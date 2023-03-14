import { faker } from '@faker-js/faker'
import { Category, PrismaClient, Product } from '@prisma/client'
import * as dotenv from 'dotenv'

dotenv.config()
const prisma = new PrismaClient()

export function convertToSlug(str: string) {
	str
		.toLowerCase()
		.trim()
		.replace(/[^\w\s-]/g, '')
		.replace(/[\s_-]+/g, '-')
		.replace(/^-+|-+$/g, '')
	return str
}

export function getRandomNumber(min: number, max: number) {
	return Math.floor(Math.random() * (max - min)) + min
}

const productName = faker.commerce.productName()
const categoryName = faker.commerce.department()

const productsCreateFunction = (): Product => ({
	id: getRandomNumber(1, 40),
	createdAt: new Date(),
	updatedAt: new Date(),
	name: productName,
	slug: convertToSlug(productName),
	description: faker.commerce.productDescription(),
	price: +faker.commerce.price(2000, 21000, 0),
	images: Array.from({ length: getRandomNumber(2, 6) }).map(() =>
		faker.image.imageUrl(),
	),
	categoryId: getRandomNumber(1, 5),
	userId: getRandomNumber(1, 2),
})

const categoryCreateFunction = (): Category => ({
	id: getRandomNumber(1, 20),
	createdAt: new Date(),
	updatedAt: new Date(),
	name: categoryName,
	slug: convertToSlug(categoryName),
})

async function createProducts(quantity: number) {
	console.log('========>')
	for (let i = 0; i < quantity; i++) {
		// await prisma.category.create({
		// 	data: categoryCreateFunction(),
		// })
		await prisma.product.create({
			data: productsCreateFunction(),
		})
	}
	console.log(`Created products`)
}

async function main() {
	console.log('Start seeding...')
	await createProducts(30)
}

main()
	.catch(e => console.error(e))
	.finally(async () => {
		await prisma.$disconnect()
	})
