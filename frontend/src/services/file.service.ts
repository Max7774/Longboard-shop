import axios from 'axios'

export const FileService = {
	async uploadFile(options: any, productID: number) {
		const { onSuccess, onError, file, onProgress } = options

		const formData = new FormData()
		formData.append('file', file)

		const config = {
			headers: { 'Content-Type': 'multipart/form-data' },
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
	},
}
