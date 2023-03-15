// import { faker } from '@faker-js/faker'
// import { Category, PrismaClient, Product, Review } from '@prisma/client'
// import * as dotenv from 'dotenv'

// dotenv.config()
// const prisma = new PrismaClient()

export function convertToSlug(string: string) {
	const a =
		'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìıİłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;'
	const b =
		'aaaaaaaaaacccddeeeeeeeegghiiiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------'
	const p = new RegExp(a.split('').join('|'), 'g')

	return string
		.toString()
		.toLowerCase()
		.replace(/\s+/g, '-') // Replace spaces with -
		.replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
		.replace(/&/g, '-and-') // Replace & with 'and'
		.replace(/[^\w\-]+/g, '') // Remove all non-word characters
		.replace(/\-\-+/g, '-') // Replace multiple - with single -
		.replace(/^-+/, '') // Trim - from start of text
		.replace(/-+$/, '') // Trim - from end of text
}

//! need to regenerate seeds in future

export function getRandomNumber(min: number, max: number) {
	return Math.floor(Math.random() * (max - min)) + min
}

// const productName = faker.commerce.productName()
// const categoryName = faker.commerce.department()

// const productsCreateFunction = (): Product => ({
// 	id: getRandomNumber(1, 50),
// 	createdAt: new Date(),
// 	updatedAt: new Date(),
// 	name: productName,
// 	slug: convertToSlug(productName),
// 	description: faker.commerce.productDescription(),
// 	price: +faker.commerce.price(2000, 21000, 0),
// 	images: Array.from({ length: getRandomNumber(2, 6) }).map(() =>
// 		faker.image.imageUrl(),
// 	),
// 	categoryId: getRandomNumber(1, 5),
// 	userId: getRandomNumber(1, 5),
// })

// const categoryCreateFunction = (): Category => ({
// 	id: getRandomNumber(1, 50),
// 	createdAt: new Date(),
// 	updatedAt: new Date(),
// 	name: categoryName,
// 	slug: convertToSlug(categoryName),
// })

// const reviewCreateFunction = (): Review => ({
// 	id: getRandomNumber(1, 20),
// 	createdAt: new Date(),
// 	updatedAt: new Date(),
// 	rating: getRandomNumber(1, 5),
// 	text: faker.lorem.paragraph(),
// 	userId: getRandomNumber(1, 5),
// 	productId: getRandomNumber(1, 19),
// })

// async function createProducts(quantity: number) {
// 	console.log('========>')
// 	for (let i = 0; i < quantity; i++) {
// 		await prisma.category.create({
// 			data: categoryCreateFunction(),
// 		})
// 		await prisma.product.create({
// 			data: productsCreateFunction(),
// 		})
// 		await prisma.review.create({
// 			data: reviewCreateFunction(),
// 		})
// 	}
// 	console.log(`Created products`)
// }

// async function main() {
// 	console.log('Start seeding...')
// 	await createProducts(19)
// }

// main()
// 	.catch(e => console.error(e))
// 	.finally(async () => {
// 		await prisma.$disconnect()
// 	})
