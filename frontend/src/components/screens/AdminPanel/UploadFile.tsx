import { uploadFile } from '@/api/files'
import { UploadOutlined } from '@ant-design/icons'
import { Button, Upload, UploadFile } from 'antd'
import React, { Dispatch, FC, useState } from 'react'
import Add from './Add'
import { useTypedSelector } from '@/hooks/useTypedSelector'


interface UploadFileProps {
	productID: number
	setPart: Dispatch<React.SetStateAction<number>>
}

const UploadFile = ({ productID, setPart }: UploadFileProps): JSX.Element => {
	const [fileList, setFileList] = React.useState<UploadFile[]>([])

	const productsArray = useTypedSelector(store => store.products.products)

	console.log('State', productsArray)

	const onUploadSuccess = async (options: any) => {
		uploadFile(options, +productID)
		if (fileList.length > 3) {
			setPart(prev => prev - 1)
		}
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
		<Add setPart={setPart} />
		</>
	)
}

export default UploadFile
