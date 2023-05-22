import { uploadFile } from '@/api/files'
import { UploadOutlined } from '@ant-design/icons'
import { Button, Upload, UploadFile } from 'antd'
import React, { Dispatch } from 'react'
import Add from './Add'
import { useQuery } from '@tanstack/react-query'
import { ProductService } from '@/services/product/product.service'
import { IProduct } from '@/types/product.interface'


interface UploadFileProps {
	setPart: Dispatch<React.SetStateAction<number>>
	slug: string
	products: IProduct[]
}

const UploadFile = ({ setPart, slug, products }: UploadFileProps): JSX.Element => {
	const [fileList, setFileList] = React.useState<UploadFile[]>([])

	const { data: response } = useQuery(['get products by slug'], () => ProductService.getBySlug(slug))

	console.log(products)

	const onUploadSuccess = async (options: any) => {
		if (response !== undefined) {
			uploadFile(options, +response?.data?.id)
			if (fileList.length > 3) {
				setPart(prev => prev - 1)
			}
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
