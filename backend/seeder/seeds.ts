// import { faker } from '@faker-js/faker'
// import { Category, PrismaClient, Product, Review, User } from '@prisma/client'
import * as dotenv from 'dotenv'

dotenv.config()
// const prisma = new PrismaClient()

//! need to regenerate seeds in future

export function convertToSlug(text: string) {
	text = text.toString().toLowerCase().trim()

	const sets = [
		{ to: 'a', from: '[ÀÁÂÃÄÅÆĀĂĄẠẢẤẦẨẪẬẮẰẲẴẶἀ]' },
		{ to: 'c', from: '[ÇĆĈČ]' },
		{ to: 'd', from: '[ÐĎĐÞ]' },
		{ to: 'e', from: '[ÈÉÊËĒĔĖĘĚẸẺẼẾỀỂỄỆ]' },
		{ to: 'g', from: '[ĜĞĢǴ]' },
		{ to: 'h', from: '[ĤḦ]' },
		{ to: 'i', from: '[ÌÍÎÏĨĪĮİỈỊ]' },
		{ to: 'j', from: '[Ĵ]' },
		{ to: 'ij', from: '[Ĳ]' },
		{ to: 'k', from: '[Ķ]' },
		{ to: 'l', from: '[ĹĻĽŁ]' },
		{ to: 'm', from: '[Ḿ]' },
		{ to: 'n', from: '[ÑŃŅŇ]' },
		{ to: 'o', from: '[ÒÓÔÕÖØŌŎŐỌỎỐỒỔỖỘỚỜỞỠỢǪǬƠ]' },
		{ to: 'oe', from: '[Œ]' },
		{ to: 'p', from: '[ṕ]' },
		{ to: 'r', from: '[ŔŖŘ]' },
		{ to: 's', from: '[ßŚŜŞŠȘ]' },
		{ to: 't', from: '[ŢŤ]' },
		{ to: 'u', from: '[ÙÚÛÜŨŪŬŮŰŲỤỦỨỪỬỮỰƯ]' },
		{ to: 'w', from: '[ẂŴẀẄ]' },
		{ to: 'x', from: '[ẍ]' },
		{ to: 'y', from: '[ÝŶŸỲỴỶỸ]' },
		{ to: 'z', from: '[ŹŻŽ]' },
		{ to: '-', from: "[·/_,:;']" },
	]

	sets.forEach(set => {
		text = text.replace(new RegExp(set.from, 'gi'), set.to)
	})

	return text
		.replace(/\s+/g, '-') // Replace spaces with -
		.replace(/[^-a-zа-я\u0370-\u03ff\u1f00-\u1fff]+/g, '') // Remove all non-word chars
		.replace(/--+/g, '-') // Replace multiple - with single -
		.replace(/^-+/, '') // Trim - from start of text
		.replace(/-+$/, '') // Trim - from end of text
}

export function getRandomNumber(min: number, max: number) {
	return Math.floor(Math.random() * (max - min)) + min
}

//! --------------------------------------------------------------------------

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

// const productsCreate: Product[] = [
// 	{
// 		id: 1,
// 		createdAt: new Date(),
// 		updatedAt: new Date(),
// 		name: 'Bearings Abec 7',
// 		slug: convertToSlug('Bearings Abec 7'),
// 		description: 'Bearings for longboards',
// 		price: 25,
// 		images: [
// 			'https://pepperboards.com/upload/resize_cache/iblock/59b/500_500_140cd750bba9870f18aada2478b24840a/5567u4a23acggriqrhwyzruq3paqsqtt.webp',
// 		],
// 		categoryId: 5,
// 		userId: 1,
// 	},
// 	{
// 		id: 2,
// 		createdAt: new Date(),
// 		updatedAt: new Date(),
// 		name: 'Flow',
// 		slug: convertToSlug(productName),
// 		description: 'Bearings for longboards',
// 		price: +price,
// 		images: [
// 			'https://pepperboards.com/upload/resize_cache/iblock/59b/500_500_140cd750bba9870f18aada2478b24840a/5567u4a23acggriqrhwyzruq3paqsqtt.webp',
// 		],
// 		categoryId: 5,
// 		userId: 1,
// 	},
// ]

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

//! --------------------------------------------------------------------------

// const createProduct = async (q: number) => {
// 	const products: Product[] = []

// 	for (let i = 0; i < q; i += 1) {
// 		const productName = 'Certified Sweatsaver Helmet'
// 		const categoryName = 'Protection'
// 		const description =
// 			'Triple Eight has released the Certified Sweatsaver helmet so you can focus without worrying about the safety of your head. The protective properties are high because the outer shell is made of ABS, a material that has undergone extensive testing. Weight wont be an issue as it features a lightweight Expanded Poly Styrene (EPS) inner shell that absorbs shock very effectively and lasts a long time. Soft and comfortable contact between your head and helmet is ensured thanks to the foam padding.'
// 		const price = 100
// 		const images = [
// 			'https://cdn.skatepro.com/product/440/triple-eight-certified-sweatsaver-skate-helmet-sr.jpg',
// 		]
// 		const text = 'Good helmet for longboarding'

