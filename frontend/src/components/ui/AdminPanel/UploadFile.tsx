import { uploadFile } from '@/api/files'
import { UploadOutlined } from '@ant-design/icons'
import { Button, Upload, UploadFile } from 'antd'
import { NextPage } from 'next'
import React, { FC, useState } from 'react'


interface UploadFileProps {
    state: string
	productID: number
}

const UploadFile = ({ state, productID }: UploadFileProps): JSX.Element => {
	const [fileList, setFileList] = React.useState<UploadFile[]>([])

	const onUploadSuccess = async (options: any) => {
		console.log('OPTIONS', options)
		uploadFile(options, state, productID)
	}
	return (
		<>
		<Upload
			customRequest={onUploadSuccess}
			fileList={fileList}
			onChange={({ fileList }) => setFileList(fileList)}
			className="ml-5"
		>
			<Button className='mt-5' icon={<UploadOutlined />}>Загрузить фото</Button>
		</Upload>
		</>
	)
}

export default UploadFile
