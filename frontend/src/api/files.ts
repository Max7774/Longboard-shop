import axios from 'axios'

import { getAccessToken } from '@/services/auth/auth.helper'

export function convertToSlug(string: string) {
	const a =
		'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìıİłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;'
	const b =
		'aaaaaaaaaacccddeeeeeeeegghiiiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------'
	const p = new RegExp(a.split('').join('|'), 'g')

	return string
		.toString()
		.toLowerCase()
		.replace(/\s+/g, '-')
		.replace(p, c => b.charAt(a.indexOf(c)))
		.replace(/&/g, '-and-')
		.replace(/[^\w\-]+/g, '')
		.replace(/\-\-+/g, '-')
		.replace(/^-+/, '')
		.replace(/-+$/, '')
}

export interface FileItem {
	filename: string
	originalName: string
	size: number
	mimetype: string
}

export const uploadFile = async (options: any, productID: number) => {
	const { onSuccess, onError, file, onProgress } = options

	const accessToken = getAccessToken()

	const formData = new FormData()
	formData.append('file', file)

	const config = {
		headers: {
			'Content-Type': 'multipart/form-data',
			Authorization: `Bearer ${accessToken}`,
		},
		onProgress: (event: ProgressEvent) => {
			onProgress({ percent: (event.loaded / event.total) * 100 })
		},
	}

	try {
		const { data } = await axios.post(
			`${process.env.SERVER_URL}/file-upload/create/${productID}`,
			formData,
			config,
		)

		onSuccess()

		return data
	} catch (err) {
		onError({ err })
		console.log('ERRRRROROROOR', err)
	}
}
