import { faker } from '@faker-js/faker'
import { Category, PrismaClient, Product, Review, User } from '@prisma/client'
import * as dotenv from 'dotenv'

dotenv.config()
const prisma = new PrismaClient()

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

// const createUserFunction = (): User => ({
// 	id: 2,
// 	createdAt: new Date(),
// 	updatedAt: new Date(),
// 	email: 'alina@alina.org',
// 	name: 'Alina',
// 	password:
// 		'$argon2i$v=19$m=12,t=3,p=1$M3c5cXBzdGdyeGkwMDAwMA$wfXw7H+mU7N/fjXbim9zkQ',
// 	avatarPath:
// 		'https://gravatar.com/avatar/1f82b0492a0a938288c2d5b70534a1fb?s=400&d=robohash&r=x',
// 	phone: faker.phone.number('+7 (###) ###-##-##'),
// })

// const productName = 'Bearings Abec 7'
// const price = '25'

// const productsCreateFunction = (): Product => ({
// 	id: 18,
// 	createdAt: new Date(),
// 	updatedAt: new Date(),
// 	name: productName,
// 	slug: convertToSlug(productName),
// 	description: 'Bearings for longboards',
// 	price: +price,
// 	images: [
// 		'https://pepperboards.com/upload/resize_cache/iblock/59b/500_500_140cd750bba9870f18aada2478b24840a/5567u4a23acggriqrhwyzruq3paqsqtt.webp',
// 	],
// 	categoryId: 5,
// 	userId: 1,
// })

// const categoryName = 'Tools'

// const categoryCreateFunction = (): Category => ({
// 	id: 6,
// 	createdAt: new Date(),
// 	updatedAt: new Date(),
// 	name: categoryName,
// 	slug: convertToSlug(categoryName),
// })

// const reviewCreateFunction = (i: number): Review => ({
// 	id: i,
// 	createdAt: new Date(),
// 	updatedAt: new Date(),
// 	rating: getRandomNumber(1, 5),
// 	text: faker.lorem.paragraph(),
// 	userId: getRandomNumber(1, 2),
// 	productId: getRandomNumber(1, 18),
// })

const createProduct = async (q: number) => {
	const products: Product[] = []

	for (let i = 0; i < q; i += 1) {
		const productName = faker.commerce.productName()
		const categoryName = faker.commerce.department()

		const product = await prisma.product.create({
			data: {
				name: productName,
				slug: convertToSlug(productName),
				description: faker.commerce.productDescription(),
				price: +faker.commerce.price(10, 999, 0),
				images: Array.from({ length: getRandomNumber(2, 6) }).map(() =>
					faker.image.imageUrl(),
				),
				category: {
					create: {
						name: categoryName,
						slug: convertToSlug(categoryName),
					},
				},
				reviews: {
					create: [
						{
							rating: faker.datatype.number({ min: 1, max: 5 }),
							text: faker.lorem.paragraph(),
							user: {
								connect: {
									id: 1,
								},
							},
						},
						{
							rating: faker.datatype.number({ min: 1, max: 5 }),
							text: faker.lorem.paragraph(),
							user: {
								connect: {
									id: 1,
								},
							},
						},
					],
				},
			},
		})
		products.push(product)
	}
	console.log(`Created ${products.length} products!`)
}

async function createProducts(q: number) {
	// for (let i = 22; i < q; i++) {
	// 	await prisma.review.create({
	// 		data: reviewCreateFunction(i),
	// 	})
	// }
	// await prisma.category.create({
	// 	data: categoryCreateFunction(),
	// })
	// await prisma.product.create({
	// 	data: productsCreateFunction(),
	// })
	// await prisma.user.create({
	// 	data: createUserFunction(),
	// })
	console.log(`Created products`)
}

async function main() {
	console.log('Start seeding...')
	await createProduct(1)
}

main()
	.catch(e => console.error(e))
	.finally(async () => {
		await prisma.$disconnect()
	})
