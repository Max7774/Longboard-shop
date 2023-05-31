import axios from 'axios'

import { instance } from '@/api/api.interceptor'

import { getAccessToken } from './auth/auth.helper'

export const FileService = {
	async uploadFile(file: any, productID: number) {
		// const { onSuccess, onError, file, onProgress } = options

		const accessToken = getAccessToken()

		const config = {
			headers: {
				'Content-Type': 'multipart/form-data',
				Authorization: `Bearer ${accessToken}`,
			},
			// onProgress: (event: ProgressEvent) => {
			// 	onProgress({ percent: (event.loaded / event.total) * 100 })
			// },
		}

		try {
			for (let i = 0; i < file.length; i += 1) {
				// console.log('Connected', file[i].file)
				const formData = new FormData()
				formData.append('file', file[i])
				await axios.post(
					`${process.env.SERVER_URL}/file-upload/create/${productID}`,
					formData,
					config,
				)
			}

			// onSuccess()

			// return data
		} catch (err) {
			// onError({ err })
			console.log('ERRRRROROROOR', err)
		}
	},
}