// 		const product = await prisma.product.create({
// 			data: {
// 				name: productName,
// 				slug: convertToSlug(productName),
// 				description,
// 				price,
// 				images,
// 				category: {
// 					create: {
// 						name: categoryName,
// 						slug: convertToSlug(categoryName),
// 					},
// 				},
// 				reviews: {
// 					create: [
// 						{
// 							rating: faker.datatype.number({ min: 1, max: 5 }),
// 							text,
// 							user: {
// 								connect: {
// 									id: 1,
// 								},
// 							},
// 						},
// 						{
// 							rating: faker.datatype.number({ min: 1, max: 5 }),
// 							text,
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
// 	console.log(`Created ${products.length} products!`)
// }

// const getBase64FromUrl = async (url): Promise<string> => {
// 	const data = await fetch(url)
// 	const blob = await data.blob()
// 	return new Promise(resolve => {
// 		const reader = new FileReader()
// 		reader.readAsDataURL(blob)
// 		reader.onloadend = () => {
// 			const base64data = reader.result
// 			resolve(String(base64data))
// 		}
// 	})
// }

//! --------------------------------------------------------------------------

// async function createProducts() {
// 	const d = 'Decks'
// 	const p = 'Trucks'
// 	const k = 'Wheels'
// 	const pr = 'Other'
// 	await prisma.category.create({
// 		data: {
// 			name: d,
// 			slug: convertToSlug(d),
// 		},
// 	})
// 	await prisma.category.create({
// 		data: {
// 			name: p,
// 			slug: convertToSlug(p),
// 		},
// 	})
// 	await prisma.category.create({
// 		data: {
// 			name: k,
// 			slug: convertToSlug(k),
// 		},
// 	})
// 	await prisma.category.create({
// 		data: {
// 			name: pr,
// 			slug: convertToSlug(pr),
// 		},
// 	})
// 	await prisma.product.create({
// 		data: {
// 			name: 'Bearings Abec 7',
// 			slug: convertToSlug('Bearings Abec 7'),
// 			description: 'Bearings for longboards',
// 			price: 1500,
// 			images: [
// 				'https://pepperboards.com/upload/resize_cache/iblock/59b/500_500_140cd750bba9870f18aada2478b24840a/5567u4a23acggriqrhwyzruq3paqsqtt.webp',
// 				,
// 			],
// 			categoryId: 4,
// 		},
// 	})
// 	await prisma.product.create({
// 		data: {
// 			name: 'Flow',
// 			slug: convertToSlug('Flow'),
// 			description:
// 				'Наша самая универсальная доска. Если ты до сих пор не определился, для чего тебе нужен лонгборд, но уверен, что тебе нужно что-то очень крутое и, чтобы на этом можно было попробовать всё - эта модель для тебя.Как вода может принять любую форму, так и Флоу способен подстроится под любую среду или твои потребности. Фристайл, денсинг, скоростные спуски и слайды - на этой доске можно абсолютно всё! Длины этой модели достаточно для того, чтобы с комфортом изучать новые степы, симметричная геометрия с плавно загнутыми тейлами сделает выполнения любого трюка максимально легким, а U-конкейв средней глубины даст дополнительной уверенности во время скоростных спусков и слайдов.',
// 			price: 20000,
// 			images: [
// 				'https://longboarder.ru/wa-data/public/shop/products/43/05/543/images/636/longbord-pepper-boards-flow-komplekt.970.jpg',
// 				,
// 			],
// 			categoryId: 1,
// 		},
// 	})
// 	await prisma.product.create({
// 		data: {
// 			name: 'Travelol 46 inch',
// 			slug: convertToSlug('Travelol 46 inch'),
// 			description:
// 				'Благодаря качественной продукции и сильной команде, лонгборды TRAVELOL с каждым годом становятся всё популярнее. Бренд основан в Азии, где на сегодняшний день находится одно из самых больших и быстро развивающихся лонгборд сообществ. Азиаты очень талантливые и перспективные райдейры. Их стиль уже стал визитной карточкой лонгборд денсинга и лонгборд фристайла. Большой опыт и практика позволили TRAVELOL создать практически идеальную форму досок, которая способна воплотить в жизнь ваши самые безумные идеи. Теперь и у российской аудитории появилось возможность самим убедиться в этом.',
// 			price: 18000,
// 			images: [
// 				'https://media.karousell.com/media/photos/products/2020/12/17/travelol_46_inch_black_marble__1608181352_c9e81190.jpg',
// 				,
// 			],
// 			categoryId: 1,
// 		},
// 	})
// 	await prisma.product.create({
// 		data: {
// 			id: 4,
// 			name: 'Paris skate tool',
// 			slug: convertToSlug('Paris skate tool'),
// 			description:
// 				'The Paris Truck co. is renowned for making super durable longboard equipment and have, with their Skateboard Tool, done the skateboarding world a solid! With extra added length inside the two biggest sockets, you wont have to struggle to get nuts and mounting hardware on and off.',
// 			price: 2500,
// 			images: [
// 				'https://cdn.skatepro.com/product/440/paris-skate-tool-yu.jpg',
// 				,
// 			],
// 			categoryId: 4,
// 		},
// 	})
// 	console.log(`Created products`)
// }

// async function main() {
// 	console.log('Start seeding...')
// 	await createProducts()
// }

// main()
// 	.catch(e => console.error(e))
// 	.finally(async () => {
// 		await prisma.$disconnect()
// 	})
