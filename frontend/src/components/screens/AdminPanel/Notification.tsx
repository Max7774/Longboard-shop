import CancelRoundedIcon from '@mui/icons-material/CancelRounded'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Snackbar from '@mui/material/Snackbar'
import React, { Dispatch, SetStateAction, useState } from 'react'

type NotificationProps = {
	open: boolean
	setOpen: Dispatch<SetStateAction<boolean>>
	handleClick: () => void
}

const Notification = ({ open, setOpen, handleClick }: NotificationProps) => {
	const handleClose = (
		event: React.SyntheticEvent | Event,
		reason?: string,
	) => {
		if (reason === 'clickaway') {
			return
		}
		setOpen(false)
	}

	const action = (
		<>
			<IconButton
				size="small"
				aria-label="close"
				className="bg-primary text-white"
				color="inherit"
				onClick={handleClose}
			>
				<CancelRoundedIcon fontSize="small" className="color-white" />
			</IconButton>
		</>
	)

	return (
		<div>
			<Snackbar
				open={open}
				autoHideDuration={6000}
				onClose={handleClose}
				message="Товар создан!"
				action={action}
			/>
		</div>
	)
}

export default Notification
