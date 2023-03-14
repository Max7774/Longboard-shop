// import { faker } from '@faker-js/faker'
// import { PrismaClient, Product } from '@prisma/client'
// import * as dotenv from 'dotenv'

// dotenv.config()
// const prisma = new PrismaClient()

// function convertToSlug(str: string) {
// 	str = str
// 		.replace(/[`~!@#$%^&*()_\-+=\[\]{};:'"\\|\/,.<>?\s]/g, ' ')
// 		.toLowerCase()
// 	str = str.replace(/^\s+|\s+$/gm, '')
// 	str = str.replace(/\s+/g, '-')
// 	document.getElementById('slug-text').innerHTML = str
// 	return str
// }

// function getRandomNumber(min: number, max: number) {
// 	return Math.random() * (max - min) + min
// }

// async function createProducts(quantity: number) {
// 	const products: Product[] = []

// 	for (let i = 0; i < quantity; i++) {
// 		const productName = faker.commerce.productName()
// 		const categoryName = faker.commerce.department()

// 		const product = await prisma.product.create({
// 			data: {
// 				name: productName,
// 				slug: convertToSlug(productName),
// 				description: faker.commerce.productDescription(),
// 				price: +faker.commerce.price(2000, 21000, 0),
// 				images: Array.from({ length: getRandomNumber(2, 6) }).map(() =>
// 					faker.image.imageUrl(),
// 				),
// 				category: {
// 					create: {
// 						name: categoryName,
// 						slug: convertToSlug(productName),
// 					},
// 				},
// 				reviews: {
// 					create: [
// 						{
// 							rating: faker.datatype.number({ min: 1, max: 5 }),
// 							text: faker.lorem.paragraph(),
// 							user: {
// 								connect: {
// 									id: 1,
// 								},
// 							},
// 						},
// 						{
// 							rating: faker.datatype.number({ min: 1, max: 5 }),
// 							text: faker.lorem.paragraph(),
// 							user: {
// 								connect: {
// 									id: 1,
// 								},
// 							},
// 						},
// 					],
// 				},
// 			},
// 		})
// 		products.push(product)
// 	}
// 	console.log(`Created ${products.length} products`)
// }

// async function main() {
// 	console.log('Start seeding...')
// 	await createProducts(10)
// }

// main()
// 	.catch(e => console.error(e))
// 	.finally(async () => {
// 		await prisma.$disconnect()
// 	})
