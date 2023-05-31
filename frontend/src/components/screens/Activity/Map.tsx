/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { FC, useEffect, useRef } from 'react'

const Map: FC = React.memo(() => {
	const mapRef = useRef(null)

	console.log('render')
	useEffect(() => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		// eslint-disable-next-line @typescript-eslint/no-unused-expressions

		if (mapRef.current === null) {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			// eslint-disable-next-line @typescript-eslint/no-unused-expressions

			ymaps.ready(init)
		}

		function init() {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			// eslint-disable-next-line @typescript-eslint/no-unused-expressions

			var myMap = new ymaps.Map('map', {
				center: [55.76, 37.64],
				zoom: 7,
			})
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			// eslint-disable-next-line @typescript-eslint/no-unused-expressions

			mapRef.current = myMap
		}

		return () => {
			if (mapRef.current !== null) {
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				// eslint-disable-next-line @typescript-eslint/no-unused-expressions
				mapRef.current.destroy()
			}
		}
	}, [])
	return (
		<div style={{ borderRadius: '20px' }}>
			<div id="map" style={{ width: '1150px', height: '600px' }} />
		</div>
	)
})

export default Map
