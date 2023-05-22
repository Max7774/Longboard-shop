import React, { Dispatch, FC } from 'react'

import { Button } from '../../ui/button/Button'

type AddProps = {
	setPart: Dispatch<React.SetStateAction<number>>
}

const Add = ({ setPart }: AddProps) => {
	return (
		<div>
			<Button
				className="mt-5"
				variant="orange"
				onClick={() => setPart(prev => prev - 1)}
			>
				Добавить товар
			</Button>
		</div>
	)
}

export default Add
