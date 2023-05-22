import axios from 'axios'

import { getAccessToken } from '@/services/auth/auth.helper'

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
