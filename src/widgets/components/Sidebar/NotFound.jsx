import React from 'react'
import ToFilterPage from '../../buttons/ToFilterPage'

export default function NotFound({ sidebarClose }) {
	return (
		<div className="side-bar__no-item">
			<p>No products in the cart.</p>
			<ToFilterPage nameClass={'button'} text={'Return to shop'} />
		</div>
	)
}
