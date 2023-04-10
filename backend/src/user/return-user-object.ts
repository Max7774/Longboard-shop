import { Prisma } from '@prisma/client'

export const returnUserObject: Prisma.UserSelect = {
	id: true,
	email: true,
	isAdmin: true,
	name: true,
	avatarPath: true,
	password: false,
	phone: true,
}
