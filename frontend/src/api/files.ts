import axios from 'axios'

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

export const uploadFile = async (
	options: any,
	state: string,
	productID: number,
) => {
	const { onSuccess, onError, file, onProgress } = options

	console.log(file)

	const formData = new FormData()
	formData.append('file', file)

	const config = {
		headers: { 'Content-Type': 'multipart/form-data' },
		onProgress: (event: ProgressEvent) => {
			onProgress({ percent: (event.loaded / event.total) * 100 })
		},
	}

	const slug = convertToSlug(state)

	console.log('SLUG===>', slug)

	try {
		const { data } = await axios.post(
			`http://localhost:4200/api/file-upload/create/${productID}`,
			formData,
			config,
		)

		console.log('DATA!!!!', data)

		onSuccess()

		return data
	} catch (err) {
		onError({ err })
		console.log('ERRRRROROROOR', err)
	}
}
