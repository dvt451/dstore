import React from 'react'
import { ClipLoader } from 'react-spinners'

export default function Loading({ loading }) {
	return (
		<div className='loading'>
			<ClipLoader
				size={150}
				color='#00796b'
				loading={loading}
				aria-label="Loading Spinner"
				data-testid="loader"
			/>
		</div>
	)
}
